/**
 * 全局祖册组件 elementUI 自定义组件
 */
import Vue from 'vue'
import AppForm from './components/app-form'
import AppTable from './components/app-table'
import AppFormItem from './components/app-form-item'
import { ImageUpload, AudioUpload } from './components/app-upload';

const components = [
    AppForm,
    AppTable,
    AppFormItem
]
Vue.component('image-upload', ImageUpload);
Vue.component('audio-upload', AudioUpload);
export default {
    install(Vue, opts = {}) {
        components.forEach(component => {
          Vue.component(component.name, component);
        });
      }
};