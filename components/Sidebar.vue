<template>
  <div>
    <v-navigation-drawer
      v-model="sidebar"
      absolute
      temporary
      style="overflow-y: hidden !important;"
    >
      <v-layout sidebar-height column ma-0 px-3>
        <div class="sidebarItem mt-3">
          <nuxt-link to="/" class="sidebar-link">Home</nuxt-link>
        </div>
        <div class="sidebarItem">
          <nuxt-link to="/news" class="sidebar-link">News</nuxt-link>
        </div>
        <div class="sidebarItem">
          <nuxt-link to="/grants" class="sidebar-link">Grants</nuxt-link>
        </div>
        <v-divider/>
        <div
          v-for="(page, index) in pages"
          :key="index"
          class="sidebarItem"
          style="margin-top: 0px;"
        >
          <nuxt-link
            v-if="page.menuItem"
            :to="generateSlug(page.slug)"
            class="sidebar-link"
          >{{page.title}}</nuxt-link>
        </div>
        <v-divider/>
        <div class="sidebarItem" style="padding-top: 10px;">
          <nuxt-link to="/search" class="sidebar-link">Search</nuxt-link>
        </div>
        <v-spacer/>
        <v-divider/>
        <div class="text-xs-center mb-3 pt-3">
          <h4 style="color: #333;">Additional Info Here</h4>
        </div>
      </v-layout>
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
.sidebarItem {
  font-family: neue-haas-grotesk-display, sans-serif !important;
  font-weight: 700 !important;
  font-style: normal !important;
  font-size: 20px;
  padding-bottom: 10px;
}

.sidebar-link {
  text-decoration: none !important;
}

.sidebar-link:hover {
  color: #aaa;
}

.sidebar-height {
  min-height: 91vh;
}
</style>
