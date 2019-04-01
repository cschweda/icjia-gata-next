<template>
  
  <v-breadcrumbs :items="items" class="crumbs" divider=">"/>
  
 
 
</template>

<script>
export default {
  components: {},
  props: {
    path: {
      type: String,
      default: ''
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
          if (index === 2) {
            obj.disabled = true
          } else {
            obj.disabled = false
          }
          if (index === 0) {
            obj.href = '/'
          }

          if (index === 1) {
            obj.href = '/' + items[1]
          }

          crumbs.push(obj)
        }
      })
      console.log(crumbs)
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
