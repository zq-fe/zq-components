
# 基于vue表格和变表单组件

主要配合[pcadmin]使用。
使用方法：
```
npm install zq-components
```


# AppForm组件使用实例
```
import { AppForm } from 'zq-components'
Vue.use(AppForm)
```
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
```vue
<template>
  <el-form>
    <app-form-item :field="field" v-model="fieldValue" />
  </el-form> 
</template>
<script>
  import '../../utils/global-comps';
  export default {
    name: 'AppFormItemText',
    data() {
      return {
        field: {
          label: '文本',
          type: 'text'
        },
        fieldValue: 1 
      }
    }
  }
</script>
```

# AppFormItem组件使用实例
```
import { AppFormItem } from 'zq-components'
Vue.use(AppFormItem)
```
## 文本域类型
```vue
<template>
  <el-form>
    <app-form-item :field="field" v-model="fieldValue" />
  </el-form> 
</template>
<script>
  import '../../utils/global-comps';
  export default {
    name: 'AppFormItemArea',
    data() {
      return {
        field: {
          label: '文本域',
          type: 'textarea'
        },
        fieldValue: 1
      }
    }
  }
</script>
```
## 文本域类型
```vue
<template>
  <el-form>
    <app-form-item :field="field" v-model="fieldValue" />
    <app-form-item :field="fieldRemote" v-model="fieldRemoteValue" />
  </el-form> 
</template>
<script>
  import '../../utils/global-comps';
  export default {
    name: 'AppFormItemSelect',
    data() {
      return {
        field: {
          label: '普通select',
          type: 'select',
          data: [
            {
              label: '选择1',
              value: 1
            },
            {
              label: '选择2',
              value: 2
            }
          ]
        },
        fieldValue: 1,
        fieldRemote: {
          label: '异步获取select',
          type: 'select',
          data: {
            url: '/v1/commedias/tags',
            label: 'tagDesc',
            value: 'tagID'
          }
        },
        fieldRemoteValue: 1
      }
    }
  }
</script>
```
## 上传
```vue
<template>
  <el-form>
    <app-form-item :field="fieldAudio" v-model="audio"/>
    <app-form-item :field="fieldLrc" v-model="lrc"/>
    <app-form-item :field="filedImage" v-model="image"/>
  </el-form> 
</template>
<script>
  import '../../utils/global-comps';
  export default {
    name: 'AppFormItemUpload',
    data() {
      return {
        audio: '',
        lrc: '',
        image: '',
        fieldAudio: {
          label: '音频上传',
          suffix: ['mp3', 'm4a'],
          type: 'audio-upload',
        },
        fieldLrc: {
          label: '歌词上传',
          suffix: ['txt', 'zrce', 'zrce2'],
          type: 'audio-upload',
        },
        filedImage: {
          label: '歌词上传',
          suffix: ['jpg', 'png', 'jpeg'],
          type: 'image-upload', 
        }
      }
    }
  }
</script>
```


# AppTable组件使用实例
```
import { AppTable } from 'zq-components';
Vue.use(AppTable)
```
```vue
<template>
  <!-- 注入表格 -->
  <app-table :data="dataConfig">
    <!-- 查询条件 slot -->
    <template slot="search">
      <el-button type="primary" icon="el-icon-plus" @click="clickHandler"
        >创建账户</el-button
      >
    </template>
    <!-- 特殊列slot  -->
    <template slot="column">
      <el-table-column label="标签">
        <template slot-scope="scope">
          {{ scope.row.tags }}
        </template>
      </el-table-column>
    </template>
  </app-table>
</template>
<script>
import '../../utils/global-comps';
export default {
  name: 'TableDemo',
  data() {
    return {
      showDialog: false,
      dataConfig: {
        url: '/v1/robots',
        actions: {
          delete: true,
          // config url method ID
          /**
          * config url method ID
          * delete: {
          *    url: '', // default /v1/robots
          *    method: '', // default delete
          *     ID: '' 
          *  }
          */
          update: true,
          preview: true
        },
        params: [
          {
            name: 'range',
            label: '创建日期',
            type: 'daterange'
          },
          {
            name: 'userID',
            label: '账号ID',
            type: 'text'
          },
          {
            name: 'nickName',
            label: '账号昵称',
            type: 'text'
          },
          {
            name: 'sex',
            label: '账号性别',
            type: 'select',
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
          },
          {
            name: 'tags',
            label: '账号标签',
            type: 'select',
            data: {
              url: '/v1/commedias/tags',
              label: 'tagDesc',
              value: 'tagID'
            }
          },
          {
            name: 'type',
            label: '账号类型',
            type: 'select',
            data: [
              {
                label: '普通账户',
                value: 1
              },
              {
                label: 'KOL账号',
                value: 2
              }
            ]
          }
        ],
        columns: [
          {
            title: '创建时间',
            name: 'createdAt',
            filter: 'time'
          },
          {
            title: '昵称',
            name: 'nickName'
          },
          {
            title: '账号ID',
            name: 'userID'
          },
          {
            title: '性别',
            name: 'sex',
            filter: 'sex'
          },
          {
            title: '账号类型',
            name: 'type',
            filter: type => {
              return type === 1 ? '普通账户' : 'KOL账户';
            }
          },
          {
            title: '作品数量',
            name: 'songCnt'
          }
        ]
      }
    };
  },
  methods: {
    clickHandler() {
      this.$message('hello, click');
    }
  }
};
</script>
```
