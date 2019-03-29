const jsonata = require('jsonata')
const data = require('./api/pages.json')

const query = jsonata('$[slug="home"]')
const result = query.evaluate(data)
console.log(result)
