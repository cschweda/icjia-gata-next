<template>
  <div>
    <h1>{{ page.title }}</h1>
    <p>{{ page.body }}</p>
 
  </div>
</template>

<script>
import jsonata from 'jsonata'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['pages'])
  },
  asyncData({ store, params }) {
    const slug = params.slug
    const query = jsonata(`$[slug="${slug}"]`)
    const result = query.evaluate(store.state.pages)
    return { page: result }
  }
}
</script>

<style scoped>
</style>
