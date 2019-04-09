<template>
  <div>
    <base-content :content="content">
      <template 
        slot="siteTitle" 
        slot-scope="{title}">
        <v-layout 
          row 
          style="background: #1A237E;">
          <v-container class="py-4">
            <v-flex xs12>
              <h1 
                class="text-xs-center" 
                style="color: #fff">{{ title }}</h1>
            </v-flex>
          </v-container>
        </v-layout>
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
    <div 
      class="border-top" 
      style="background: #F5F5F5">
      <v-layout>
        <v-container>
          <v-flex xs12>
            <h2 class="pageTitle rule">Funding Opportunities</h2>
            <grant-toggle/>
          </v-flex>
        </v-container>
      </v-layout> 
    
    </div>
    <base-list 
      :items="fundsToDisplay" 
      style="margin-top: -30px; background: #f5f5f5"
    >
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
                        class="expires">{{ expiredText }}:&nbsp;{{ item.expires | format }}</span>
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


<script >
import { mapGetters } from 'vuex'
import { EventBus } from '@/event-bus'
import BaseList from '@/components/BaseList'
import BaseCard from '@/components/BaseCard'
import BaseContent from '@/components/BaseContent'
import GrantToggle from '@/components/GrantToggle'

import config from '@/config'
export default {
  components: {
    BaseList,
    BaseCard,
    GrantToggle,
    BaseContent
  },
  data() {
    return {
      hideExpired: true
    }
  },
  computed: {
    ...mapGetters(['funding', 'pages', 'news', 'current', 'expired']),
    expiredText() {
      return this.hideExpired ? 'Expires' : 'Expired'
    },
    fundsToDisplay() {
      return this.hideExpired ? this.current : this.expired
    }
  },
  created() {
    const content = this.$store.state.pages.filter(p => {
      return p.slug === 'home'
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
      //console.log(this.hideExpired)
    })
  }
}
</script>

<style scoped>
</style>
