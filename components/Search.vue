<template>
  <v-form 
    class="pl-2" 
    style="margin-top: -25px;">
    <v-text-field
      v-model="query"
      label="Search"
      placeholder="Enter search term"
      @keyup="instantSearch"
    />
    <div 
      v-for="(result, index) in queryResults" 
      :key="index" 
      class="px-4 py-3">
      <div v-if="query.length">
        <nuxt-link 
          :to="result.path" 
          style="text-decoration: none">
          <h2>{{ result.title }}</h2>
        </nuxt-link>
        <p>{{ result.excerpt }}</p>
      </div>
    </div>
   
  </v-form>

</template>

<script>
import Fuse from 'fuse.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      query: '',
      queryResults: [],
      content: ''
    }
  },
  computed: {
    ...mapGetters(['pages', 'funding', 'news'])
  },
  watch: {
    query(newValue, oldValue) {}
  },

  mounted() {
    let allSiteContent = [...this.news, ...this.pages, ...this.funding]
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
      this.queryResults = this.fuse.search(this.query)
    }
  }
}
</script>

<style scoped>
</style>
