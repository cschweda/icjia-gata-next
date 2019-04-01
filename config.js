module.exports = {
  markdownItOptions: {
    html: true,
    xhtmlOut: false,
    breaks: true,
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
  siteConfig: {
    pages: {
      parentPath: '/',
      type: 'page',
      sortOn: 'position'
    },
    funding: {
      parentPath: '/funding/',
      type: 'funding',
      sortOn: 'posted'
    },
    news: {
      parentPath: '/news/',
      type: 'news',
      sortOn: 'posted'
    }
  },
  debug: false
}
