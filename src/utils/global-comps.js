/**
 * 全局祖册组件 elementUI 自定义组件
 */
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import request from './request'
import AppTable from '../components/app-table'
import AppForm from '../components/app-form'
import AppAudio from '../components/app-audio'
import AppFormItem from '../components/app-form-item'
Vue.prototype.request = request
const components = [
  AppForm,
  AppTable,
  AppFormItem,
  AppAudio
]
components.forEach(component => {
  Vue.component(component.name, component);
});
Vue.use(Element, {
  size: 'medium' // set element-ui default size
})
