<template>
  <div class="cell-link">
    <a :href="item.url" target="_blank" v-for="(item, index) in urls" :key="item.url">
      <el-link type="primary" v-if="item.text"> {{item.text}} </el-link>
      <el-link type="primary" v-else> {{defaultText | filter(record, column)}} </el-link>
      <span v-if="index < urls.length - 1">, </span>
    </a>
  </div>
</template>

<script>
  import Mixins from '../mixins';
  export default {
    name: 'ColumnCellLink',
    mixins: [Mixins],
    computed: {
      defaultText () {
        const val = this.record[this.column.name];
        return val === undefined ?  '-' : val;
      }
    }
  }
</script>

<style scoped>

</style>
