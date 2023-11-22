import React from 'react';
import {FaCheck} from "react-icons/fa";

type ChannelSelectionProps = {
	channelName: string;
	isSelected: boolean;
	onToggleSelection: (bool:boolean) => void;
	icon:React.ReactNode
};

const ChannelSelection: React.FC<ChannelSelectionProps>  = ({isSelected , channelName , onToggleSelection , icon }) => {
	return (
						<span className={'flex items-center  gap-2 text-xl mt-8'}> {icon} {channelName}
								<button className={'bg-white w-[20px] h-[20px] flex items-center justify-center'} onClick={() => onToggleSelection(!isSelected) }>
								{isSelected ? <FaCheck className={'text-gray-500 text-sm'} /> : ''}
							</button>
						</span>
	);
};

export default ChannelSelection;