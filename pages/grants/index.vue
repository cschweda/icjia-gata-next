<template>
  <v-container 
    grid-list-md 
  >
    <v-layout 
      row 
      wrap>
      
      <v-flex 
       
        xs12>
        
        <v-card-text class="px-3">
          <h2 class="mb-3">All Grants</h2>
          <div 
            v-for="grant in grants" 
            :key="grant.slug">
            <v-card class="mb-4">
              <v-card-title>
                <nuxt-link :to="`/grants/${grant.slug}`">{{ grant.title }}</nuxt-link>
              </v-card-title>
              <v-card-text>
                {{ grant.description }}
                
              </v-card-text>
            </v-card>
          </div>
        </v-card-text>
        
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
      'grants'
      // ...
    ])
  }
}
</script>

<style scoped>
</style>
