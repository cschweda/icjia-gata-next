<template>
  <div>
    <v-toolbar :clipped-left="clipped" color="grey lighten-4" app fixed>
      <v-toolbar-side-icon @click="toggleSidebar"/>
      <v-toolbar-title class="display siteTitle">
        <nuxt-link to="/" class="noUnderline">
          <span style="color: #aaa">ICJIA&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <span style="color: #333 !important">GATA INFORMATION</span>
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items class="hidden-sm-and-down display">
        <menu-dropdown :items="currentFundingOpps" text="Funding Opportunities"/>
        <v-btn icon to="/search" style="color: #555">
          <v-icon>search</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import jsonata from 'jsonata'

import { mapGetters } from 'vuex'
import { EventBus } from '@/event-bus.js'
import MenuDropdown from '@/components/MenuDropdown.vue'
const moment = require('moment')
export default {
  components: {
    MenuDropdown
  },
  data() {
    return {
      empty: [],
      clipped: true
    }
  },
  computed: {
    ...mapGetters(['funding', 'current']),
    currentFundingOpps() {
      return this.current
    }
  },
  methods: {
    toggleSidebar() {
      EventBus.$emit('toggleSidebar')
    }
  }
}
</script>

<style scoped>
</style>
