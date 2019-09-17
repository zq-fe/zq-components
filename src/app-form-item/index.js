import Item from './Item.vue'
export default {
  install(Vue, options) {
    Vue.component(Item.name, Item)
  }
}
