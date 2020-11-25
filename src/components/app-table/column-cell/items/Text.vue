<template>
  <div>
    <div v-if="textLength < 12" class="cell-text">
      {{ text | filter(record, column) }}
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
  export default {
    name: 'ColumnCellText',
    mixins: [Mixins],
    computed: {
      textLength () {
        return this.text.length;
      },
      text () {
        const val = this.record[this.column.name];
        const filter = this.column.filter;
        return val === undefined ?  '-' : (filter ? filter(val, this.record) : val);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
