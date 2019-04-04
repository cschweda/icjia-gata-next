<template>
  <v-app id="top">
    <app-nav/>
    
    <nuxt/>
  </v-app>
</template>

<script>
import { EventBus } from '@/event-bus.js'
import Sidebar from '@/components/Sidebar'
import AppNav from '@/components/AppNav.vue'

export default {
  components: {
    Sidebar,
    AppNav
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style>
/* Github CSS */
@import '@/assets/style/github.css';
@import '@/assets/style/app.css';
</style>
