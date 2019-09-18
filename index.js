/**
 * 全局祖册组件 elementUI 自定义组件
 */
import AppForm from './src/components/app-form'
import AppTable from './src/components/app-table'
import AppFormItem from './src/components/app-form-item'
const components = [
    AppForm,
    AppTable,
    AppFormItem
]
const install = function(Vue, opts = {}) {
    components.forEach(component => {
      Vue.component(component.name, component);
    });
  }
  
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

export default {
    AppForm,
    AppTable,
    AppFormItem
};