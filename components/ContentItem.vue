<template>

  <div class="mb-4 px-5 py-4 elevation-1 grey lighten-4">
    <h2>
      <nuxt-link :to="`${item.path}`">{{ item.title }}</nuxt-link>
    </h2>
    <div>
      {{ item.excerpt }}
      <h4 class="mt-2">Posted: {{ item.posted }}</h4>
      <h4>Expires: {{ item.expires }}</h4>
    </div>
   
  </div>
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
