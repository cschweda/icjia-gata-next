<template>
  <div>
    
    <breadcrumb :path="content.path"/>
    
    <v-layout>
      <v-container>
        <v-flex xs12>
          <h1 class="pageTitle rule">{{ content.title }}</h1>
          <div class="markdown-body" v-html="markdown"/>
        
        </v-flex>
      </v-container>
    </v-layout>
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
let md = require('markdown-it')({
  html: true,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  linkify: true,
  typographer: false,
  quotes: '“”‘’'
})
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-named-headers'))
  .use(require('markdown-it-attrs'))
import Breadcrumb from '@/components/Breadcrumb'
export default {
  components: {
    Breadcrumb
  },
  props: {
    content: {
      type: Object,
      default: null
    }
  },
  computed: {
    markdown() {
      return linkify(
        md.render(this.content.body),
        this.content.section,
        this.content.slug
      )
    }
  }
}
</script>

<style scoped>
</style>
