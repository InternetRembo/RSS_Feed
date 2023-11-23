import React from 'react';
import {FaCheck} from "react-icons/fa";
import {GrUpdate} from "react-icons/gr";
import {BsTrash3} from "react-icons/bs";
import {TopicType} from "./Articles";

type TopicSelectionProps = {
	topic: string;
	selectedTopics: string[];
	onToggleSelection: (arr: string[]) => void;
	icon: React.ReactNode
	isModalOpen: boolean
	setIsModalOpen: (arg: boolean) => void
	onTopicDelete: () => void
	setTopicToUpdate: (topic: TopicType) => void
	setMode: (mode: 'Create' | 'Update') => void
};

const TopicSelection: React.FC<TopicSelectionProps> = (
	{
		selectedTopics,
		topic,
		onToggleSelection,
		icon,
		isModalOpen,
		setIsModalOpen,
		onTopicDelete,
		setMode,
		setTopicToUpdate
	}) => {

	const onToggle = (topic: string) => {
		if (selectedTopics.includes(topic)) {
			return selectedTopics.filter((el) => el !== topic);
		} else {
			return [...selectedTopics, topic];
		}
	};

	const handleClick = () => {
		if (!isModalOpen) {
			onToggleSelection(onToggle(topic))
		}
	};

	return (
		<span className={' inline-block flex items-center  gap-2 text-xl mt-6'}>
			{icon} <span className={'flex gap-2 items-center cursor-pointer hover:underline '}
						 onClick={handleClick}>{topic} News

								<button
									className={'bg-white w-[20px] h-[20px] flex items-center justify-center'}>
								    {selectedTopics.includes(topic) ?
										<FaCheck className={'text-gray-500 text-sm'}/> : ''}
								</button>
			</span>
			                     <button className={'ml-2'} onClick={(e) => {
									 e.stopPropagation()
									 setMode('Update')
									 setTopicToUpdate({title: topic, description: topic + ' description'})
									 setIsModalOpen(true)
								 }}>
                                         <GrUpdate size={20}/>
                                  </button>

			                      <button className={'ml-2 hover:underline'} onClick={onTopicDelete}>
                                         <BsTrash3 size={20}/>
                                  </button>
						</span>
	);
};

export default TopicSelection;