<template>
  <v-app id="top">
    <sidebar/>
    <app-nav/>
    
    <nuxt/>
  </v-app>
</template>

<script>
import { EventBus } from '@/event-bus.js'

export default {
  components: {},
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
