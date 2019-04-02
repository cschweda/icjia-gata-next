<template>
  <div>
    <h2 class="mb-3" style="color: #333;">{{listTitle}}</h2>
    <div v-for="item in items" :key="item.slug">
      <content-item :item="item"/>
    </div>
   
  </div>
</template>

<script>
import ContentItem from '@/components/ContentItem'
export default {
  components: {
    ContentItem
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    },
    showCurrent: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    listTitle() {
      return this.title
    }
  }
}
</script>

<style scoped>
</style>
