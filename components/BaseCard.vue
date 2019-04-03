<template>
  <div>
    <v-card class="mb-2 elevation-1">
      <div class="text-xs-right date"/>
    
      <div v-if="showExpired">
        <div v-if="!isExpired(item[expirationField])" style="background: red; color: #fff; font-weight: bold; font-size: 20px" class="px-2 py-2 text-xs-right">EXPIRED</div>
      </div>
      
      <h2 class="px-3 pt-3">
        <nuxt-link :to="`${item.path}`" class="link">{{ item.title }}</nuxt-link>
      </h2>
      <h4 class="mt-2 px-3" style="color: #666">Posted: {{ item.posted }}</h4>
      <v-card-text class="px-3 py-3">{{ item.excerpt }}</v-card-text>
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
      now: format(new Date())
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
</style>
