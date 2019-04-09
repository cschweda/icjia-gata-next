<template>
  <div >
   
    <slot name="nav"/>
    <!-- <slot name="browserCheck"/> -->
    <slot name="expired"/>
    <!-- <slot name="breadcrumb"/> -->
    <slot name="table-of-contents"/>
    <slot 
      :title="content.title" 
      name="siteTitle"/>
    <div style="margin-top: 15px">
      <slot 
        :title="content.title" 
        name="pageTitle"/>
    </div>
    <div class="markdown-body">
      <slot name="markdown"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseContent',
  props: {
    content: {
      type: Object,
      default: null
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style scoped>
</style>
