<template>
  <div>
    <base-content :content="content">
      
      <template slot="breadcrumb">
        <breadcrumb 
          :path="content.path" 
          :hide="content.hideBreadcrumb"/>
      </template>
      <template 
        slot="pageTitle" 
        slot-scope="{title}">
        <v-layout row>
          <v-container>
            <v-flex xs12>
              <h1 class="pageTitle">{{ title }}</h1>
            </v-flex>
          </v-container>
        </v-layout>
      </template>
    </base-content>
    <v-layout row>
      <v-container>
        <v-flex xs12>
          <no-ssr>
            <search/>
          </no-ssr>
        </v-flex>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
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
  created() {
    const content = this.$store.state.pages.filter(p => {
      return p.slug === 'search'
    })
    if (content.length) {
      this.content = content[0]
    } else {
      console.log('Error: Page Not Found')
      this.$router.push('/404')
    }
  },

  mounted() {},

  methods: {}
}
</script>
