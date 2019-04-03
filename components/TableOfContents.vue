<template>
  <div>
    <h3 v-scroll-to="`#app`" class="toc-title">{{title}}</h3>
    <div class="wrapper">
      <div v-for="(item, index) in items" :key="index" class="toc">
        <div v-scroll-to="`#${item.id}`" class="toc-item">{{item.text}}</div>
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
  border-left: 2px solid #ccc;
  padding-left: 20px;
}
.toc {
  font-size: 13px;
  padding-bottom: 5px;
}

.toc-title {
  color: #303f9f;
  cursor: pointer;
}

.toc-item {
  cursor: pointer;
}
</style>
