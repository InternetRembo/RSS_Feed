import axios from "axios";

import {TopicType} from "../components/Articles/Articles";

const baseURL = 'https://jsonplaceholder.typicode.com/posts/'

export const TOPIC_API = {
	create: (topic: TopicType) =>
		axios.post(`${baseURL}`, { userId: 4, body:topic.description, title:topic.title}),
	delete: () => axios.delete(`${baseURL}15`),
	update: (topic: TopicType) =>
		axios.put(`${baseURL}1`, {id:1 , userId:1, body:topic.description, title:topic.title}),
};