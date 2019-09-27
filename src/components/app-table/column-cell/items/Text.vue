<template>
<div>
  <div v-if="textLength < 10" class="cell-text">
    {{ text | filter(record, column) }}
  </div>
  <el-popover
    v-else
    placement="top-start"
    title="标题"
    width="200"
    trigger="hover"
    :content="text">
    <el-button slot="reference">{{ text.substring(0,9) }}...</el-button>
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
      return this.record[this.column.name].length
    },
    text () {
      return this.record[this.column.name] || ''
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
