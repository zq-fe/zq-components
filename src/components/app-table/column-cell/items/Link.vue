<template>
  <div class="cell-link">
    <a :href="url" target="_blank">
      <el-link type="primary"> {{ record[column.name] | filter(record, column) }} </el-link>
    </a>
  </div>
</template>

<script>
import Mixins from '../mixins';
export default {
  name: 'ColumnCellLink',
  mixins: [Mixins]
}
</script>

<style scoped>

</style>
