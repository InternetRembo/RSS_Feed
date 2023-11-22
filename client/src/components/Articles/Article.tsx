import React from 'react';

interface ArticleProps {
	title: string;
	content: string;
	resource: string;
	link:string;
}

function cutString(str:string) {
	if (str.length <= 300) {
		return str;
	} else {
		return str.slice(0, 300) + '...';
	}
}

const Article:React.FC<ArticleProps> = ({title , resource , content , link}) => {

	return (
		<div onClick={()=>{ window.open(link, '_blank');}} className={' relative p-1 flex flex-col items-center justify-center w-[1000px] h-[150px] text-center rounded-md shadow mt-4 cursor-pointer border-b hover:bg-gray-100'}>
			<h2 className={'text-2xl font-bold'}>{title}</h2>
			<p className={'text-xl'}>{cutString(content)}</p>
			<span className={'absolute font-bold top-1 left-2 text-gray-600 text-sm'}>{resource}</span>
		</div>
	);
};

export default Article;