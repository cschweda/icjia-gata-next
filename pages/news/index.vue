<template>
  <div>
    <base-content :content="content">
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

    <base-list :items="newsToDisplay" class="pull-25">
      <template slot-scope="item">
        <v-layout row>
          <v-container>
            <v-flex xs12>
              <base-card :item="item">
                <template slot="posted">
                  <div class="text-xs-right pr-3 pt-3 pb-2">
                    <h4 class="pr-3 pb-4" style="font-size: 14px;">
                      <span class="posted">Posted:&nbsp;{{ item.posted}}</span>
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
</template>

<script>
import jsonata from 'jsonata'

import { mapGetters } from 'vuex'

import { EventBus } from '@/event-bus.js'

export default {
  transition: 'tweakOpacity',
  components: {},
  data() {
    return {
      hideExpired: true
    }
  },

  computed: {
    ...mapGetters(['news', 'pages']),
    newsToDisplay() {
      return this.news
    }
  },
  asyncData({ store, params, route, error }) {
    const slug = params.slug
    const query = jsonata(`$[slug="news"]`)
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
  mounted() {},
  methods: {}
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
