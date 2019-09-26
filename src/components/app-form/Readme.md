## Form 组件示例 
```vue
<template>
  <div>
    <!-- 注入表格 -->
    <app-table :data="dataConfig" @update="updateHandler" ref="appTable">
      <!-- 查询条件 slot -->
      <template slot="search">
        <el-button type="primary" icon="el-icon-plus" @click="addHandler">创建新帖</el-button>
      </template>
    </app-table>
    <!-- 注入form -->
    <app-form :form="form" name="accountForm" v-model="formData" :show.sync="showForm" @done="updateTable"/>
  </div>
</template>

<script>
export default {
  name: 'PostsManage',
  data() {
    return {
      dataConfig: {
        url: '/v1/posts',
        actions: {
          update: true
        },
        params: [
          {
            name: 'range',
            label: '发布日期',
            type: 'daterange'
          },
          {
            name: 'postsID',
            label: '帖子ID',
            type: 'text'
          },
          {
            name: 'userID',
            label: '用户ID',
            type: 'text'
          },
          {
            name: 'source',
            label: '来源',
            type: 'select',
            data: [
              {
                label: '用户',
                value: 1
              },
              {
                label: '运营',
                value: 2
              }
            ]
          },
          {
            name: 'topicTitle',
            label: '话题',
            type: 'select-search',
            remote: {
              url: '/v1/topics',
              label: 'topicTitle',
              value: 'topicTitle',
              keyword: 'topicTitle',
              params: {
                page: 1,
                limit: 200
              }
            }
          },
          {
            name: 'label',
            label: '帖子标签',
            type: 'select',
            data: [
              {
                label: '审核',
                value: 1
              },
              {
                label: '机器',
                value: 2
              },
              {
                label: '潜力',
                value: 3
              },
              {
                label: '热门',
                value: 4
              },
              {
                label: '经典',
                value: 5
              }
            ]
          },
          {
            name: 'status',
            label: '审核状态',
            type: 'select',
            value: 3,
            data: [
              {
                label: '未审核',
                value: 1
              },
              {
                label: '审核拒绝',
                value: 2
              },
              {
                label: '审核接受',
                value: 3
              }
            ]
          }
        ],
        columns: [
          {
            title: '帖子ID',
            name: 'postsID'
          },
          {
            title: '用户ID',
            name: 'userID'
          },
          {
            title: '用户昵称',
            name: 'nickname'
          },
          {
            title: 'ctr',
            name: 'clickPV'
          },
          {
            title: '曝光',
            name: 'exposurePV'
          },
          {
            title: '评论数量',
            name: 'commentCnt'
          },
          {
            title: '点赞数量',
            name: 'starCnt'
          },
          {
            title: '话题标题',
            name: 'topicTitle'
          },
          {
            title: '帖子标签',
            name: 'labels',
            filter: (labels) => {
              const data = [
              {
                label: '审核',
                value: 1
              },
              {
                label: '机器',
                value: 2
              },
              {
                label: '潜力',
                value: 3
              },
              {
                label: '热门',
                value: 4
              },
              {
                label: '经典',
                value: 5
              }
            ]
            let res = []
            labels && labels.forEach && data.forEach(item => {
              labels.forEach(label => {
                if (item.value === label) {
                  res.push(item.label)
                }
              })
            })
            return res.join(', ') || '-'
            }
          },
          {
            title: '来源',
            name: 'source',
            filter: val => {
              const data = [
                {
                  label: '用户',
                  value: 1
                },
                {
                  label: '运营',
                  value: 2
                }
              ]
              let label = ''
              data.forEach(item => {
                if (item.value === val) {
                  label = item.label
                }
              })
              return label
            }
          },
          {
            title: '发布时间',
            name: 'createdAt',
            filter: 'time'
          },
          {
            title: '审核状态',
            name: 'status',
            filter: val => {
              const data = [
                {
                  label: '未审核',
                  value: 1
                },
                {
                  label: '审核拒绝',
                  value: 2
                },
                {
                  label: '审核接受',
                  value: 3
                }
              ]
              let label = ''
              data.forEach(item => {
                if (item.value === val) {
                  label = item.label
                }
              })
              return label
            }
          },
          {
            title: '评论',
            name: 'compoment',
            type: 'link',
            getUrl: (value, record, column) => {
              return '/posts/comments?postsID=' + record['postsID']+ '&userID=' +record['userID'];
            },
            filter: () => {
              return '评论';
            }
          }
        ]
      },
      form: {
        url: '/v1/posts',
        fields: [
          {
            name: 'topicID',
            label: '关联话题',
            type: 'select-search',
            placeholder: '请输入帖子话题名称',
            required: true,
            remote: {
              url: '/v1/topics',
              label: 'topicTitle',
              value: 'topicID',
              keyWord: 'topicTitle',
              params: {
                page: 1,
                limit: 200
              }
            },
            disabled: () => {
              const postsID = this.formData.postsID;
              return !!postsID;
            },
            get: (val) => {
              const formData = this.formData;
              const postsID = formData.postsID;
              if (postsID) {
                return formData.topicDesc;
              } else {
                return val;
              }
            }
          },
          {
            name: 'userID',
            label: '关联账号',
            type: 'select-search',
            placeholder: '请输入账户管理下账户名称',
            required: true,
            remote: {
              url: '/v1/users/search',
              label: 'nickName',
              value: 'userID',
              keyWord: 'keyword'
            },
            disabled: () => {
              const postsID = this.formData.postsID;
              return !!postsID;
            },
            get: (val) => {
              const formData = this.formData;
              const postsID = formData.postsID;
              if (postsID) {
                return formData.nickname;
              } else {
                return val;
              }
            }
          },
          {
            name: 'title',
            label: '文字',
            placeholder: '请输入帖子文字',
            type: 'textarea',
            disabled: () => {
              const postsID = this.formData.postsID;
              return !!postsID;
            }
          },
          {
            name: 'pictures',
            label: '添加图片',
            type: 'image-upload',
            placeholder: '请输入帖子图片',
            multiple: true,
            disabled: () => {
              const formData = this.formData;
              const postsID = formData.postsID;
              const audios = formData.audios;
              return !!postsID || (audios ? audios.length > 0 : false) || formData.songID;
            }
          },
          {
            name: 'audios',
            label: '添加录音',
            type: 'audio-upload',
            placeholder: '请输入帖子音频文件',
            suffix: ['mp3', 'm4a'],
            get: (val = []) => {
              const url = val && val[0];
              return url && url.URL;
            },
            set: (URL) => {
              return URL ? [{ URL }] : [];
            },
            disabled: () => {
              const formData = this.formData;
              const postsID = formData.postsID;
              const pictures = formData.pictures;
              return !!postsID || (pictures ? pictures.length > 0 : false) || formData.songID;
            }
          },
          {
            name: 'songID',
            label: '关联神曲',
            type: 'select-search',
            placeholder: '请输入神曲songID',
            remote: {
              url: '/v1/posts/songs-search',
              label: 'workName',
              value: 'songID',
              keyWord: 'songID',
              params: {
                page: 1,
                limit: 200
              }
            },
            disabled: () => {
              const formData = this.formData;
              const postsID = formData.postsID;
              const { pictures, audios } = formData;
              return !!postsID || (pictures ? pictures.length > 0 : false) || (audios ? audios.length > 0 : false);
            },
            get: (val) => {
              const formData = this.formData;
              const postsID = formData.postsID;
              if (postsID) {
                return formData.nickname;
              } else {
                return val;
              }
            }
          },
          {
            name: 'voteOptions',
            label: '投票选项',
            type: 'enum',
            disabled: () => {
              const postsID = this.formData.postsID;
              return !!postsID;
            },
            get: (val) => {
              return val;
            }
          },
          {
            name: 'redpacketType',
            label: '红包类型',
            type: 'select',
            value: 1,
            data: [
              {
                label: '无',
                value: ''
              },
              {
                label: '金币',
                value: 1
              },
              {
                label: '钻石',
                value: 2
              }
            ],
            disabled: () => {
              const postsID = this.formData.postsID;
              return !!postsID;
            }
          },
          {
            name: 'redpacketCnt',
            label: '金额大小',
            type: 'select',
            data: [
              {
                label: '无',
                value: ''
              },
              {
                label: '20',
                value: '20'
              },
              {
                label: '50',
                value: '50'
              },
              {
                label: '100',
                value: '100'
              },
              {
                label: '880',
                value: '880'
              }
            ],
            disabled: () => {
              const formData = this.formData;
              const postsID = formData.postsID;
              return !!postsID || !formData.redpacketType;
            }
          },
          {
            name: 'label',
            label: '运营推荐',
            type: 'checkbox-group-single',
            required: true,
            data: [
              {
                label: '潜力',
                value: 3
              },
              {
                label: '热门',
                value: 4
              },
              {
                label: '经典',
                value: 5
              }
            ],
            set(val) {
              return val && val.length && (val[1] || val[0]);
            },
            get(val) {
              return val ? [val] : [];
            }
          }
        ]
      },
      formData: {
        voteOptions: []
      },
      showForm: false
    }
  },
  methods: {
    /**
     * 添加数据 post
     */
    addHandler() {
      this.formData = {
        voteOptions: []
      };
      this.form.method = 'post';
      this.showForm = true;
    },
    /**
     * 更新表格
     */
    updateTable() {
      this.$refs.appTable.doSearch();
    },
    /**
     *
     * @param row
     */
    updateHandler(row) {
      this.request({
        url:'/v1/posts/logs',
        method:'post',
        data: {
          postsID: row.postsID
        }
      }).then(res => {
         if(res.data.errno === 0) {
           console.log('记录成功')
         } else {
           console.log(res.data.errmsg)
         }
      }).catch(err => {
        console.log(err)
      })
      this.form.method = 'put';
      this.formData = {
        ...row,
        oldLabels: row.labels || [],
        voteOptions: row.voteOptions || [],
        label: ''
      };
      this.showForm = true;
    }
  },
  filters: {
    tag: (tags, tagList) => {
      if (tags && tags.length) {
        const tagArr = tagList.filter(t => t.value === tags[0]);
        return tagArr && tagArr[0] && tagArr[0].label || '-';
      } else {
        return '-';
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

```