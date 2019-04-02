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
      <template slot="dynamicContent">
        <v-layout row>
          <v-container>
            <v-flex xs12>
              <search/>
            </v-flex>
          </v-container>
        </v-layout>
      </template>
    </base-content>
    
    
    
  </div>
</template>

<script>
import jsonata from 'jsonata'
import format from 'date-fns/format'
import { mapGetters } from 'vuex'
import BaseContent from '@/components/BaseContent'
import Breadcrumb from '@/components/Breadcrumb'
import Search from '@/components/Search'
import Fuse from 'fuse.js'
export default {
  transition: 'tweakOpacity',
  components: { Breadcrumb, BaseContent, Search },
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
