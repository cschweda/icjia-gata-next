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
              <h1 class="pageTitle rule">{{ title }}</h1>
            </v-flex>
          </v-container>
        </v-layout>
      </template>
    </base-content>
    <v-layout class="pull-50">
      <v-container>
        <v-flex xs12>
          <grant-toggle/>
        </v-flex>
      </v-container>
    </v-layout>
    <base-list 
      :items="fundsToDisplay" 
      style="margin-top: -30px;">
      <template slot-scope="item">
        <v-layout row>
          <v-container>
            <v-flex xs12>
              <base-card 
                :item="item" 
                :show-expired="true">
                <template slot="posted">
                  <div class="text-xs-right pr-3 pt-3 pb-2">
                    <h4 
                      class="pr-3 pb-4" 
                      style="font-size: 14px;">
                      <span class="posted">Posted:&nbsp;{{ item.posted | format }}</span>
                    </h4>
                  </div>
                </template>
                <template slot="expires">
                  <div class="text-xs-left pb-2">
                    <h4 
                      class="pl-3 pt-4" 
                      style="font-size: 14px;">
                      <span 
                        :class="{expired: !hideExpired}" 
                        class="expires" >{{ expiredText }}:&nbsp;{{ item.expires | format }}</span>
                    </h4>
                  </div>
                </template>
              </base-card>
            </v-flex>
          </v-container>
        </v-layout>
      </template>
    </base-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventBus } from '@/event-bus.js'
import config from '@/config'

import BaseContent from '@/components/BaseContent'
import Breadcrumb from '@/components/Breadcrumb'
import BaseList from '@/components/BaseList'
import BaseCard from '@/components/BaseCard'
import GrantToggle from '@/components/GrantToggle'

export default {
  transition: 'tweakOpacity',
  components: { BaseContent, Breadcrumb, BaseList, BaseCard, GrantToggle },
  data() {
    return {
      hideExpired: true
    }
  },
  head() {
    return {
      title: 'ICJIA GATA | Funding Opportunities'
    }
  },
  computed: {
    ...mapGetters(['pages', 'funding', 'current', 'expired']),
    expiredText() {
      return this.hideExpired ? 'Expires' : 'Expired'
    },
    fundsToDisplay() {
      return this.hideExpired ? this.current : this.expired
    }
  },
  created() {
    const content = this.$store.state.pages.filter(p => {
      return p.slug === 'funding'
    })
    if (content.length) {
      this.content = content[0]
    } else {
      console.log('Error: Page Not Found')
      this.$router.push('/404')
    }
  },
  mounted() {
    EventBus.$on('toggleFundingDisplay', state => {
      this.hideExpired = state
      console.log(state)
    })
  },
  methods: {
    formatDate(date) {
      return date
    }
  }
}
</script>

<style>
.isCurrent.v-input--selection-controls.v-input .v-label {
  /* color: #2e7d32; */
  font-weight: bold !important;
  font-size: 18px !important;
}

.isExpired.v-input--selection-controls.v-input .v-label {
  /* color: #d84315; */
  font-weight: bold !important;
  font-size: 18px !important;
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
