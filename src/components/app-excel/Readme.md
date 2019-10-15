## Form 组件示例 
```vue
<template>
  <div class="page">
    <!-- 拒绝弹窗 -->
    <el-button type="primary" @click="show">显示form</el-button>
    <app-form :form="form" v-model="formData" :show.sync="showForm" @done="closeDialog" />
  </div>
</template>

<script>
export default {
  name: 'PostsManage',
  data() {
    return {
      form: {
        fields: [
          {
            name: 'topicDesc',
            label: '关联话题',
            type: 'text'
          },
          {
            name: 'nickName',
            label: '关联账号',
            type: 'text'
          }
        ]
      },
      formData: {},
      showForm: false
    }
  },
  methods: {
    /**
     * 更新表格
     */
    show() {
      this.showForm = true
    },
    closeDialog () {
      this.showForm = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .page {
    padding: 20px;
  }
</style>

```