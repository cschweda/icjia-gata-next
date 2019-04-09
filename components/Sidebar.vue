<template>
  <v-navigation-drawer 
    v-model="sidebar" 
    :clipped="clipped" 
    enable-resize-watcher 
    temporary 
    app>
    <v-layout 
      sidebar-height 
      column 
      ma-0 
      px-3>
      <div class="sidebarItem mt-3">
        <nuxt-link 
          to="/" 
          class="sidebar-link">Home</nuxt-link>
      </div>
      <div class="sidebarItem">
        <nuxt-link 
          to="/news" 
          class="sidebar-link">News & Announcements</nuxt-link>
      </div>
      <div class="sidebarItem">
        <nuxt-link 
          to="/funding" 
          class="sidebar-link">Funding Opportunities</nuxt-link>
      </div>
      <v-divider/>
      <div 
        v-for="(page, index) in pages" 
        :key="index" 
        class="sidebarItem">
        <nuxt-link
          v-if="page.menuItem"
          :to="generateSlug(page.slug)"
          class="sidebar-link"
        >{{ page.title }}</nuxt-link>
      </div>
      <v-divider style="margin-top: -25px"/>
      <div 
        class="sidebarItem" 
        style="padding-top: 10px;">
        <nuxt-link 
          to="/search" 
          class="sidebar-link">Search</nuxt-link>
      </div>
      <v-spacer/>
      <v-divider/>
      <div class="text-xs-center mb-3 pt-3 py-3">
        <img
          src="@/assets/img/logo-small.png"
          class="logo"
          height="40"
          @click="goto('http://www.icjia.state.il.us')"
        >
        <h5>
          <a
            href="https://github.com/ICJIA/icjia-gata-next"
            class="sidebar-footer-link"
          >View on Github</a>
        </h5>
        <h5 
          style="color: #666; font-weight: 400 !important;" 
          class="mt-2">
          &copy;&nbsp;2019
          <a
            class="sidebar-footer-link"
            href="http://www.icjia.state.il.us"
          >Illinois Criminal Justice Information Authority</a>
        </h5>
        <!-- <div 
          style="font-size: 10px;" 
          class="mt-2"><a href="https://legacy-grants.icjia.cloud">Previous ICJIA GATA site </a>&raquo;</div>
      </div> -->
    </div></v-layout>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '@/event-bus.js'
export default {
  data() {
    return {
      sidebar: false,
      clipped: false
    }
  },
  computed: {
    ...mapGetters(['pages'])
  },
  mounted() {
    EventBus.$on('toggleSidebar', () => {
      //console.log('click')
      this.sidebar = !this.sidebar
    })
  },
  methods: {
    generateSlug(slug) {
      return `/${slug}`
    },
    goto(url) {
      location.href = url
    }
  }
}
</script>

<style scoped>
.sidebar {
  min-height: 100vh;
}
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
  min-height: 100vh;
}

.logo:hover {
  cursor: pointer;
}

.sidebar-footer-link {
  text-decoration: none;
  font-weight: 400;
}

.sidebar-footer-link:hover {
  color: #aaa;
}
</style>
