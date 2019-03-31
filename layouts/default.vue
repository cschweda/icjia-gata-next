<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-side-icon @click="toggleSidebar"/>
      <v-toolbar-title class="display siteTitle">
        <nuxt-link to="/" class="noUnderline">
          <span class="muted">ICJIA</span> | GATA Information
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items class="hidden-sm-and-down display">
        <v-btn flat to="/news" class="heavy muted">News</v-btn>

        <v-btn flat to="/grants" class="heavy muted">Grant Opportunities</v-btn>
        <v-btn icon to="/search">
          <v-icon>search</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <!-- <v-navigation-drawer v-model="drawer" absolute temporary>Test</v-navigation-drawer> -->
      <sidebar/>
      <nuxt/>
    </v-content>
  </v-app>
</template>

<script>
import { EventBus } from '@/event-bus.js'
import Sidebar from '@/components/Sidebar'
export default {
  components: {
    Sidebar
  },
  data() {
    return {}
  },
  methods: {
    toggleSidebar() {
      EventBus.$emit('toggleSidebar')
    }
  }
}
</script>

<style>
.tweakOpacity-enter-active,
.tweakOpacity-leave-active {
  transition: opacity 0.2s ease-out;
}
.tweakOpacity-enter,
.tweakOpacity-leave-active {
  opacity: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: neue-haas-grotesk-display, sans-serif !important;
  font-weight: 700 !important;
  font-style: normal !important;
}

.display {
  font-family: neue-haas-grotesk-display, sans-serif !important;
  font-weight: 700 !important;
  font-style: normal !important;
}

.siteTitle {
  text-decoration: none;
}
.noUnderline {
  text-decoration: none;
}
.muted {
  color: #666 !important;
}

.heavy {
  font-weight: 700;
}

.pageTitle {
  border-bottom: 1px solid #ccc;
  padding-bottom: 4px !important;
  margin-bottom: 25px;
}
</style>
