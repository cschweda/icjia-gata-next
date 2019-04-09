<template>
  <base-content :content="content">
    
    <template slot="breadcrumb">
      <breadcrumb 
        :path="content.path" 
        :hide="false"/>
    </template>
    <template 
      slot="pageTitle" 
      slot-scope="{title}">
      <v-layout row>
        <v-container>
          <v-flex xs12>
            
            <h1 class="pageTitle rule">{{ title }}</h1>
          </v-flex>
        </v-container>
      </v-layout>
    </template>
    <template slot="markdown">
      <v-layout row>
        <v-container class="mt-0">
          <v-flex xs12>
            <div v-html="content.html"/>
          </v-flex>
        </v-container>
      </v-layout>
    </template>
  </base-content>
</template>
<script>
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
    ...mapGetters(['pages'])
  },
  computed: {},
  created() {
    const { slug } = this.$route.params
    const content = this.$store.state.pages.filter(p => {
      return p.slug === `${slug}`
    })
    if (content.length) {
      this.content = content[0]
    } else {
      console.log('Error: Page Not Found')
      this.$router.push('/404')
    }
  }
}
</script>

<style scoped>
</style>
