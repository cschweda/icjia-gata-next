<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 class="px-5">
        <h1 class="pageTitle">News</h1>

        <div v-for="post in news" :key="post.slug">
          <v-card class="mb-4 px-3 py-3 elevation-1">
            <h2>
              <nuxt-link :to="`/news/${post.slug}`">{{ post.title }}</nuxt-link>
            </h2>
            <v-card-text>
              {{ post.excerpt }}
              <h4 class="mt-2">Posted: {{ post.posted }}</h4>
            </v-card-text>
          </v-card>
        </div>
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

<style scoped>
h2 a {
  text-decoration: none;
}

h2 a:hover {
  color: #aaa;
}
</style>
