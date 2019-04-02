<template>
  <base-content :content="content">
    <template slot="breadcrumb">
      <breadcrumb :path="content.path" :hide="false"/>
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
    <template slot="markdown" slot-scope="{body}">
      <v-layout row >
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
import Breadcrumb from '@/components/Breadcrumb'
import BaseContent from '@/components/BaseContent'
import jsonata from 'jsonata'
import { mapGetters } from 'vuex'

export default {
  transition: 'tweakOpacity',
  components: { BaseContent, Breadcrumb },
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
