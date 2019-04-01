<template>
  <v-layout>
    <v-container>
      <v-flex xs12 class="px-5">
        <h1 class="pageTitle">{{ content.title }}</h1>
        <p class="px-3" v-html="content.html"/>
      </v-flex>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
</style>
