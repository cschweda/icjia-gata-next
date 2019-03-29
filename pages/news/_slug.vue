<template>
  <v-layout>
    <v-container>
      <v-flex xs12>
        <h1>{{ news.title }}</h1>
        <p v-html="news.html"/>
      </v-flex>
    </v-container>
  </v-layout>
</template>

<script>
import jsonata from 'jsonata'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['news'])
  },
  asyncData({ store, params, route, error }) {
    const slug = params.slug
    const query = jsonata(`$[slug="${slug}"]`)
    const result = query.evaluate(store.state.news)
    if (result != undefined) {
      return { news: result }
    } else {
      return error({
        statusCode: 404,
        message: ' Page not found '
      })
    }
  }
}
</script>

<style scoped>
</style>
