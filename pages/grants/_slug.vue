<template>
  <v-layout>
    <v-container>
      <v-flex xs12 class="px-5">
        <h1 class="pageTitle">{{ grant.title }}</h1>
        <p class="px-3" v-html="grant.html"/>
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
    ...mapGetters(['grants'])
  },
  asyncData({ store, params, route, error }) {
    const slug = params.slug
    const query = jsonata(`$[slug="${slug}"]`)
    const result = query.evaluate(store.state.grants)
    if (result != undefined) {
      return { grant: result }
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
