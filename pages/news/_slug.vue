<template>
  <v-layout>
    <v-container>
      <v-flex xs12>
        <h1>{{ result.title }}</h1>
        <p v-html="result.html"/>
      </v-flex>
    </v-container>
  </v-layout>
</template>

<script>
import jsonata from 'jsonata'
import { mapGetters } from 'vuex'
export default {
  transition: 'tweakOpacity',
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
      return { result }
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
