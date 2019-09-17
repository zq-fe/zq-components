## Form 组件示例 
```vue
<template>
  <div>
    <button @click="showForm = true">显示form</button>
    <app-form :form="config" v-model="form" :show.sync="showForm" @done="doneHandler">
      <!-- 添加到自定义app-form-item里 -->
      <template slot="age">
        <app-form-item :field="ageItem" v-model="age"></app-form-item> 
      </template> 
      <!-- 添加到自定义app-form里 -->
      <template slot="formItem">
        <el-form-item label="是否推荐">
          <el-switch v-model="flag"></el-switch>
        </el-form-item> 
      </template>
    </app-form>
  </div>
</template>
<script>
  import '../../utils/global-comps';
  export default {
    name: 'FormDemo',
    data() {
      return {
        age: 0,
        flag: false,
        ageItem: {
          label: '年龄',
          name: 'age',
          type: 'text'
        },
        config: {
          url: '/v1/demo',
          fields: [
            {
              label: '姓名',
              name: 'name',
              type: 'text',
              required: true
            },
            {
               name: 'age',
               label: '年龄',
               type: 'slot',
               required: true
            },
            {
              label: '性别',
              name: 'sex',
              type: 'radio-group',
              required: true,
              data: [
                {
                  label: '男',
                  value: 1
                },
                {
                  label: '女',
                  value: 2
                }
              ]
            }
          ]
        },
        form: {
          age: 1,
          name: '',
          sex: 1
        },
        showForm: false
      }
    },
    methods: {
      /**
      * 处理 done 回调
      */
      doneHandler(e) {
        $this.message('hi, a errer' + e);
      }
    }
  }
</script>
```