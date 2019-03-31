<template>
  <div>
    <v-form class="pb-5 mt-2">
      <v-container>
        <v-flex xs12>
          <h1 class="px-3">Search</h1>
          <v-text-field
            v-model="query"
            label="Search"
            placeholder="Enter search term"
            class="px-3"
            @keyup="instantSearch"
          />
          <div v-for="(result, index) in results" :key="index" class="px-3">
            <div>
              <nuxt-link :to="generatePath(result)">
                <h2>{{result.title}}</h2>
              </nuxt-link>
              <p>{{result.excerpt}}</p>
            </div>
          </div>
        </v-flex>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Fuse from 'fuse.js'
export default {
  transition: 'tweakOpacity',
  data() {
    return {
      query: '',
      results: []
    }
  },
  computed: {
    ...mapGetters(['pages', 'grants', 'news'])
  },
  mounted() {
    let allSiteContent = [...this.news, ...this.pages, ...this.grants]
    this.fuse = new Fuse(allSiteContent, {
      shouldSort: true,
      threshold: 0.5,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['title', 'excerpt', 'html']
    })
  },

  methods: {
    instantSearch() {
      this.results = this.fuse.search(this.query)
    },
    generatePath(result) {
      if (result.section != 'pages') {
        return `/${result.section}/${result.slug}`
      } else {
        return `/${result.slug}`
      }
    }
  }
}
</script>
