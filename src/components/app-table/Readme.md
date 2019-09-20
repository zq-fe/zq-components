## Table 组件示例

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
            title: '音频',
            name: 'userID',
            type: 'audio'
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
