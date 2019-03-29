const fs = require('fs')
const fm = require('front-matter')
const path = require('path')
const slug = require('slug')

const rootPath = './markdown/'
const contentPaths = ['pages', 'grants']
const apiPath = './api/'

const arr = []

/**
 * Sort array of objects by property
 *
 * https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
 */
// function dynamicSort(property) {
//   var sortOrder = 1
//   if (property[0] === '-') {
//     sortOrder = -1
//     property = property.substr(1)
//   }
//   return function(a, b) {
//     var result =
//       a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
//     return result * sortOrder
//   }
// }

const readFiles = dirname => {
  const readDirPr = new Promise((resolve, reject) => {
    fs.readdir(
      dirname,
      (err, filenames) => (err ? reject(err) : resolve(filenames))
    )
  })

  return readDirPr.then(filenames =>
    Promise.all(
      filenames.map(filename => {
        return new Promise((resolve, reject) => {
          fs.readFile(dirname + filename, 'utf-8', (err, content) => {
            let obj = {}
            /**
             * Parse frontmatter and markdown ...
             */
            obj = fm(content)
            /**
             * ... slugify filename ...
             */
            const f = filename.split('.')
            obj.slug = slug(f[0])
            /**
             * ... flatten obj by moving obj.attributes up one level ...
             */
            for (let attr in obj.attributes) {
              obj[attr] = obj.attributes[attr]
            }
            /**
             * ... delete obj.attributes.
             */
            delete obj.attributes
            resolve(obj)
          })
        })
      })
    ).catch(error => Promise.reject(error))
  )
}

if (!fs.existsSync(`${apiPath}`)) {
  fs.mkdirSync(`${apiPath}`)
}

contentPaths.forEach(contentPath => {
  readFiles(`${rootPath}${contentPath}/`).then(
    allContents => {
      //allContents.sort(dynamicSort('posted'))
      allContents.sort(function compare(a, b) {
        let dateA = new Date(a.posted)
        let dateB = new Date(b.posted)
        return dateB - dateA
      })
      fs.writeFileSync(
        `${apiPath}${contentPath}.json`,
        JSON.stringify(allContents)
      )
    },
    error => console.log(error)
  )
})
