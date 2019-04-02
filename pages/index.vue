<template>
  <div>
    <base-content :content="content">
      <template slot="breadcrumb">
        <breadcrumb :path="content.path" :hide="content.hideBreadcrumb"/>
      </template>
      <template slot="siteTitle" slot-scope="{title}">
        <v-layout row>
          <v-container>
            <v-flex xs12>
              <h1 class="pageTitle center">{{title}}</h1>
            </v-flex>
          </v-container>
        </v-layout>
      </template>
      <template slot="markdown" slot-scope="{body}">
        <v-layout row>
          <v-container>
            <v-flex xs12>
              <div v-html="body"/>
            </v-flex>
          </v-container>
        </v-layout>
      </template>
      <template slot="dynamicContent">
        <div style="background: #eee; border-top: 1px solid #ccc;">
          <v-layout>
            <v-container>
              <v-flex xs12>
                <content-list :items="grantsToDisplay" :show-current="showCurrent" title="Funding Opportunities" />
              </v-flex>
            </v-container>
          </v-layout>
        </div>
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
import ContentList from '@/components/ContentList'

export default {
  transition: 'tweakOpacity',
  components: { BaseContent, Breadcrumb, ContentList },
  data() {
    return {
      showCurrent: true,
      content: '',
      test: { body: 'content here' }
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
      let now = format(new Date())
      let currentGrants = this.funding.filter(grant => {
        if (grant.expires > now) {
          return grant
        }
      })
      return currentGrants
    }
  },
  mounted() {},
  methods: {
    renderedContent(content) {
      return 'test' + content
    }
  }
}
</script>


<style lang="scss">
</style>
