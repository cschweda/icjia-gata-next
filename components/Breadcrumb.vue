<template>
  <div style="height: 20px;">
    <v-breadcrumbs v-if="!hide" :items="items" class="crumbs" divider="|"/>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    path: {
      type: String,
      default: ''
    },
    hide: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    items() {
      const items = this.path.split('/')
      const crumbs = [{ text: 'home', disabled: false, href: '/' }]
      items.forEach((i, index) => {
        if (i.length) {
          let obj = {}
          obj.text = i

          if (index === 0) {
            obj.href = '/'
          }

          if (index === 1) {
            obj.href = '/' + items[1]
          }

          crumbs.push(obj)
        }
      })
      crumbs[crumbs.length - 1].disabled = true
      return crumbs
    }
  }
}
</script>

<style>
.crumbs {
  /* background: #efefef; */
  text-transform: uppercase;
}

.disabled {
  color: grey;
  pointer-events: none;
}

div .v-breadcrumbs {
  padding: 6px 12px;
  justify-content: flex-end !important;
}

div .v-breadcrumbs__item {
  font-size: 12px !important;
}
</style>
