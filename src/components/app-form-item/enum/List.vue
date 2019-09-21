<template>
  <div class="enum-list">
    <ol>
      <li v-for="(e, i) in list" :key="e + '_' + i">
        {{e}}
        <el-button type="text" @click.native="deleteEnumHandler(e, i)">
          <i class="el-icon-delete"></i>
        </el-button>
      </li>
    </ol>
  </div>
</template>

<script>

export default {
  name: 'EnumList',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    /**
     * 删除枚举项
     * @param e
     */
    deleteEnumHandler(e, i) {
      this.$emit('remove', e);
    }
  }
}
</script>

<style lang="scss" scoped>
  .enum-list {
    ol {
      list-style-type: upper-decimal;
    }
  }
</style>
