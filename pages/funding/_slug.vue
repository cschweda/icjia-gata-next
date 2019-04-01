<template>
  <v-layout>
    <v-container>
      <v-flex xs12 class="px-5">
        <div class="nofo">Notice of Funding Opportunity</div>
        <h1 class="pageTitle">{{ grant.title }}</h1>
        <p class="px-3 markdown-body" v-html="grant.html"/>
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
    ...mapGetters(['funding'])
  },
  asyncData({ store, params, route, error }) {
    const slug = params.slug
    const query = jsonata(`$[slug="${slug}"]`)
    const result = query.evaluate(store.state.funding)
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
.nofo {
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  color: #555;
}
</style>
