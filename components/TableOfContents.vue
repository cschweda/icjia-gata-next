<template>
  <div class="hidden-sm-and-down wrapper py-3">
    <h3 
      v-scroll-to="'#top'" 
      class="toc-title">{{ title }}</h3>
    <div class="">
      <div 
        v-for="(item, index) in items" 
        :key="index" 
        class="toc">
        <div 
          v-scroll-to="`#${item.id}`" 
          class="toc-item px-1">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: 'Table of Contents'
    }
  }
}
</script>

<style scoped>
.wrapper {
  border-left: 3px solid #bbb;
  padding-left: 20px;
  padding-right: 10px;
  background: #f5f5f5;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
}
.toc {
  font-size: 13px;
  padding-bottom: 5px;
}

.toc-title {
  color: #303f9f;
}

.toc-item {
  cursor: pointer;
}

.toc-item:hover {
  color: #fff;
  background: #303f9f;
}

.active {
  color: #303f9f;
  font-weight: 700;
}
</style>
