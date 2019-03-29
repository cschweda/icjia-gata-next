<template>
  <div>
    <h1>{{ grant.title }}</h1>
    <p>{{ grant.body }}</p>
 
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
    ...mapGetters(['grants'])
  },
  asyncData({ store, params }) {
    const slug = params.slug
    const query = jsonata(`$[slug="${slug}"]`)
    const result = query.evaluate(store.state.grants)
    return { grant: result }
  }
}
</script>

<style scoped>
</style>
