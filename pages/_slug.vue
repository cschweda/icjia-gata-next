<template>
  <div>
    <base-page :content="page"/>
    
  </div>
</template>

<script>
import jsonata from 'jsonata'
import { mapGetters } from 'vuex'
import BasePage from '@/components/BasePage'

export default {
  transition: 'tweakOpacity',
  components: {
    BasePage
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['pages'])
  },
  asyncData({ store, params, route, error }) {
    const slug = params.slug
    const query = jsonata(`$[slug="${slug}"]`)
    const result = query.evaluate(store.state.pages)
    if (result != undefined) {
      return { page: result }
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
