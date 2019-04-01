<template>
  <div>
    <v-form class="pb-5 mt-2">
      <v-container>
        <v-flex xs12 class="px-5">
          <h1 class="px-3">Search</h1>
          <v-text-field
            v-model="query"
            label="Search"
            placeholder="Enter search term"
            class="px-3"
            @keyup="instantSearch"
          />
          <div v-for="(result, index) in results" :key="index" class="px-4">
            <div>
              <nuxt-link :to="result.path">
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
      keys: ['title', 'excerpt', 'html', 'section', 'posted']
    })
  },

  methods: {
    instantSearch() {
      this.results = this.fuse.search(this.query)
    }
  }
}
</script>
