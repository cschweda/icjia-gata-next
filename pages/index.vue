<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm12 md4>
        <v-card-text class="px-3">
          <h2 class="mb-3">Current Grant Opportunities</h2>
          <div v-for="grant in grantsToDisplay" :key="grant.slug">
            <v-card class="mb-4">
              <v-card-title>
                <nuxt-link :to="`/grants/${grant.slug}`">{{ grant.title }}</nuxt-link>
              </v-card-title>
              <v-card-text>
                {{ grant.description }}
                <h4 class="mt-2">Posted: {{ grant.posted }}</h4>
                <h4>Expires: {{ grant.expires }}</h4>
              </v-card-text>
            </v-card>
          </div>
        </v-card-text>
      </v-flex>
      <v-flex xs12 sm12 md4>
        <v-card-text class="px-3">
          <h2 class="mb-3">Pages</h2>
          <div v-for="page in pages" :key="page.slug">
            <v-card class="mb-4">
              <v-card-title>
                <nuxt-link :to="`/${page.slug}`">{{ page.title }}</nuxt-link>
              </v-card-title>
              <v-card-text>{{ page.excerpt }}</v-card-text>
            </v-card>
          </div>
        </v-card-text>
      </v-flex>
      <v-flex xs12 sm12 md4>
        <v-card-text class="px-3">
          <h2 class="mb-3">News</h2>
          <div v-for="post in news" :key="post.slug">
            <v-card class="mb-4">
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
</template>

<script>
import format from 'date-fns/format'
import { mapGetters } from 'vuex'
export default {
  components: {},
  data() {
    return {
      showCurrent: true
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
