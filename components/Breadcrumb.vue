<template>
  <div style="height: 30px;">
    <!-- <v-breadcrumbs v-if="!hide" :items="items" class="crumbs" divider="|"/> -->
    <v-breadcrumbs v-if="!hide" :items="items" class="crumbs" divider="|">
      <template v-slot:item="props">
        <nuxt-link :to="props.item.href" :class="[props.item.disabled && 'disabled']" class="link">{{ props.item.text.toUpperCase() }}</nuxt-link>
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
      crumbs[crumbs.length - 1].href = items[items.length - 1]
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
  font-size: 12px;
}
</style>
