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
              <h1 class="pageTitle rule">{{title}}</h1>
            </v-flex>
          </v-container>
        </v-layout>
      </template>
    </base-content>

  
    <base-list :items="newsToDisplay" class="pull-25">
      <template slot-scope="item">
        <v-layout row>
          <v-container>
            <v-flex xs12>
              <base-card :item="item"/>
            </v-flex>
          </v-container>
        </v-layout>
      </template>
    </base-list>
  </div>
</template>

<script>
import jsonata from 'jsonata'
import format from 'date-fns/format'
import { mapGetters } from 'vuex'
import GrantToggle from '@/components/GrantToggle'
import { EventBus } from '@/event-bus.js'
import BaseContent from '@/components/BaseContent'
import Breadcrumb from '@/components/Breadcrumb'
import BaseList from '@/components/BaseList'
import BaseCard from '@/components/BaseCard'
export default {
  transition: 'tweakOpacity',
  components: {
    GrantToggle,
    BaseContent,
    Breadcrumb,
    GrantToggle,
    BaseList,
    BaseCard
  },
  data() {
    return {
      now: format(new Date()),
      hideExpired: true
    }
  },

  computed: {
    ...mapGetters(['news', 'pages']),
    newsToDisplay() {
      // if (!this.hideExpired) {
      //   return this.news.filter(news => {
      //     if (news.expires <= this.now) {
      //       return news
      //     }
      //   })
      // } else {
      //   return this.news.filter(news => {
      //     if (news.expires > this.now) {
      //       return news
      //     }
      //   })
      // }
      return this.news
    }
  },
  asyncData({ store, params, route, error }) {
    const slug = params.slug
    const query = jsonata(`$[slug="news"]`)
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
  mounted() {
    // EventBus.$on('toggleFundingDisplay', state => {
    //   this.hideExpired = state
    //   console.log(state)
    // })
  },
  methods: {
    // isExpired(date) {
    //   if (this.now > date) {
    //     return '<h4 style="color: #D84315;">Expired</h4>'
    //   } else {
    //     return `<h4><span>Deadline:&nbsp;&nbsp;${format(
    //       date,
    //       'MMMM DD, YYYY'
    //     )}</span></h4>`
    //   }
    // }
  }
}
</script>

<style>
.isCurrent.v-input--selection-controls.v-input .v-label {
  /* color: #2e7d32; */
  font-weight: bold;
  font-size: 18px;
}

.isExpired.v-input--selection-controls.v-input .v-label {
  /* color: #d84315; */
  font-weight: bold;
  font-size: 18px;
}

h2 a {
  text-decoration: none;
}

h2 a:hover {
  color: #aaa;
}

.date {
  font-size: 18px;
  margin-bottom: 15px;
  color: #666;
}
</style>
