<template>
  <div class="enum-item">
    <div>
      <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="content">
      </el-input>
    </div>
    <div>
      <el-button type="text" @click.native="addContentHandler">添加内容</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EnumItem',
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
