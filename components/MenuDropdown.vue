<template>
  <v-menu offset-y max-width="350" nudge-left="120">
    <template v-slot:activator="{ on }">
      <v-btn flat class="heavy" style="color: #666" v-on="on">
        {{text}}
        <v-icon dark>arrow_drop_down</v-icon>
      </v-btn>
    </template>
    <v-list v-if="items.length === 0" two-line subheader>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <v-icon color="indigo lighten-1">info</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>There are no current opportunities</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider inset/>
      <v-list-tile avatar @click="push('/funding')">
        <v-list-tile-avatar>
          <v-icon color="grey darken-2">folder</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>View the Archive</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-list v-else two-line subheader>
      <v-subheader inset style="font-weight: bold; color: #555">Current Opportunities</v-subheader>

      <v-list-tile v-for="item in items" :key="item.title" avatar @click="push(item.path)">
        <!-- <v-list-tile-avatar>
          <v-icon color="indigo lighten-1">info</v-icon>
        </v-list-tile-avatar>-->

        <v-list-tile-content>
          <v-list-tile-title style="font-weight: 700;">{{ item.title }}</v-list-tile-title>
          <v-list-tile-sub-title>Expires: {{ item.expires | format}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider inset/>

      <v-list-tile avatar @click="push('/funding')">
        <v-list-tile-avatar>
          <v-icon color="grey darken-2">folder</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>View the Archive</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '@/event-bus.js'
import config from '@/config'

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
  methods: {
    push(path) {
      this.$router.push(path)
    },
    formatDate(date) {
      return date
    }
  }
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
