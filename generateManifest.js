const fs = require('fs')
const fm = require('front-matter')
const path = require('path')
const slug = require('slug')

const rootPath = './markdown/'
const contentPaths = ['pages', 'grants']
const apiPath = './api/'

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
             * ... delete obj.attributes ...
             */
            delete obj.attributes

            obj.html = md.render(obj.body)
            delete obj.body
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

/**
 * Iterate through content folders ...
 */
contentPaths.forEach(contentPath => {
  /**
   * ... read each markdown file ...
   */
  readFiles(`${rootPath}${contentPath}/`).then(
    allContents => {
      /**
       * ... sort descending on 'posted' ...
       */
      allContents.sort(function compare(a, b) {
        let dateA = new Date(a.posted)
        let dateB = new Date(b.posted)
        return dateB - dateA
      })
      /**
       * ... then write a single json file to api directory for each content folder.
       */
      fs.writeFileSync(
        `${apiPath}${contentPath}.json`,
        JSON.stringify(allContents)
      )
    },
    error => console.log(error)
  )
})
