<template>
  <div class="top">
    
    <base-content :content="content">
      <template slot="breadcrumb">
        <breadcrumb :path="content.path"/>
      </template>
      <template v-if="!isExpired" slot="table-of-contents">
        <div class="table-of-contents">
          <table-of-contents :items="tocItems"/>
        </div>
      </template>
      <template slot="pageTitle" slot-scope="{title}">
        
        <v-layout row>
          <v-container>
            <v-flex xs10>
              <div style="color: #555; font-weight: 900; text-transform: uppercase;border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 20px;">Notice of Funding Opportunity</div>
              <h1 class="pageTitle" style="margin-top: 10px">{{title}}</h1>
            </v-flex>
          </v-container>
        </v-layout>
      </template>
      <template v-if="isExpired" slot="expired" >
        
          
            
        <div style="background: #EF5350; color: #fff; font-weight: bold; font-size: 20px" class="mt-0 px-2 py-5 text-xs-center">THIS FUNDING OPPORTUNITY HAS EXPIRED</div>
           
          
       
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
import format from 'date-fns/format'
export default {
  transition: 'tweakOpacity',
  components: {},
  data() {
    return {
      tocItems: [],
      now: format(new Date())
    }
  },
  computed: {
    ...mapGetters(['funding']),
    isExpired() {
      return format(this.content.expires) < this.now
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
  top: 130px;
  right: 10px;
}
</style>
