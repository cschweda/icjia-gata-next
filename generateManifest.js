const fs = require('fs')
const fm = require('front-matter')
const path = require('path')
const slug = require('slug')

const markdownSourcePath = './markdown/'
const staticAssetPath = '/'
const jsonDestinationPath = './api/'
const config = require('./config')

const dateFields = ['posted', 'created', 'expires', 'updated']
const format = require('date-fns/format')

const arr = []

let md = require('markdown-it')({
  html: true,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  linkify: true,
  typographer: false,
  quotes: '“”‘’'
})
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-named-headers'))
  .use(require('markdown-it-attrs'))

/**
 * Sort array of objects by property
 *
 * https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
 */
function dynamicSort(property) {
  var sortOrder = 1
  if (property[0] === '-') {
    sortOrder = -1
    property = property.substr(1)
  }
  return function(a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
    return result * sortOrder
  }
}

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
            obj.slug = slug(f[0]).toLowerCase()

            /**
             * ... flatten obj by moving obj.attributes up one level ...
             */
            for (let attr in obj.attributes) {
              obj[attr] = obj.attributes[attr]
              /**
               * ... convert YAML date string to ISU 8601 ...
               */
              dateFields.find(df => {
                if (df === attr) {
                  if (obj[attr] != 'never') {
                    obj[attr] = format(obj[attr])
                  }
                }
              })
            }
            /**
             * ... delete obj.attributes ...
             */
            delete obj.attributes

            /**
             * ... generate url path ...
             */
            //console.log(config.siteConfig[obj.section])
            if (obj.slug != 'home') {
              obj.path = `${config.siteConfig[obj.section].parentPath}${
                obj.slug
              }`
            } else {
              obj.path = '/'
            }

            resolve(obj)
          })
        })
      })
    ).catch(error => Promise.reject(error))
  )
}

if (!fs.existsSync(`${jsonDestinationPath}`)) {
  fs.mkdirSync(`${jsonDestinationPath}`)
}

const siteArray = Object.getOwnPropertyNames(config.siteConfig)
siteArray.forEach(obj => {
  readFiles(`${markdownSourcePath}${obj}/`).then(
    allContents => {
      if (config.siteConfig[obj].type === 'page') {
        /**
         * ... sort on 'position' if item is a page ...
         */
        allContents.sort(dynamicSort('position'))
      } else {
        /**
         * ... otherwise on specific date field for everything else ...
         */

        allContents.sort(function compare(a, b) {
          let dateA = new Date(a[config.siteConfig[obj].sortOn])
          let dateB = new Date(b[config.siteConfig[obj].sortOn])
          return dateB - dateA
        })
      }

      /**
       * ... then write a single json file to api directory for each content folder.
       */
      fs.writeFileSync(
        `${jsonDestinationPath}${obj}.json`,
        JSON.stringify(allContents)
      )
      console.log(`${jsonDestinationPath}${obj}.json: successfully created`)
    },
    error => console.log(error)
  )
  console.log(obj)
})
