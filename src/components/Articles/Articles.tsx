import React, {useState} from 'react';
import {VscJson} from "react-icons/vsc";
import ChannelSelection from "./ChannelSelection";
import Article from "./Article";

const Articles = () => {

	const [isPlaceholderSelected, setIsPlaceholderSelected] = useState(true)

	return (
		<div className={'flex justify-center'} >
			<header className={'bg-white w-full h-[60px] fixed top-o left-0 border-b'}>
				<button className={'w-[150px] h-[40px] bg-purple-500 hover:bg-purple-600 text-white rounded-lg absolute top-3 right-5'} >Logout</button>
			</header>

			<div className={'fixed top-16 left-8 gap-3 flex flex-col '}>
				<div className={'text-white bg-gray-500 p-6 shadow-2xl w-[300px] h-[400px] rounded-md text-center'}>
				   <h3 className={'text-2xl'}>Select channels</h3>
					<div className={' h-full flex flex-col items-center '}>
						<ChannelSelection isSelected={isPlaceholderSelected} onToggleSelection={setIsPlaceholderSelected} channelName={'JsonPlaceholder News'} icon={<VscJson/>}/>
						<ChannelSelection isSelected={isPlaceholderSelected} onToggleSelection={setIsPlaceholderSelected} channelName={'JsonPlaceholder News'} icon={<VscJson/>}/>
						<ChannelSelection isSelected={isPlaceholderSelected} onToggleSelection={setIsPlaceholderSelected} channelName={'JsonPlaceholder News'} icon={<VscJson/>}/>
						<ChannelSelection isSelected={isPlaceholderSelected} onToggleSelection={setIsPlaceholderSelected} channelName={'JsonPlaceholder News'} icon={<VscJson/>}/>
					</div>
			    </div>
			</div>
			<div className={'mt-16'}>
				<Article/>
			</div>
		</div>
	);
};

export default Articles;