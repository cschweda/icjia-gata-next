<template>
  <div>
    <base-content :content="content">
      <template slot="browserCheck">
        <no-ssr>
          <browser-detect/>
        </no-ssr>
      </template>
      <template slot="breadcrumb">
        <breadcrumb :path="content.path" :hide="content.hideBreadcrumb"/>
      </template>
      <template slot="pageTitle" slot-scope="{title}">
        <v-layout row>
          <v-container>
            <v-flex xs12>
              <h1 class="pageTitle rule">{{title}}</h1>
            </v-flex>
          </v-container>
        </v-layout>
      </template>
    </base-content>
    <v-layout class="pull-50">
      <v-container>
        <v-flex xs12>
          <grant-toggle/>
        </v-flex>
      </v-container>
    </v-layout>
    <base-list :items="fundsToDisplay" style="margin-top: -30px;">
      <template slot-scope="item">
        <v-layout row>
          <v-container>
            <v-flex xs12>
              <base-card :item="item" :show-expired="true">
                <template slot="posted">
                  <div class="text-xs-right pr-3 pt-3 pb-2">
                    <h4 class="pr-3 pb-4" style="font-size: 14px;"><span class="posted">Posted:&nbsp;{{ format(item.posted,'MMMM DD, YYYY') }}</span></h4>
                  </div>
                </template>
                <template slot="expires">
                  <div class="text-xs-left pb-2">
                    <h4 class="pl-3 pt-4" style="font-size: 14px;"><span class="expires">{{expiredText}}:&nbsp;{{format(item.expires, "MMMM DD, YYYY")}}</span></h4>
                  </div>
                </template>
            </base-card></v-flex>
          </v-container>
        </v-layout>
      </template>
    </base-list>
    
  </div>
</template>

<script>
import jsonata from 'jsonata'
import format from 'date-fns/format'
import isAfter from 'date-fns/is_after'
import endOfDay from 'date-fns/end_of_day'
import { mapGetters } from 'vuex'

import { EventBus } from '@/event-bus.js'

export default {
  transition: 'tweakOpacity',
  components: {},
  data() {
    return {
      now: format(new Date()),
      hideExpired: true,
      format
    }
  },

  computed: {
    ...mapGetters(['pages', 'funding']),
    expiredText() {
      return this.hideExpired ? 'Expires' : 'Expired'
    },
    fundsToDisplay() {
      let funding = []
      if (this.hideExpired) {
        funding = this.funding.filter(f => {
          if (!isAfter(new Date(), new Date(endOfDay(f.expires)))) {
            return f
          }
        })
        return funding
      } else {
        funding = this.funding.filter(f => {
          if (isAfter(new Date(), new Date(endOfDay(f.expires)))) {
            return f
          }
        })
        return funding
      }
    }
  },
  asyncData({ store, params, route, error }) {
    const slug = params.slug
    const query = jsonata(`$[slug="funding"]`)
    const result = query.evaluate(store.state.pages)
    if (result != undefined) {
      return { content: result }
    } else {
      return error({
        statusCode: 404,
        message: ' Page not found '
      })
    }
  },
  mounted() {
    EventBus.$on('toggleFundingDisplay', state => {
      this.hideExpired = state
      console.log(state)
    })
  },
  methods: {
    // isExpired(date) {
    //   if (this.now > date) {
    //     return '<h4 style="color: #D84315;">Expired</h4>'
    //   } else {
    //     return `<h4><span>Deadline:&nbsp;&nbsp;${format(
    //       date,
    //       'MMMM DD, YYYY'
    //     )}</span></h4>`
    //   }
    // }
  }
}
</script>

<style>
.isCurrent.v-input--selection-controls.v-input .v-label {
  /* color: #2e7d32; */
  font-weight: bold !important;
  font-size: 18px !important;
}

.isExpired.v-input--selection-controls.v-input .v-label {
  /* color: #d84315; */
  font-weight: bold !important;
  font-size: 18px !important;
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
