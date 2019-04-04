<template>
  <div style="margin-top: -5px">
    <base-content :content="content">
      <template slot="siteTitle" slot-scope="{title}">
        <v-layout row style="background: #1A237E;" >
          <v-container class="py-4">
            <v-flex xs12>
              <h1 class="text-xs-center" style="color: #fff">{{title}}</h1>
            </v-flex>
          </v-container>
        </v-layout>
      </template>
      <template slot="markdown" slot-scope="{body}">
        <v-layout row >
          <v-container class="mt-3">
            <v-flex xs12>
              <div v-html="body"/>
            </v-flex>
          </v-container>
        </v-layout>
      </template>
    </base-content>
    <div class="border-top" style="background: #F5F5F5">
      <v-layout>
        <v-container>
          <v-flex xs12>
            <h2 class="pageTitle rule">Funding Opportunities</h2>
            <grant-toggle/>
          </v-flex>
        </v-container>
      </v-layout>
      <base-list :items="grantsToDisplay" style="margin-top: -30px;">
        <template slot-scope="item">
          <v-layout row>
            <v-container>
              <v-flex xs12>
                <base-card :item="item" :show-expired="true"/>
              </v-flex>
            </v-container>
          </v-layout>
        </template>
      </base-list>
    </div>
  </div>
</template>

<script>
import jsonata from 'jsonata'
import format from 'date-fns/format'
import { mapGetters } from 'vuex'
import { EventBus } from '@/event-bus'

export default {
  transition: 'tweakOpacity',

  data() {
    return {
      showCurrent: true,
      content: '',
      now: format(new Date()),
      hideExpired: true
    }
  },

  asyncData({ store, params, route, error }) {
    const slug = params.slug
    const query = jsonata(`$[slug="home"]`)
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

  computed: {
    ...mapGetters(['funding', 'pages', 'news']),

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
    EventBus.$on('toggleFundingDisplay', state => {
      this.hideExpired = state
      console.log(state)
    })
  },
  methods: {}
}
</script>


<style>
</style>
