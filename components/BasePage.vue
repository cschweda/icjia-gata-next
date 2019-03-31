<template>
  <v-layout>
    <v-container>
      <v-flex xs12>
        <h1 class="pageTitle">{{ content.title }}</h1>
        <p style="padding-left: 15px;" v-html="content.html"/>
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
