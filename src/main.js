import Vue from 'vue'
import App from './App.vue'
import './utils/global-comps';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
