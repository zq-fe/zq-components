<template>
  <el-upload
    :disabled="disabled"
    :before-upload ="getFile"
    :accept = "accept"
    :show-file-list="false"
    :http-request="uploadHandler"
    class="upload-container"
    action=""
  >
    <div class="upload-opts" v-if="!fileUrl">
      <el-button class="selectBTN" type="text" :loading="loading" :disabled="disabled">选择文件</el-button>
      <span v-if="placeholder" class="upload-tip">{{ placeholder }}</span>
    </div>
    <upload-preview v-if="fileUrl" v-loading="loading" :fileUrl="fileUrl" :disabled="disabled" class="upload-preview"/>
  </el-upload>
</template>
<script>
import AliOSS from 'ali-oss';
import OssConfig from '../config';
import UploadPreview from './preview';
const md5 = require('md5');

export default {
  name: 'AudioUpload',
  components: {
    UploadPreview
  },
  props: {
    // 提示
    placeholder: '',
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    },
    suffix: {
      type: Array,
      default() {
        return ['jpg', 'png']
      }
    },
    value: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      loading: false,
      dir: OssConfig.directory,
      base: OssConfig.baseUrl,
      bucket: OssConfig.bucket,
      accessId: OssConfig.accessId,
      accessKey: OssConfig.accessKey,
      // base: 'http://res-static.inframe.mobi/',
      policy: '',
      signature: '',
      client: ''
    }
  },
  computed: {
    accept() {
      const temp = this.suffix.map(item => {
        return '.' + item
      })
      return temp.join(',')
    },
    fileUrl: {
      set(val) {
        this.$emit('input', val)
      },
      get() {
        return this.value
      }
    }
  },
  created() {
    this.generateSign()
  },
  methods: {
    generateSign() {
      this.client = new AliOSS({
        region: 'oss-cn-beijing',
        accessKeyId: this.accessId,
        accessKeySecret: this.accessKey,
        bucket: this.bucket
      })
    },
    getFile(file) {
      // const fileName = file.name
      // const suffix = fileName.substring(fileName.lastIndexOf('.') + 1)
      // if (!this.suffix.includes(suffix)) {
      //   const tooltip = this.suffix.join('、')
      //   this.$message({
      //     message: `仅支持${tooltip}格式的文件`,
      //     type: 'error'
      //   })
      //   return false
      // }
    },
    uploadHandler(upload) {
      const file = upload.file
      const fileName = file.name
      const suffix = fileName.substring(fileName.lastIndexOf('.') + 1)
      const fileNameMd5 = md5(fileName) + '.' + (suffix && suffix.toLowerCase());
      this.$emit('update:loading', true)
      const fileNameCode = `${this.dir}/${Date.now()}_${fileNameMd5}`
      this.loading = true;
      this.client.put(fileNameCode, file).then(res => {
        this.loading = false;
        const url = `${this.base}${fileNameCode}`
        this.change(url)
        this.$emit('update:loading', false)
      }).catch(err => {
        this.loading = false;
        this.$emit('update:loading', false)
        console.log('error==============:', err)
      })
    },
    change(url) {
      this.fileUrl = url
      this.$emit('change', url);
    }
  }
}
</script>
<style lang="scss" scoped>
  .upload-opts {
    text-align: left;
    .upload-tip {
      opacity: .6;
      font-size: 12px;
    }
  }
  .option-box {
    display: flex;
    .upload-preview {
      flex: 1;
    }
  }
</style>

