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
              <h1 class="pageTitle">{{title}}</h1>
            </v-flex>
          </v-container>
        </v-layout>
      </template>
    </base-content>
    <v-layout row>
      <v-container>
        <v-flex xs12>
          <search/>
        </v-flex>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import jsonata from 'jsonata'
import { mapGetters } from 'vuex'
import Fuse from 'fuse.js'

import BaseContent from '@/components/BaseContent'
import Search from '@/components/Search'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  transition: 'tweakOpacity',
  components: { BaseContent, Search, Breadcrumb },
  data() {
    return {
      content: ''
    }
  },
  computed: {
    ...mapGetters(['pages', 'funding', 'news'])
  },
  asyncData({ store, params, route, error }) {
    const slug = params.slug
    const query = jsonata(`$[slug="search"]`)
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
