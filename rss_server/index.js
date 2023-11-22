import Parser from 'rss-parser';
import cors from 'cors'
import express from 'express'

const feedURL = 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml'

const parser = new Parser()
let articles = []
const parse = async url => {
	const feed = await parser.parseURL(url)
	const resource = feed.title
	feed.items.forEach((item) => articles.push({resource:resource , title:item.title , content:item.content , link:item.link })  )
}

parse(feedURL);

let app = express()
app.use(cors())

app.get('/' , (req , res)=>{
	res.send(articles)
})

const server = app.listen('4000')

export default server