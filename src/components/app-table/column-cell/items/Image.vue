<template>
  <el-popover
    placement="left"
    :disabled="imgSrcs.length === 0"
    v-if="imgSrcs.length"
    trigger="hover"
  >
    <el-row :gutter="10">
      <el-col
        v-for="src in imgSrcs"
        :span="24 / imgSrcs.length"
        :key="src"
      >
        <el-image
          style="width: 150px; height: 300px;"
          :src="src"
          :preview-src-list="imgSrcs">
        </el-image>
      </el-col>
    </el-row>
    <el-button slot="reference">
      <svg-icon :icon-class="imgSrcs.length ? 'has-img' : ''" />
    </el-button>
  </el-popover>
</template>

<script>
import Mixins from '../mixins';
export default {
  name: 'ColumnCellImage',
  mixins: [Mixins],
  computed: {
    imgSrcs() {
      const me = this;
      const { name } = me.column;
      const urls = me.record[name];
      if (urls && urls.join) {
        return urls;
      } else if (urls && typeof (urls) === 'string') {
        return urls.split(',');
      } else  {
        return !!urls ? [urls] : [];
      }
    }
  }
}
</script>

<style scoped>

</style>
