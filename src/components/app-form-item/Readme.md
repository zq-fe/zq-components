### Form 组件示例
## 文本类型
```vue
<template>
  <el-form>
    <app-form-item :field="field" maxlength="5" v-model="fieldValue" />
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
          type: 'text',
          maxlength:2
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
  <el-form label-width="100">
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
          type: 'textarea',
          maxlength:4
        },
        fieldValue: 1
      }
    }
  }
</script>
```
## 枚举类型
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
          label: '枚举',
          type: 'enum'
        },
        fieldValue: []
      }
    }
  }
</script>
```
## 下拉框
```vue
<template>
  <el-form>
    <app-form-item :field="field" v-model="fieldValue" />
    <app-form-item :field="fieldRemote" v-model="fieldRemoteValue" />
    <app-form-item :field="fieldRemoteSearch" v-model="fieldRemoteSearchValue" />
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
        fieldValue: [],
        fieldRemote: {
          label: '异步获取select',
          type: 'select',
          data: {
            url: '/v1/commedias/tags',
            label: 'tagDesc',
            value: 'tagID'
          }
        },
        fieldRemoteValue: 1,
        fieldRemoteSearchValue: '',
        fieldRemoteSearch: {
          label: '异步获取select搜索',
          type: 'select-search',
          getPalyUrl() {
            return 'http://song-static.inframe.mobi/feed/web-admin-offline/1569487412816_8754dad6b775ee9d571f3d7fe0f28525.mp3'
          },
          remote: {
            url: '/v1/posts/songs-search',
            label: 'workName',
            value: 'songID',
            playUrl: 'playURL',
           keyWord: 'songID',
           params: {
             page: 1,
             limit: 200
             }
          }
        }
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
        image: [],
        fieldAudio: {
          label: '音频上传',
          suffix: ['mp3', 'm4a'],
          type: 'audio-upload',
          multiple: true,
          set: val => {  //期望得到数组时改变set 和get
            return [val]
          },
          get: val => {
            return val.toString()
          },
        },
        fieldLrc: {
          label: '歌词上传',
          suffix: ['txt', 'zrce', 'zrce2'],
          type: 'audio-upload',
        },
        filedImage: {
          label: '图片上传',
          suffix: ['jpg', 'png', 'jpeg'],
          type: 'image-upload',
        }
      }
    }
  }
</script>
```
