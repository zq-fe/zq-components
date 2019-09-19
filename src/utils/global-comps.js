/**
 * 全局祖册组件 elementUI 自定义组件
 */
import Vue from 'vue'
// import Cookies from 'js-cookie'
// import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import '@/styles/index.scss' // global css
// import '../icons' // icon
// import '../permission' // permission control
// import './mock' // simulation data
// import moment from 'moment'
// import ZqComponents from 'zq-components'
import request from './request'
import AppTable from '../components/app-table'
import AppForm from '../components/app-form'
import AppFormItem from '../components/app-form-item'
// Vue.prototype.$moment = moment()
Vue.prototype.request = request
const components = [
  AppForm,
  AppTable,
  AppFormItem
]
components.forEach(component => {
  Vue.component(component.name, component);
});
Vue.use(Element, {
  size: 'medium' // set element-ui default size
})
