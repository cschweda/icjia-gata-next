<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 px-5>
          <h1 class="pageTitle">GRANT ACCOUNTABILITY AND TRANSPARENCY AT ICJIA</h1>
          <div v-html="page.html"/>
        </v-flex>
      </v-layout>
    </v-container>
    <div style="background: #eee; border-top: 1px solid #ccc;">
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12>
            <h2 class="mb-3" style="color: #333;">Current Grant Opportunities</h2>
            <div v-for="grant in grantsToDisplay" :key="grant.slug">
              <div class="mb-4 px-5 py-4 elevation-1 grey lighten-4">
                <h2>
                  <nuxt-link :to="`${grant.path}`">{{ grant.title }}</nuxt-link>
                </h2>
                <div>
                  {{ grant.excerpt }}
                  <h4 class="mt-2">Posted: {{ grant.posted }}</h4>
                  <h4>Expires: {{ grant.expires }}</h4>
                </div>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import jsonata from 'jsonata'
import format from 'date-fns/format'
import { mapGetters } from 'vuex'

export default {
  transition: 'tweakOpacity',
  components: {},
  data() {
    return {
      showCurrent: true
    }
  },
  asyncData({ store, params, route, error }) {
    const slug = params.slug
    const query = jsonata(`$[slug="home"]`)
    const result = query.evaluate(store.state.pages)
    if (result != undefined) {
      return { page: result }
    } else {
      return error({
        statusCode: 404,
        message: ' Page not found '
      })
    }
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'grants',
      'pages',
      'news'
      // ...
    ]),
    grantsToDisplay() {
      let now = format(new Date())
      let currentGrants = this.grants.filter(grant => {
        if (grant.expires > now) {
          return grant
        }
      })
      return currentGrants
    }
  }
}
</script>
