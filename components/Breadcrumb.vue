<template>
  <div style="height: 30px;">
   
    <v-breadcrumbs 
      v-if="!hide" 
      :items="items" 
      class="crumbs" 
      divider="|">
      <template v-slot:item="props">
        <nuxt-link 
          :to="props.item.href" 
          :class="[props.item.disabled && 'disabled']" 
          class="link">{{ props.item.text.toUpperCase() }}</nuxt-link>
      </template>
    </v-breadcrumbs>
   
    
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
    section: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'undefined'
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

          if (index === 2) {
            obj.text = this.title
          }
          crumbs.push(obj)
        }
      })
      crumbs[crumbs.length - 1].disabled = true
      crumbs[crumbs.length - 1].href = items[items.length - 1]
      return crumbs
      // const crumbs = [{ text: 'home', disabled: false, href: '/' }]
      // let obj = {}
      // obj.text = this.section
      // obj.disabled = true
      // obj.href = `${this.section}`
      // crumbs.push(obj)
      // obj.text =

      // return crumbs
    }
  }
}
</script>

<style>
.crumbs {
  text-transform: uppercase;
  background: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}

.disabled {
  color: grey;
  pointer-events: none;
}

div .v-breadcrumbs {
  padding: 6px 12px;
  justify-content: flex-end !important;
  font-size: 12px;
}
</style>
