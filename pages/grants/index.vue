<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 class="px-5">
        <h1 class="pageTitle">Grant Opportunities</h1>

        <v-switch v-model="showCurrent" :label="pageHeading"/>
        <div v-for="grant in grantsToDisplay" :key="grant.slug">
          <v-card class="mb-4 px-3 py-3 elevation-1">
            <h2>
              <nuxt-link :to="`${grant.path}`">{{ grant.title }}</nuxt-link>
            </h2>
            <v-card-text>
              {{ grant.excerpt }}
              <h4 class="mt-2">Posted: {{ grant.posted }}</h4>
              <h4>{{ isExpired(grant.expires) }}</h4>
            </v-card-text>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import format from 'date-fns/format'
import { mapGetters } from 'vuex'
export default {
  transition: 'tweakOpacity',
  components: {},
  data() {
    return {
      showCurrent: true,
      now: format(new Date())
    }
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'grants',
      'pages'
      // ...
    ]),
    pageHeading() {
      if (this.showCurrent) {
        return 'Current Opportunities'
      } else {
        return 'All Opportunities'
      }
    },
    grantsToDisplay() {
      if (!this.showCurrent) {
        return this.grants
      } else {
        let currentGrants = this.grants.filter(grant => {
          if (grant.expires > this.now) {
            return grant
          }
        })
        return currentGrants
      }
    }
  },
  methods: {
    isExpired(date) {
      if (this.now > date) {
        return 'Expired'
      } else {
        return `Deadlline: ${date}`
      }
    }
  }
}
</script>

<style>
.v-input--selection-controls.v-input .v-label {
  font-weight: 700;
  font-size: 18px;
}

h2 a {
  text-decoration: none;
}

h2 a:hover {
  color: #aaa;
}
</style>
