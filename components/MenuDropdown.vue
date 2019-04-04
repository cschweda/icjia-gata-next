<template>
  <v-menu offset-y max-width="350" nudge-left="90">
    <template v-slot:activator="{ on }">
      <v-btn flat class="heavy muted" v-on="on">{{text}} <v-icon dark>arrow_drop_down</v-icon></v-btn>
    </template>
    <v-list v-if="items.length === 0">
      <div >
        <div class="text-xs-center px-5 pb-2" style="font-weight: bold;">There are no current opportunities</div>
        <v-divider/>
        <div class="px-3 py-2 text-xs-center archive-link" @click="$router.push('/funding')">View the archive</div>
      </div>
      
      
    </v-list>
   
    <v-list v-else class="pt-4" >
      <v-list-tile
        v-for="(item, index) in items"
        :key="index"
        class="pb-3 menuDropdown"
        
      >
        <nuxt-link :to="item.path" class="menuItem">
          <div class="px-2 py-2">
            {{item.title}}</div>
        </nuxt-link>
        
      </v-list-tile>
    </v-list>
  </v-menu>
  
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '@/event-bus.js'
export default {
  props: {
    text: {
      type: String,
      default: 'Undefined'
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style>
.menuItem {
  font-size: 12px;
  font-weight: bold;
  color: #444;
  text-decoration: none;
}

.menuItem {
  text-decoration: none;
  color: #555;
}

.menuItem:hover {
  background: #303f9f;
  color: #fff;
}

.archive-link {
  cursor: pointer;
}

.menuDropdown .v-list__tile {
  padding: 0 0px !important;
}
</style>
