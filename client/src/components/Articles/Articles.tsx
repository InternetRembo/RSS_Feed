import React, {useEffect, useState} from 'react';
import ChannelSelection from "./ChannelSelection";
import Article from "./Article";
import axios from "axios";
import {BiWorld} from "react-icons/bi";
import {MdBusinessCenter, MdOutlineHealthAndSafety, MdOutlineSportsVolleyball} from "react-icons/md";
import {SiJetpackcompose} from "react-icons/si";

const Articles = () => {

	const [isPlaceholderSelected, setIsPlaceholderSelected] = useState(true)
	const [articles , setArticles] = useState([])

	console.log(articles , 'ARTICLES')
	type article = {
		title:string;
		content:string;
		resource:string;
		link:string;
	}
	const getArticles = async () => {
		const res = await axios.get('http://localhost:4000/')
		setArticles(res.data)
	}

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
				   <h3 className={'text-2xl'}>Select channels</h3>
					<div className={' h-full flex flex-col  '}>
						<ChannelSelection isSelected={isPlaceholderSelected} onToggleSelection={setIsPlaceholderSelected} channelName={'World News'} icon={<BiWorld/>}/>
						<ChannelSelection isSelected={isPlaceholderSelected} onToggleSelection={setIsPlaceholderSelected} channelName={'Business News'} icon={<MdBusinessCenter />}/>
						<ChannelSelection isSelected={isPlaceholderSelected} onToggleSelection={setIsPlaceholderSelected} channelName={'Technology News'} icon={<SiJetpackcompose />}/>
						<ChannelSelection isSelected={isPlaceholderSelected} onToggleSelection={setIsPlaceholderSelected} channelName={'Sport News'} icon={<MdOutlineSportsVolleyball/>}/>
						<ChannelSelection isSelected={isPlaceholderSelected} onToggleSelection={setIsPlaceholderSelected} channelName={'Health News'} icon={<MdOutlineHealthAndSafety />}/>
					</div>
			    </div>
			</div>
			<div className={'mt-16'}>
				{articles ? articles.map((el:article) => {
				return	<Article link={el.link} key={el.title} title={el.title} content={el.content} resource={el.resource} />
				}) : <></> }

			</div>
		</div>
	);
};

export default Articles;