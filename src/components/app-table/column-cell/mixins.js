import Vue from 'vue';
export default {
  props: {
    /**
     * 整条纪录
     */
    record: {
      type: Object,
      required: true,
      default() {
        return {};
      }
    },
    /**
     * 列配置项
     */
    column: {
      type: Object,
      required: true,
      default() {
        return {};
      }
    },
    /**
     * 字段对应url
     */
    urls: {
      type: Array,
      required: true,
      default() {
        return '';
      }
    }
  },
  filters: {
    filter(text, record, column, options) {
      const { filter: filterKey } = column;
      if (filterKey) {
        if (typeof (filterKey) === 'string') {
          const filter = Vue.filter(filterKey)
          return filter ? filter(text, record, column, options) : text;
        } else {
          return filterKey(text, record);
        }
      }
      return text;
    }
  }
}
