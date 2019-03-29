<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-side-icon/>
      <v-toolbar-title><nuxt-link to="/">icjia-gata-next</nuxt-link></v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items class="hidden-sm-and-down">
        
        
        <v-btn 
          flat 
          to="/news">News</v-btn>
        
        <v-btn 
          flat 
          to="/grants">Grant Opportunities</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      
      <nuxt />
      
    </v-content>
   
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
