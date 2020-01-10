<template>
<div>
  <div class="cell-text">
    {{ text | filter(record, column) }}
  </div>
</div>
</template>

<script>
import Mixins from '../mixins';
export default {
  name: 'ColumnCellFilter',
  mixins: [Mixins],
  computed: {
    text () {
      const val = this.record[this.column.name];
      return val === undefined ?  '-' : val;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
