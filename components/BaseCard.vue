<template>
  <v-card class="mb-2 px-3 py-3 elevation-1">
    <div class="text-xs-right date"/>
    <h2>
      <nuxt-link :to="`${item.path}`">{{ item.title }}</nuxt-link>
    </h2>
    <h4 class="mt-2" style="color: #666">Posted: {{ item.posted }}</h4>
    <v-card-text>{{ item.excerpt }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
</style>
