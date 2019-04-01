<template>
  <div>
    <base-page :content="result"/>
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
    ...mapGetters(['funding'])
  },
  asyncData({ store, params, route, error }) {
    const slug = params.slug
    const query = jsonata(`$[slug="${slug}"]`)
    const result = query.evaluate(store.state.funding)
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
.nofo {
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  color: #555;
}
</style>
