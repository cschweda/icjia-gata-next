<template>
  <div>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <h1 class="pageTitle">GRANT ACCOUNTABILITY AND TRANSPARENCY AT ICJIA</h1>
          <div v-html="page.html"/>
        </v-flex>
      </v-layout>
    </v-container>
    <div style="background: #aaa;">
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text class="px-3">
              <h2 class="mb-3" style="color: #fff;">Current Grant Opportunities</h2>
              <div v-for="grant in grantsToDisplay" :key="grant.slug">
                <v-card class="mb-4 elevation-0">
                  <v-card-title>
                    <nuxt-link :to="`/grants/${grant.slug}`">{{ grant.title }}</nuxt-link>
                  </v-card-title>
                  <v-card-text>
                    {{ grant.excerpt }}
                    <h4 class="mt-2">Posted: {{ grant.posted }}</h4>
                    <h4>Expires: {{ grant.expires }}</h4>
                  </v-card-text>
                </v-card>
              </div>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card-text class="px-3">
            <h2 class="mb-3">News</h2>
            <div v-for="post in news" :key="post.slug">
              <v-card class="mb-4 elevation-0">
                <v-card-title>
                  <nuxt-link :to="`/news/${post.slug}`">{{ post.title }}</nuxt-link>
                </v-card-title>
                <v-card-text>{{ post.excerpt }}</v-card-text>
              </v-card>
            </div>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-container>
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
