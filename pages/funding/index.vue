<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <h1 class="pageTitle rule">Funding Opportunities</h1>
        <grant-toggle/>
        <!-- <v-switch v-model="showCurrent" :label="pageHeading" :class="{isExpired: !showCurrent, isCurrent: showCurrent}" />
        -->
        <div v-for="grant in grantsToDisplay" :key="grant.slug">
         
          <v-card class="mb-4 px-3 py-3 elevation-1">
            <div class="text-xs-right date" v-html="isExpired(grant.expires)"/>
            <h2>
              <nuxt-link :to="`${grant.path}`">{{ grant.title }}</nuxt-link>
            </h2>
            <h4 class="mt-2" style="color: #666">Posted: {{ grant.posted }}</h4>
            <v-card-text>
              
              {{ grant.excerpt }}
              
              
            </v-card-text>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import format from 'date-fns/format'
import GrantToggle from '@/components/GrantToggle'
import { mapGetters } from 'vuex'
import { EventBus } from '@/event-bus.js'
export default {
  transition: 'tweakOpacity',
  components: { GrantToggle },
  data() {
    return {
      now: format(new Date()),
      hideExpired: true
    }
  },

  computed: {
    ...mapGetters(['funding']),

    grantsToDisplay() {
      if (!this.hideExpired) {
        return this.funding.filter(grant => {
          if (grant.expires <= this.now) {
            return grant
          }
        })
      } else {
        return this.funding.filter(grant => {
          if (grant.expires > this.now) {
            return grant
          }
        })
      }
    }
  },
  mounted() {
    let expired = this.funding.filter(grant => {
      if (grant.expires <= this.now) {
        return grant
      }
    })
    EventBus.$on('toggleFundingDisplay', state => {
      this.hideExpired = state
    })
  },
  methods: {
    isExpired(date) {
      if (this.now > date) {
        return '<h4 style="color: #D84315;">Expired</h4>'
      } else {
        return `<h4><span>Deadline:&nbsp;&nbsp;${format(
          date,
          'MMMM DD, YYYY'
        )}</span></h4>`
      }
    }
  }
}
</script>

<style>
.isCurrent.v-input--selection-controls.v-input .v-label {
  /* color: #2e7d32; */
  font-weight: bold;
  font-size: 18px;
}

.isExpired.v-input--selection-controls.v-input .v-label {
  /* color: #d84315; */
  font-weight: bold;
  font-size: 18px;
}

h2 a {
  text-decoration: none;
}

h2 a:hover {
  color: #aaa;
}

.date {
  font-size: 18px;
  margin-bottom: 15px;
  color: #666;
}
</style>
