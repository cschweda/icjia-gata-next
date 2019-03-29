<template>
  
  
  <v-container 
    grid-list-md 
  >
    <v-layout 
      row 
      wrap>
      
      <v-flex 
       
        xs6>
        <v-card 
           
          color="grey lighten-2">
          <v-card-text class="px-3">
            <h2>Grants</h2>
            {{ grants }}
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex 
       
        xs6>
        <v-card 
           
          color="grey lighten-2">
          <v-card-text class="px-3">
            <h2>Pages</h2>
            {{ pages }}
          </v-card-text>
        </v-card>
      </v-flex>
      
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'grants',
      'pages'
      // ...
    ])
  }
}
</script>
