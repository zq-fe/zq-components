<template>
  <div class="x-tag">
    <el-tag
      v-for="item in options"
      :key="item[valueKey]"
      class="x-tag-item"
    >
      {{ item[labelKey] }}
    </el-tag>
  </div>
</template>
<script>
export default {
  name: 'Tag',
  props: {
    options: {
      type: Array,
      default: function() {
        return []
      }
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    }
  }
}
</script>
<style lang="scss" scoped>
  .x-tag {
    .x-tag-item {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
</style>
