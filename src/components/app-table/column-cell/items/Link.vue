<template>
  <div class="cell-link">
    <a :href="item.url" target="_blank" v-for="(item, index) in urls" :key="item.url">
      <el-link type="primary"> {{item.text}} </el-link>
      <span v-if="index < urls.length - 1">, </span>
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
