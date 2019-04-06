<template>
  <div>
    <base-content :content="content">
      <template slot="siteTitle" slot-scope="{title}">
        <v-layout row style="background: #1A237E;">
          <v-container class="py-4">
            <v-flex xs12>
              <h1 class="text-xs-center" style="color: #fff">{{title}}</h1>
            </v-flex>
          </v-container>
        </v-layout>
      </template>
      <template slot="markdown" slot-scope="{body}">
        <v-layout row>
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
      <base-list :items="fundsToDisplay" style="margin-top: -30px;">
        <template slot-scope="item">
          <v-layout row>
            <v-container>
              <v-flex xs12>
                <base-card :item="item" :show-expired="true">
                  <template slot="posted">
                    <div class="text-xs-right pr-3 pt-3 pb-2">
                      <h4 class="pr-3 pb-4" style="font-size: 14px;">
                        <span class="posted">Posted:&nbsp;{{ formatDate(item.posted) }}</span>
                      </h4>
                    </div>
                  </template>
                  <template slot="expires">
                    <div class="text-xs-left pb-2">
                      <h4 class="pl-3 pt-4" style="font-size: 14px;">
                        <span class="expires">{{expiredText}}:&nbsp;{{formatDate(item.expires)}}</span>
                      </h4>
                    </div>
                  </template>
                </base-card>
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
import { mapGetters } from 'vuex'
import { EventBus } from '@/event-bus'

import config from '@/config'

export default {
  transition: 'tweakOpacity',

  data() {
    return {
      showCurrent: true,
      content: '',
      config,
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
    ...mapGetters(['funding', 'pages', 'news', 'current', 'expired']),
    expiredText() {
      return this.hideExpired ? 'Expires' : 'Expired'
    },
    fundsToDisplay() {
      return this.hideExpired ? this.current : this.expired
    }
  },
  mounted() {
    EventBus.$on('toggleFundingDisplay', state => {
      this.hideExpired = state
    })
  },
  methods: {
    formatDate(date) {
      return date
    }
  }
}
</script>


<style>
</style>
