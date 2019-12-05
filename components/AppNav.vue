<template>
  <div>
    <v-toolbar 
      :clipped-left="clipped" 
      color="grey lighten-4" 
      app 
      fixed>
      
      <img 
        src="../assets/img/logo-small.png" 
        width="70"
        alt="Illinois Criminal Justice Information Authority"
        class="logo"
        @click="gotoIcjia"
      >
      <v-toolbar-title class="display siteTitle">
        
        <nuxt-link 
          to="/" 
          class="noUnderline">
         
          <!-- <span style="color: #aaa">ICJIA&nbsp;&nbsp;|&nbsp;&nbsp;</span> -->
          <span style="color: #333 !important">GATA INFORMATION</span>
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items class="hidden-sm-and-down display">
        <v-btn
     
          flat
          style="font-weight: 900;"
          @click="toggleSidebar"
        >
          MENU&nbsp;&nbsp;&nbsp;&nbsp;
          <v-icon 
             
          >menu</v-icon>
        </v-btn>
       
      </v-toolbar-items>
     
    </v-toolbar>
  </div>
</template>

<script>
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
    ...mapGetters(['funding', 'current']),
    currentFundingOpps() {
      return []
    }
  },
  methods: {
    toggleSidebar() {
      EventBus.$emit('toggleSidebar')
    },
    gotoIcjia() {
      location.href = 'http://www.icjia.state.il.us'
    }
  }
}
</script>

<style scoped>
.logo:hover {
  cursor: pointer;
}
</style>
