const pkg = require('./package')
const routes = require('./routes')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'ICJIA | GATA Information',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'The Grant Accountability and Transparency Act (GATA) of 2014, 30 ILCS 708/1 et seq., increased accountability and transparency in the use of grant funds and reduced the administrative burden on state agencies and grantees through adoption of federal grant guidelines and regulations.'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.typekit.net/vcm3bxc.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css'
      }
    ],
    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js'
      },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/event-source-polyfill/0.0.9/eventsource.min.js'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['~/assets/style/app.styl'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['@/plugins/vuetify', '@/plugins/filters'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ['vue-scrollto/nuxt', { duration: 300, offset: -80 }],
    '@nuxtjs/sitemap',
    ['@nuxtjs/google-analytics']
  ],
  googleAnalytics: {
    id: 'UA-10798495-20'
  },
  generate: {
    routes
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://grants.icjia.cloud',
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    exclude: [],
    routes
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
