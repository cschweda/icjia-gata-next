<template>
  <div class="top">
    
    <base-content :content="content">
      <template slot="breadcrumb">
        <breadcrumb :path="content.path"/>
      </template>
      <template slot="table-of-contents">
        <div class="table-of-contents">
          <table-of-contents :items="tocItems"/>
        </div>
      </template>
      <template slot="pageTitle" slot-scope="{title}">
        <v-layout row>
          <v-container>
            <v-flex xs10>
              <h1 class="pageTitle rule">{{title}}</h1>
            </v-flex>
          </v-container>
        </v-layout>
      </template>
      <template slot="markdown" slot-scope="{body}">
        <v-layout row>
          <v-container style="margin-top: -30px;">
         
            <v-flex xs10>
              <div v-html="body"/>
            </v-flex>
          </v-container>
        </v-layout>
      </template>
    </base-content>
  </div>
</template>

<script>
import jsonata from 'jsonata'
import { mapGetters } from 'vuex'
import BaseContent from '@/components/BaseContent'
import Breadcrumb from '@/components/Breadcrumb'
import TableOfContents from '@/components/TableOfContents'
export default {
  transition: 'tweakOpacity',
  components: {
    BaseContent,
    Breadcrumb,
    TableOfContents
  },
  data() {
    return {
      tocItems: []
    }
  },
  computed: {
    ...mapGetters(['funding'])
  },
  mounted() {
    const toc = Array.prototype.slice.call(document.querySelectorAll('h2'))
    const tocItems = toc.map(item => {
      let obj = {}
      obj.id = item.id
      obj.text = item.innerHTML
      return obj
    })

    this.tocItems = tocItems
  },
  asyncData({ store, params, route, error }) {
    const slug = params.slug
    const query = jsonata(`$[slug="${slug}"]`)
    const result = query.evaluate(store.state.funding)
    if (result != undefined) {
      return { content: result }
    } else {
      return error({
        statusCode: 404,
        message: ' Page not found '
      })
    }
  }
}
</script>

<style scoped>
.nofo {
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  color: #555;
}

.table-of-contents {
  position: fixed;
  top: 125px;
  right: 10px;
}
</style>
