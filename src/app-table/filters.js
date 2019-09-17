/*
 * todo: 多个filters定义
 * todo: column用子组件进行渲染
 * todo: filter传key, provider(key)进行值的映射
 * todo: 使用render定义
 * todo: 内部状态管理
 */
import Vue from 'vue'
import { parseTime } from '../..scripts/utils'

Vue.filter('time', function(value, record, column) {
  return parseTime(value, undefined, column)
})

Vue.filter('provider', function(value, record, column, options = {}) {
  const { provider: providerKey } = column
  const map = options[providerKey] || {}
  return map[value] || value
})

Vue.filter('extract', function(value, record, column, options = {}) {
  return (value || []).map(item => item[column.extractKey]).join('、')
});

Vue.filter('sex', function(value, record, column, options = {}) {
  return value === 1 ? '男' : '女';
});
