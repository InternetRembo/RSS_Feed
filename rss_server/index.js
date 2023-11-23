import Parser from 'rss-parser';
import cors from 'cors'
import express from 'express'

const parser = new Parser();
const app = express();
const PORT = 4000;

app.use(cors());

const feeds = [
	{
		url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
		topic: 'World',
	},
	{
		url: 'https://rss.nytimes.com/services/xml/rss/nyt/Business.xml',
		topic: 'Business',
	},
	{
		url: 'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
		topic: 'Technology',
	},
	{
		url: 'https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml',
		topic: 'Sports',
	},
	{
		url: 'https://rss.nytimes.com/services/xml/rss/nyt/Health.xml',
		topic: 'Health',
	},
];

const fetchArticles = async (url) => {
	const feed = await parser.parseURL(url);
	const resource = feed.title;
	return feed.items.map((item) => ({
		resource: resource,
		title: item.title,
		content: item.content,
		link: item.link,
		date:item.pubDate,
	}));
};

app.get('/articles', async (req, res) => {
	try {
		const selectedTopics = req.query.topics;
		let selectedArticles = [];

		for (const feed of feeds) {
			if (selectedTopics.includes(feed.topic)) {
				const articles = await fetchArticles(feed.url);
				selectedArticles = [...selectedArticles, ...articles];
			}
		}

		res.json(selectedArticles);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

const server = app.listen(PORT, () => {
});

export default server;