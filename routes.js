const sitePages = require('./api/pages.json')
const siteNews = require('./api/news.json')
const siteFunding = require('./api/funding.json')

const pages = sitePages.map(item => {
  return item.path
})

const news = siteNews.map(item => {
  return item.path
})

const funding = siteFunding.map(item => {
  return item.path
})

module.exports = [...pages, ...news, ...funding]
