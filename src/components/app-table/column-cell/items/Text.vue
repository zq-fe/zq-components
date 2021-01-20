<template>
  <div>
    <div v-if="textLength < 20" class="cell-text">
      {{ text }}
    </div>
    <el-popover
      v-else
      placement="top-start"
      width="200"
      trigger="hover"
      :content="text">
      <span slot="reference">{{ text.substring(0,9) }}...</span>
    </el-popover>
  </div>
</template>

<script>
  import Mixins from '../mixins';
  import Vue from 'vue';
  export default {
    name: 'ColumnCellText',
    mixins: [Mixins],
    computed: {
      textLength () {
        return this.text.length;
      },
      text () {
        const {record, column} = this;
        const val = record[column.name];
        const filter = this.column.filter;
        if (typeof filter === 'string') {
          const f = Vue.filter(filter);
          return f ? f(val, record, column) : val;
        }
        const result =  val === undefined ?  '-' : (filter ? filter(val, this.record) : val);
        return result + '';
      }
    }
  }
</script>
