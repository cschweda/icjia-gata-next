<template>
  <div>
    <div 
      v-for="(item, index) in items" 
      :key="index">
      <slot v-bind="item"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
</style>
