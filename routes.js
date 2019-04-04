const config = require('./config')
const routes = []
const siteArray = Object.getOwnPropertyNames(config.siteConfig)
siteArray.forEach(section => {
  try {
    let json = require(`./api/${section}.json`)
    let sectionPaths = json.map(section => {
      return section.path
    })
    routes.push(...sectionPaths)
  } catch (e) {
    console.log(`ERROR: ${e}`)
  }
})
module.exports = routes
