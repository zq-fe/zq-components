/**
 * 全局祖册组件 elementUI 自定义组件
 */
import AppForm from './components/app-form'
import AppTable from './components/app-table'
import AppFormItem from './components/app-form-item'
const components = [
    AppForm,
    AppTable,
    AppFormItem
]

export default {
    install(Vue, opts = {}) {
        components.forEach(component => {
          Vue.component(component.name, component);
        });
      }
};