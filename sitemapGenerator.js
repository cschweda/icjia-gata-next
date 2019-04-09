const SitemapGenerator = require('sitemap-generator')

// create generator
var generator = SitemapGenerator('https://grants.icjia.cloud', {
  maxDepth: 0,
  filepath: './dist/sitemap.xml',
  maxEntriesPerFile: 50000,
  stripQuerystring: false
})

// register event listeners
generator.on('done', () => {
  console.log('sitemap created')
})

// start the crawler
generator.start()
