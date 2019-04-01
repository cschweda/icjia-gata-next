<template>
  <div>
    <base-page :content="result"/>
    
  </div>
</template>

<script>
import BasePage from '@/components/BasePage'
import jsonata from 'jsonata'
import { mapGetters } from 'vuex'

export default {
  transition: 'tweakOpacity',
  components: { BasePage },
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
  },
  computed: {}
}
</script>

<style scoped>
</style>
