<template>
  <div class="cell-text">
    {{ record[column.name] | filter(record, column) }}
  </div>
</template>

<script>
import Mixins from '../mixins';
export default {
  name: 'ColumnCellText',
  mixins: [Mixins]
}
</script>

<style lang="scss" scoped>

</style>
