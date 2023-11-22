import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BiWorld} from "react-icons/bi";
import {MdBusinessCenter, MdOutlineHealthAndSafety, MdOutlineSportsVolleyball} from "react-icons/md";
import {SiJetpackcompose} from "react-icons/si";
import { compareDesc, format } from 'date-fns';

import ChannelSelection from "./ChannelSelection";
import Article from "./Article";

type article = {
	title:string;
	content:string;
	resource:string;
	link:string;
	date:string
}

const Articles = () => {

	const [selectedTopics, setSelectedTopics] = useState<string[]>(['World'])
	const [articles , setArticles] = useState<article[]>([])

	const dateFormatter = (date:string) =>{
		return format(new Date(date), 'dd MMMM yyyy');
	}

	const getArticles = async () => {
		const res = await axios.get('http://localhost:4000/articles?topics=World&topics=Business')
		setArticles(res.data)
	}

	const sortedArticles = articles.sort((a, b) =>
		compareDesc(new Date(a.date), new Date(b.date))
	);

	useEffect(()=>{
		getArticles()
	} , [])
	return (
		<div className={'flex justify-center'} >
			<header className={'bg-white w-full h-[60px] fixed top-o left-0 border-b z-50'}>
				<button className={'w-[150px] h-[40px] bg-purple-500 hover:bg-purple-600 text-white rounded-lg absolute top-3 right-5'} >Logout</button>
			</header>


			<div className={'fixed top-16 left-8 gap-3 flex flex-col '}>
				<div className={'text-white bg-purple-500 p-6 shadow-2xl w-[300px] h-[400px] rounded-md text-center'}>
				   <h3 className={'text-2xl'}>Select topics</h3>
					<div className={' h-full flex flex-col  '}>
						<ChannelSelection selectedTopics={selectedTopics} onToggleSelection={setSelectedTopics} topic={'World'} icon={<BiWorld/>}/>
						<ChannelSelection selectedTopics={selectedTopics} onToggleSelection={setSelectedTopics} topic={'Business'} icon={<MdBusinessCenter />}/>
						<ChannelSelection selectedTopics={selectedTopics} onToggleSelection={setSelectedTopics} topic={'Technology'} icon={<SiJetpackcompose />}/>
						<ChannelSelection selectedTopics={selectedTopics} onToggleSelection={setSelectedTopics} topic={'Sport'} icon={<MdOutlineSportsVolleyball/>}/>
						<ChannelSelection selectedTopics={selectedTopics} onToggleSelection={setSelectedTopics} topic={'Health'} icon={<MdOutlineHealthAndSafety />}/>
					</div>
			    </div>
			</div>
			<div className={'mt-16'}>
				{articles ? sortedArticles.map((el:article) => {
				return	<Article link={el.link} key={el.title} title={el.title} content={el.content} resource={el.resource} date={ dateFormatter(el.date) } />
				}) : <></> }

			</div>
		</div>
	);
};

export default Articles;