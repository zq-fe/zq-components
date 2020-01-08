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
      const name = this.record[this.column.name]
      return typeof name === 'string' ? name.length : 1
    },
    text () {
      const val = this.record[this.column.name];
      return val === undefined ?  '-' : val;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
