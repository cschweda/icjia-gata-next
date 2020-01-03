// import Vue from 'vue'
// import Vuetify from 'vuetify'
// import colors from 'vuetify/es5/util/colors'

// Vue.use(Vuetify, {
//   theme: {
//     primary: '#121212', // a color that is not in the material colors palette
//     accent: colors.grey.darken3,
//     secondary: colors.amber.darken3,
//     info: colors.teal.lighten1,
//     warning: colors.amber.base,
//     error: colors.deepOrange.accent4,
//     success: colors.green.accent3
//   }
// })

// v2.0
// src/plugins/vuetify.js
// follow official document
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
Vue.use(Vuetify)
export default new Vuetify({
  dark: ture, // it's decide your project
  themes: {
    light: {
      prime: '#df8421'
    },
    dark: {
      prime: '#333'
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
