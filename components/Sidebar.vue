<template>
  <div>
    <v-navigation-drawer v-model="sidebar" absolute temporary>
      <!-- <h2
        class="text-xs-center"
        style="font-size: 34px; margin-top: 20px;margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 10px;"
      >TITLE HERE</h2>-->
      <div class="mt-3">
        <div>
          <nuxt-link to="/">Home</nuxt-link>
        </div>
        <div>
          <nuxt-link to="/news">News</nuxt-link>
        </div>
        <div>
          <nuxt-link to="/grants">Grants</nuxt-link>
        </div>
        <div v-for="(page, index) in pages" :key="index">
          <nuxt-link :to="generateSlug(page.slug)">{{page.title}}</nuxt-link>
        </div>
        <div>
          <nuxt-link to="/search">Search</nuxt-link>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '@/event-bus.js'
export default {
  data() {
    return {
      sidebar: false
    }
  },
  computed: {
    ...mapGetters(['pages'])
  },
  mounted() {
    EventBus.$on('toggleSidebar', () => {
      console.log('click')
      this.sidebar = !this.sidebar
    })
  },
  methods: {
    generateSlug(slug) {
      return `/${slug}`
    }
  }
}
</script>

<style scoped>
</style>
