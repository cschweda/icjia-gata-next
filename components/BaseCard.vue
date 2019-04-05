<template>
  <div>
    <v-card class="mb-2 elevation-1">
      <div v-if="showExpired">
        <div v-if="isExpired(item[expirationField])" style="background: #EF5350; color: #fff; font-weight: bold; font-size: 20px" class="px-2 py-2 text-xs-right">EXPIRED</div>
      </div>
      <slot name="expires"/>
     
      <h2 class="px-3 pt-3">
        <nuxt-link :to="`${item.path}`" class="link">{{ item.title }}</nuxt-link>
      </h2>
      <v-card-text class="px-3">{{ item.excerpt }}</v-card-text>
      
      <slot name="posted"/>
    </v-card>
    
  </div>
</template>

<script>
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
    return {}
  },
  mounted() {},
  methods: {
    isExpired(date) {
      return true
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
