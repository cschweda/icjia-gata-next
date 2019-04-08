<template>
  <v-app id="top">
    <!-- <no-ssr>
      <browser-detect/>
    </no-ssr> -->
    <sidebar/>
    <app-nav/>
    <v-content>
      <nuxt/>
    </v-content>
    
  </v-app>
</template>

<script>
import { EventBus } from '@/event-bus.js'

import Sidebar from '@/components/Sidebar'
import AppNav from '@/components/AppNav'

export default {
  components: { Sidebar, AppNav },
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
