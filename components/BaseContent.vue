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
function linkify(html, section, slug) {
  const re = new RegExp('^(http|https|mailto):/?/?', 'i')

  const result = html.replace(/href="([^"]+)/g, function($1) {
    const arr = $1.split('"')
    let match = re.test(arr[1])
    if (!match) {
      const href = `${section}/${slug}/${arr[1]}`
      return `href="/${href}`
    }
    return $1
  })
  return result
}

export default {
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
