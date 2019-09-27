## Table 组件示例

```vue
<template>
  <div>
    <!-- 注入表格 -->
    <app-table :data="dataConfig" :show-options="false" ref="apptable">
      <!-- 查询条件 slot -->
      <template slot="search">
        <el-button type="primary" icon="el-icon-plus" @click="addAccount">创建账户</el-button>
      </template>
      <!-- 特殊列slot  -->
      <template slot="column">
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="updateAccount(scope.row)">编辑</el-link>
          </template>
        </el-table-column>
      </template>
    </app-table>
    <!-- 注入form -->
    <app-form :form="form" name="accountForm" v-model="account" :show.sync="showDialog" @done="updateTable"/>
  </div>
</template>

<script>

export default {
  name: 'AccountIndex',
  data() {
    return {
      showDialog: false,
      dataConfig: {
        url: '/v1/robots',
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
              },
              {
                label: '红包账号',
                value: 3
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
            filter: (type) => {
              const data = [
                {
                  label: '未知',
                  value: 0
                },
                {
                  label: '普通账户',
                  value: 1
                },
                {
                  label: 'KOL账号',
                  value: 2
                },
                {
                  label: '红包账号',
                  value: 3
                }
              ]
              let res = ''
              data.map(item => {
                if (item.value === type) {
                  res = item.label
                }
              })
              return res
            }
          },
          {
            title: '钻石余额',
            name: 'coinCnt'
          },
          {
            title: '金币余额',
            name: 'zsCnt'
          },
          {
            title: '作品数量',
            name: 'songCnt'
          }
        ]
      },
      form: {
        url: '/v1/robots',
        fields: [
          {
            name: 'nickName',
            label: '昵称',
            type: 'text',
            required: true
          },
          {
            name: 'avatar',
            label: '头像',
            type: 'image-upload',
            required: true
          },
          {
            name: 'sex',
            label: '性别',
            type: 'radio-group',
            data: [
              {
                label: '男',
                value: 1
              },
              {
                label: '女',
                value: 2
              }
            ],
            required: true
          },
          {
            name: 'type',
            label: '账号类别',
            type: 'radio-group',
            data: [
              {
                label: '普通账户',
                value: 1
              },
              {
                label: 'KOL账号',
                value: 2
              },
              {
                label: '红包账户',
                value: 3
              }
            ],
            required: true
          },
          {
            name: 'signature',
            label: '签名',
            type: 'textarea'
          },
          {
            name: 'tags',
            label: '标签',
            type: 'checkbox-group-single',
            data: {
              url: '/v1/commedias/tags',
              label: 'tagDesc',
              value: 'tagID'
            },
            required: true
          },
          {
            name: 'coinCnt',
            label: '充金币',
            type: 'number',
            disabled: () => {
              return this.account.type !== 3;
            }
          },
          {
            name: 'zsCnt',
            label: '充钻石',
            type: 'number',
            disabled: () => {
              return this.account.type !== 3;
            }
          }
        ]
      },
      account: {
        nickName: '',
        avatar: '',
        sex: 1
      }
    }
  },

  methods: {
    /**
     * 添加账户 post
     */
    addAccount() {
      this.form.method = 'post';
      this.showDialog = true;
    },
    /**
     * 更新账户 put
     * @param account
     */
    updateAccount(account) {
      this.account = { ...account };
      this.account.coinCnt = 0
      this.account.zsCnt = 0
      this.form.method = 'put';
      this.showDialog = true;
    },
    /**
     * 更新表格
     */
    updateTable() {
      this.$refs.apptable.doSearch()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

```
