<template>
  <div class="enum-item">
    <div>
      <el-input
        :disabled="disabled"
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="content">
      </el-input>
    </div>
    <div>
      <el-button
        type="text"
        :disabled="disabled"
        @click.native="addContentHandler"
      >
        添加内容
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EnumItem',
  props: {
    disabled: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      content: ''
    }
  },
  methods: {
    /**
     * 添加枚举内容
      */
    addContentHandler() {
      const content = this.content;
      if (!content) {
        this.$message({
          type: 'warning',
          message: '枚举内容不能为空'
        });
        return;
      }
      this.$emit('add', this.content);
      this.content = '';
    }
  }
}
</script>

<style scoped>

</style>
