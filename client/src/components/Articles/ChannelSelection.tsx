import React from 'react';
import {FaCheck} from "react-icons/fa";

type ChannelSelectionProps = {
	topic: string;
	selectedTopics: string[];
	onToggleSelection: (arr:string[]) => void;
	icon:React.ReactNode
};



const ChannelSelection: React.FC<ChannelSelectionProps>  = ({selectedTopics , topic , onToggleSelection , icon }) => {

	const onToggle = (topic: string) => {
		if (selectedTopics.includes(topic)) {
			return selectedTopics.filter((el) => el !== topic);
		} else {
			return [...selectedTopics, topic];
		}
	};

	return (
						<span className={'flex items-center  gap-2 text-xl mt-8'}> {icon} {topic} News
								<button className={'bg-white w-[20px] h-[20px] flex items-center justify-center'} onClick={() => onToggleSelection(onToggle(topic)) }>
								{selectedTopics.includes(topic) ? <FaCheck className={'text-gray-500 text-sm'} /> : ''}
							</button>
						</span>
	);
};

export default ChannelSelection;