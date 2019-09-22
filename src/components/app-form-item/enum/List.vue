<template>
  <div class="enum-list">
    <transition-group tag="ol" name="el-fade-in-linear">
      <li v-for="(e, index) in list" :key="'enum-item' + index">
        {{e}}
        <el-button type="text" @click.native="deleteEnumHandler(e, index)">
          <i class="el-icon-delete"></i>
        </el-button>
      </li>
    </transition-group>
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
        this.$emit('remove', e, i);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .enum-list {
    padding: 0 15px 10px;
    ol {
      padding: 0;
      margin: 0;
      list-style-type: upper-decimal;
    }
  }
</style>
