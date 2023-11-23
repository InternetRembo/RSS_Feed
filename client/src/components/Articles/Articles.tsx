import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {BiWorld} from "react-icons/bi";
import {MdBusinessCenter, MdOutlineHealthAndSafety, MdOutlineSportsVolleyball} from "react-icons/md";
import {SiJetpackcompose} from "react-icons/si";
import { compareDesc, format } from 'date-fns';
import "react-toastify/dist/ReactToastify.css";

import TopicSelection from "./TopicSelection";
import Article from "./Article";
import TopicModal from "./TopicModal";
import ClickOutsideHandler from "../commons/ClickOutsideHandler";
import {TOPIC_API} from "../../api/api";
import {toast} from "react-toastify";

type article = {
	title:string;
	content:string;
	resource:string;
	link:string;
	date:string
}
export type TopicType = {
	title:string
	description:string
}

const onTopicDelete  = async () => {
	await TOPIC_API.delete().then(() => {
		toast.success("Topic deleted successfully!");
	})
		.catch((error) => {
			toast.error("Ooops, something wrong");
		});
}
const onTopicCreate  = async (topic:TopicType) => {
	await TOPIC_API.create(topic).then(() => {
		toast.success("Topic created successfully!");
	})
		.catch((error) => {
			toast.error("Ooops, something wrong");
		});
}

const onTopicUpdate  = async (topic:TopicType) => {
	await TOPIC_API.update(topic).then(() => {
		toast.success("Topic updated successfully!");
	})
		.catch((error) => {
			toast.error("Ooops, something wrong");
		});
}

const Articles = () => {
	const storedTopicsConfig = localStorage.getItem('selectedTopics');
	const topicsConfig = storedTopicsConfig ? JSON.parse(storedTopicsConfig) : ['World'];

	const navigate = useNavigate();

	const [selectedTopics, setSelectedTopics] = useState<string[]>(topicsConfig)
	const [currentTopics, setCurrentTopics] = useState<string[]>(['World']);
	const [articles , setArticles] = useState<article[]>([])
	const [isModalOpen , setIsModalOpen] = useState<boolean>(false)
	const [mode , setMode] = useState<'Create' | 'Update'>('Create')
	const [topicToUpdate , setTopicToUpdate] = useState<TopicType>({title:'' , description:''})

	const dateFormatter = (date:string) => {
		return format(new Date(date), ' dd/MM/yyyy  HH:mm');
	}

	const getArticles = async (configArr: string[]) => {
		if (configArr.length === 0) {
			return;
		}
		const queryParams = configArr.map((topic) => `topics=${encodeURIComponent(topic)}`).join('&');
		const apiUrl = `http://localhost:4000/articles?${queryParams}`;

		const res = await axios.get(apiUrl);
		setArticles(res.data);
	};

	useEffect(() => {
		localStorage.setItem('selectedTopics', JSON.stringify(selectedTopics));
		getArticles(selectedTopics);
		setCurrentTopics(selectedTopics);
	}, [selectedTopics]);

	const sortedArticles = articles.sort((a, b) =>
		compareDesc(new Date(a.date), new Date(b.date))
	);

	return (
		<div className={'flex justify-center'} >

			{isModalOpen && <ClickOutsideHandler onAwayClick={() => {
				setIsModalOpen(false)
			}}>
				<TopicModal initialData={topicToUpdate} onTopicUpdate={onTopicUpdate}  onTopicCreate={onTopicCreate} mode={mode} onClose={() => {setIsModalOpen(false)
				}}/>
			</ClickOutsideHandler>}

			<header className={'bg-white w-full h-[60px] fixed top-o left-0 border-b z-50'}>
				<button className={'w-[150px] h-[40px] bg-purple-500 hover:bg-purple-600 text-white rounded-lg absolute top-3 right-5'}
						onClick={ () => navigate('/auth') } >Logout</button>
			</header>

			<div className={'fixed top-16 left-8 gap-3 flex flex-col '}>
				<div className={'text-white bg-purple-500 p-6 shadow-2xl w-[360px] h-[420px] rounded-md text-center'}>
				   <h3 className={'text-2xl'}>Select topics</h3>

					<button onClick={(e) => {
						e.stopPropagation()
						setTopicToUpdate({title:'', description:''})
						setIsModalOpen(true);
					}} className={'mt-4 bg-white text-purple-500 p-1 rounded-md w-[140px] text-lg hover:underline'}>Add topic</button>

					<div className={' h-full flex flex-col  '}>
						<TopicSelection selectedTopics={selectedTopics}
										onToggleSelection={setSelectedTopics}
										isModalOpen={isModalOpen}
										setIsModalOpen={setIsModalOpen}
										topic={'World'}
										setMode={setMode}
										setTopicToUpdate={setTopicToUpdate}
										onTopicDelete={onTopicDelete}
										icon={<BiWorld/>}/>

						<TopicSelection selectedTopics={selectedTopics}
										onToggleSelection={setSelectedTopics}
										isModalOpen={isModalOpen}
										setIsModalOpen={setIsModalOpen}
										topic={'Business'}
										setMode={setMode}
										setTopicToUpdate={setTopicToUpdate}
										onTopicDelete={onTopicDelete}
										icon={<MdBusinessCenter />}/>

						<TopicSelection selectedTopics={selectedTopics}
										onToggleSelection={setSelectedTopics}
										isModalOpen={isModalOpen}
										setIsModalOpen={setIsModalOpen}
										topic={'Technology'}
										setMode={setMode}
										setTopicToUpdate={setTopicToUpdate}
										onTopicDelete={onTopicDelete}
										icon={<SiJetpackcompose />}/>

						<TopicSelection selectedTopics={selectedTopics}
										onToggleSelection={setSelectedTopics}
										isModalOpen={isModalOpen}
										setIsModalOpen={setIsModalOpen}
										topic={'Sports'}
										setMode={setMode}
										setTopicToUpdate={setTopicToUpdate}
										onTopicDelete={onTopicDelete}
										icon={<MdOutlineSportsVolleyball/>}/>

						<TopicSelection selectedTopics={selectedTopics}
										onToggleSelection={setSelectedTopics}
										isModalOpen={isModalOpen}
										setIsModalOpen={setIsModalOpen}
										topic={'Health'}
										setMode={setMode}
										setTopicToUpdate={setTopicToUpdate}
										onTopicDelete={onTopicDelete}
										icon={<MdOutlineHealthAndSafety />}/>
					</div>
			    </div>
			</div>

			<div className={'mt-16'}>
				{articles ? sortedArticles.map((el:article , index) => {
				return	<Article link={el.link}
								   key={el.title + index }
								   title={el.title} content={el.content}
								   resource={el.resource}
								   date={dateFormatter(el.date)}
								   isModalOpen={isModalOpen}
				/>
				}) : <></> }
			</div>
		</div>
	);
};

export default Articles;