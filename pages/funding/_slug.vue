<template>
  <div class="top">
    <base-content :content="content">
      <template slot="breadcrumb">
        <breadcrumb :path="content.path"/>
      </template>
      <template 
        v-if="!isExpired" 
        slot="table-of-contents">
        <div class="table-of-contents">
          <table-of-contents :items="tocItems"/>
        </div>
      </template>
      <template 
        slot="pageTitle" 
        slot-scope="{title}">
        <v-layout row>
          <v-container>
            <v-flex xs9>
              <div
                style="color: #555; font-weight: 900; text-transform: uppercase;border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 20px;"
              >Notice of Funding Opportunity</div>
              <h1 
                class="pageTitle" 
                style="margin-top: 10px">{{ title }}</h1>
            </v-flex>
          </v-container>
        </v-layout>
      </template>
      <template 
        v-if="isExpired" 
        slot="expired">
        <div
          style="background: #EF5350; color: #fff; font-weight: bold; font-size: 20px"
          class="mt-0 px-2 py-5 text-xs-center"
        >THIS FUNDING OPPORTUNITY HAS EXPIRED</div>
      </template>
      <template slot="markdown">
        <v-layout row>
          <v-container class="mt-3">
            <v-flex xs12>
              <div v-html="content.html"/>
            </v-flex>
          </v-container>
        </v-layout>
      </template>
    </base-content>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import BaseContent from '@/components/BaseContent'
import Breadcrumb from '@/components/Breadcrumb'
import BaseList from '@/components/BaseList'
import BaseCard from '@/components/BaseCard'
import TableOfContents from '@/components/TableOfContents'

export default {
  transition: 'tweakOpacity',
  components: { BaseContent, BaseCard, Breadcrumb, TableOfContents, BaseList },
  data() {
    return {
      tocItems: []
    }
  },
  computed: {
    ...mapGetters(['funding']),
    isExpired() {
      return false
    }
  },
  mounted() {
    const toc = Array.prototype.slice.call(document.querySelectorAll('h2'))
    const tocItems = toc.map(item => {
      let obj = {}
      obj.id = item.id
      obj.text = item.innerHTML
      return obj
    })
    const intro = { id: 'top', text: 'Introduction' }
    tocItems.unshift(intro)
    this.tocItems = tocItems
  },

  created() {
    const { slug } = this.$route.params
    const content = this.$store.state.funding.filter(p => {
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
.nofo {
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  color: #555;
}

.table-of-contents {
  position: fixed;
  top: 130px;
  right: 10px;
}
</style>
