<template>
  <base-content :content="content">
    
    <template slot="breadcrumb">
      <breadcrumb :path="content.path" :hide="false"/>
    </template>
    <template slot="pageTitle" slot-scope="{title}">
      <v-layout row>
        <v-container>
          <v-flex xs12>
            <div
              style="color: #555; font-weight: 900; text-transform: uppercase;border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 20px;"
            >News & Announcements</div>
            <h1 class="pageTitle rule">{{title}}</h1>
          </v-flex>
        </v-container>
      </v-layout>
    </template>
    <template slot="markdown" slot-scope="{body}">
      <v-layout row>
        <v-container style="margin-top: -30px;">
          <v-flex xs12>
            <div v-html="body"/>
          </v-flex>
        </v-container>
      </v-layout>
    </template>
  </base-content>
</template>
<script>
import jsonata from 'jsonata'
import { mapGetters } from 'vuex'

import BaseContent from '@/components/BaseContent'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  transition: 'tweakOpacity',
  components: { Breadcrumb, BaseContent },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['news'])
  },
  asyncData({ store, params, route, error }) {
    const slug = params.slug
    const query = jsonata(`$[slug="${slug}"]`)
    const result = query.evaluate(store.state.news)
    if (result != undefined) {
      return { content: result }
    } else {
      return error({
        statusCode: 404,
        message: ' Page not found '
      })
    }
  },
  computed: {}
}
</script>

<style scoped>
</style>
