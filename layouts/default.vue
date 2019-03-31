<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-side-icon @click="toggleSidebar"/>
      <v-toolbar-title>
        <nuxt-link to="/">icjia-gata-next</nuxt-link>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/news">News</v-btn>

        <v-btn flat to="/grants">Grant Opportunities</v-btn>
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
</style>
