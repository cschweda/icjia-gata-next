<template>
  <div>
    <v-switch
      v-model="showCurrent"
      :label="pageHeading"
      :class="{isExpired: !showCurrent, isCurrent: showCurrent}"
    />
  </div>
</template>

<script>
import { EventBus } from '@/event-bus'
export default {
  name: 'Toggle',
  data() {
    return {
      showCurrent: true
    }
  },
  computed: {
    pageHeading() {
      if (this.showCurrent) {
        return 'Current'
      } else {
        return 'Expired'
      }
    }
  },
  watch: {
    showCurrent(newValue, oldValue) {
      EventBus.$emit('toggleFundingDisplay', this.showCurrent)
    }
  },
  mounted() {
    EventBus.$emit('toggleFundingDisplay', this.showCurrent)
  },
  methods: {}
}
</script>

<style scoped>
</style>
