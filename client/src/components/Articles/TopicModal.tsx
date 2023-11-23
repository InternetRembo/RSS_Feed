import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import {TopicType} from "./Articles";

type TopicModalProps = {
	mode: 'Create' | 'Update',
	initialData?: TopicType;
	onClose: () => void;
	onTopicCreate: (topic: TopicType) => void
	onTopicUpdate: (topic: TopicType) => void
}

const TopicModal: React.FC<TopicModalProps> = ({mode, initialData, onClose, onTopicCreate, onTopicUpdate}) => {
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<TopicType>({defaultValues: initialData});

	const onSubmit: SubmitHandler<TopicType> = async (data) => {
		let topic = {
			title: data.title,
			description: data.description
		};

		mode === 'Create' ? onTopicCreate(topic) : onTopicUpdate(topic)

		onClose()
	};

	return (
		<div className="fixed top-1/2 transform left-1/2 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[400px]
			 shadow-2xl bg-purple-500 text-white z-20 flex flex-col items-center rounded-xl">
			<h1 className="text-[48px]">{mode} topic</h1>
			<form className={'mt-2 flex flex-col'} onSubmit={handleSubmit(onSubmit)}>
				<div className="mt-6 w-[400px]">
					<label
						htmlFor="title"
						className="block text-sm font-medium"
					>
						Title
					</label>
					<input required
						   className="w-full py-2 pl-3 pr-2 text-gray-700 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none"
						   {...register("title")}
					/>
				</div>

				<div className="mt-6">
					<label
						htmlFor="title"
						className="block text-sm font-medium"
					>
						Description
					</label>
					<input required
						   className="w-full py-2 pl-3 pr-2 text-gray-700 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none"
						   {...register("description")}
					/>
				</div>

				<div className="px-4 py-3 flex gap-2 justify-end">
					<button
						type="submit"
						className="mt-3 w-[100px] inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2
							  bg-white text-base font-medium text-gray-700 hover:bg-gray-100 hover:underline focus:outline-none"
					>
						Save
					</button>
					<button
						type="button"
						onClick={onClose}
						className="mt-3 w-[100px] inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2
							  bg-white text-base font-medium text-gray-700 hover:bg-gray-100 hover:underline focus:outline-none"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default TopicModal;