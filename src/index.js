/**
 * 全局祖册组件 elementUI 自定义组件
 */
// import './utils/global-comps';

import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import request from './utils/request'
import AppTable from './components/app-table'
import AppForm from './components/app-form'
import AppButton from './components/app-button'
import AppAudio from './components/app-audio'
import AppFormItem from './components/app-form-item'
import { ImageUpload, AudioUpload } from './components/app-upload'
Vue.prototype.request = request
const components = [
  AppForm,
  AppTable,
  AppFormItem,
  AppAudio,
  AppButton,
  ImageUpload,
  AudioUpload
]
const ZqComponents = {
  install: function(Vue){
    components.forEach(component => {
      Vue.component(component.name, component);
    });
  }
}
export default ZqComponents
