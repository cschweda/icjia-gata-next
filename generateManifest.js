const fs = require('fs')
const fm = require('front-matter')
const path = require('path')
const slug = require('slug')

const markdownSourcePath = './markdown/'
const markdownContentFolders = ['pages', 'grants', 'news']
const jsonDestinationPath = './api/'

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

function linkify(html, prefix) {
  const re = new RegExp('^(http|https|mailto)://', 'i')

  const result = html.replace(/href="([^"]+)/g, function($1) {
    const arr = $1.split('"')
    let match = re.test(arr[1])
    if (!match) {
      return `href="/static/${prefix}/${arr[1]}`
    }
    return $1
  })
  return result
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
            obj.slug = slug(f[0])
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
             * ... render markdown to html (and point non-http/s links to static folder) ...
             */
            obj.html = linkify(md.render(obj.body), obj.slug)
            /**
             * ... and delete markdown.
             */
            delete obj.body

            // console.log(obj.title, datefns.format(obj.posted))
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

/**
 * Iterate through content folders ...
 */
markdownContentFolders.forEach(contentPath => {
  /**
   * ... read each markdown file ...
   */
  readFiles(`${markdownSourcePath}${contentPath}/`).then(
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
        `${jsonDestinationPath}${contentPath}.json`,
        JSON.stringify(allContents)
      )
    },
    error => console.log(error)
  )
})
