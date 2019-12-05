module.exports = {
  markdownItOptions: {
    html: true,
    xhtmlOut: false,
    breaks: false,
    langPrefix: 'language-',
    linkify: true,
    typographer: false,
    quotes: '“”‘’'
  },
  scrollToOptions: {
    container: 'body',
    duration: 500,
    easing: 'ease',
    offset: 0,
    force: true,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
  },
  markdownSourcePath: './markdown/',
  staticAssetPath: '/',
  jsonDestinationPath: './api/',
  dateFormat: 'MMMM DD, YYYY',
  dateFields: ['posted', 'created', 'expires', 'updated'],
  siteConfig: {
    pages: {
      parentPath: '/',
      type: 'page',
      sortOn: 'position',
      filename: 'pages.json'
    },
    funding: {
      parentPath: '/funding/',
      type: 'funding',
      sortOn: 'expires',
      filename: 'funding.json'
    },
    news: {
      parentPath: '/news/',
      type: 'news',
      sortOn: 'posted',
      filename: 'news.json'
    }
  },
  debug: false
}
