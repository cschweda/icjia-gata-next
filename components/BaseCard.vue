<template>
  <div>
    <v-card class="mb-2 elevation-1">
      <div v-if="showExpired">
        <div v-if="!isExpired(item[expirationField])" style="background: #EF5350; color: #fff; font-weight: bold; font-size: 20px" class="px-2 py-2 text-xs-right">EXPIRED</div>
      </div>
      
      <h2 class="px-3 pt-5">
        <nuxt-link :to="`${item.path}`" class="link">{{ item.title }}</nuxt-link>
      </h2>
      <v-card-text class="px-3">{{ item.excerpt }}</v-card-text>
      <div class="text-xs-right pb-5">
        <h4 class="mt-2 pr-5" style="font-size: 14px;"><span class="posted">Posted:</span>&nbsp;<span class="posted-date">{{ format(item.posted,'MMMM DD, YYYY') }}</span></h4>
      </div>
    </v-card>
    
  </div>
</template>

<script>
import format from 'date-fns/format'
export default {
  props: {
    item: {
      type: Object,
      default: null
    },
    showExpired: {
      type: Boolean,
      default: true
    },
    expirationField: {
      type: String,
      default: 'expires'
    }
  },
  data() {
    return {
      now: format(new Date()),
      format: format
    }
  },
  methods: {
    isExpired(date) {
      return format(date) > this.now
    }
  }
}
</script>

<style scoped>
.posted {
  color: #444 !important;
}

.posted-date {
  color: #444 !important;
}
</style>
