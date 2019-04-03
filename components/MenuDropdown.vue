<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn flat class="heavy muted" v-on="on">{{text}} <v-icon dark>arrow_drop_down</v-icon></v-btn>
    </template>
    <v-list>
      <v-list-tile
        v-for="item in items"
        :key="item"
        
      >
        <v-list-tile-title v-text="item"/>
      </v-list-tile>
    </v-list>
  </v-menu>
  
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Undefined'
    }
  },
  data() {
    return {
      items: ['List', 'Current', 'Funding', 'Opportunities', 'Here']
    }
  }
}
</script>

<style scoped>
</style>
