<template>
  <v-app>
    <v-toolbar>
      <!-- <v-toolbar-side-icon/> -->
      <v-toolbar-title>icjia-gata-next</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items class="hidden-sm-and-down">
        
        <v-btn 
          flat 
          to="/">Home</v-btn>
        
        
        <v-btn 
          flat 
          to="/grants">Grants</v-btn>
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
