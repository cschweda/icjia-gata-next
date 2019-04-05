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
import format from 'date-fns/format'
import isAfter from 'date-fns/is_after'
import endOfDay from 'date-fns/end_of_day'
import { mapGetters } from 'vuex'
import { EventBus } from '@/event-bus.js'
import MenuDropdown from '@/components/MenuDropdown.vue'
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
    ...mapGetters(['funding']),
    currentFundingOpps() {
      let funding = this.funding.filter(f => {
        if (!isAfter(new Date(), new Date(endOfDay(f.expires)))) {
          return f
        }
      })

      return funding
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
