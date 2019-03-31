<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <h1 class="px-3">News</h1>
        <v-card-text class="px-3">
          <div v-for="post in news" :key="post.slug">
            <v-card class="mb-4">
              <v-card-title>
                <nuxt-link :to="`/news/${post.slug}`">{{ post.title }}</nuxt-link>
              </v-card-title>
              <v-card-text>
                {{ post.excerpt }}
                <h4 class="mt-2">Posted: {{ post.posted }}</h4>
              </v-card-text>
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
  transition: 'tweakOpacity',
  components: {},
  data() {
    return {
      showCurrent: true,
      now: format(new Date())
    }
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'news'
      // ...
    ])
  },
  methods: {}
}
</script>

<style>
</style>
