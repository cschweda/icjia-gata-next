<template>
  <v-toolbar color="blue darken-4" dark>
    <v-toolbar-side-icon @click="toggleSidebar"/>
    <v-toolbar-title class="display siteTitle">
      <nuxt-link to="/" class="noUnderline">
        <span class="muted">ICJIA&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <span style="color: #fff !important">GATA INFORMATION</span>
      </nuxt-link>
    </v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items class="hidden-sm-and-down display">
      <!-- <v-btn flat to="/news" class="heavy muted">News</v-btn> -->

       
      <menu-dropdown :items="currentFundingOpps" text="Funding Opportunities"/>
      <v-btn icon to="/search">
        <v-icon>search</v-icon>
      </v-btn>
      

    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import jsonata from 'jsonata'
import format from 'date-fns/format'
import { mapGetters } from 'vuex'
import { EventBus } from '@/event-bus.js'
import MenuDropdown from '@/components/MenuDropdown.vue'
export default {
  components: {
    MenuDropdown
  },
  data() {
    return {
      now: format(new Date()),
      empty: []
    }
  },
  computed: {
    ...mapGetters(['funding']),
    currentFundingOpps() {
      const currentFundingOpps = this.funding.filter(item => {
        if (format(item.expires) > this.now) {
          return item
        }
      })
      return currentFundingOpps
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
