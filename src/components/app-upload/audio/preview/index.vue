<template>
  <div class="upload-preview">
    <div v-if="type === 'audio'" class="upload-type-audio">
      <div class="upload-box" @click.stop>
        <audio
          :src="fileUrl"
          controlsList="nodownload"
          controls
        />
      </div>
      <div class="upload-link">
        <el-button :disabled="disabled" type="text">重新上传</el-button>
        <el-button :disabled="disabled" type="text" @click.stop="removeHandler">删除</el-button>
      </div>
    </div>
    <div v-if="type === 'lrc'" class="upload-type-lrc">
      <el-input
        v-model="lrcText"
        :disabled="true"
        :rows="6"
        type="textarea"
        @click.native.stop
      />
      <div class="upload-link">
        <el-button :disabled="disabled" type="text">重新上传</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadPreview',
  props: {
    fileUrl: {
      type: String,
      default() {
        return ''
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      lrcText: ''
    }
  },
  computed: {
    type() {
      const url = this.fileUrl
      const suffix = url && url.substring(url.lastIndexOf('.') + 1)
      let type = ''
      if (suffix === 'mp3' || suffix === 'm4a') {
        type = 'audio'
      }
      if (suffix === 'txt' || suffix === 'zrce2' || suffix === 'lrc') {
        type = 'lrc'
        this.parseLrc(url)
      }
      return type
    }
  },
  methods: {
    parseLrc() {
      const lrcUrl = this.fileUrl
      this.getLrc(lrcUrl).then((lrc) => {
        // todo: filter
        const lrcText = typeof lrc === 'string' ? lrc.replace(/(\[[\w:-\d]+\]\n)|([\[\<][\d:,]+[\]\>])/g, '') : ''
        this.lrcText = lrcText
      }).catch(e => {
        console.log(e)
      })
    },
    getLrc(lrcURL) {
      if (!lrcURL) {
        return new Promise((resolve, reject) => {
          resolve('')
        })
      }
      return this.request({
        methods: 'get',
        url: lrcURL,
        withCredentials: false
      })
    },
    removeHandler() {
      this.$emit('remove', this.fileUrl);
    }
  }
}
</script>

<style lang="scss" scoped>
  .upload-preview {
    .upload-type-audio {
      display: flex;
      height: 36px;
      .upload-box {
        flex: 1;
        text-align: left;
      }
      audio {
        height: 100%;
      }
    }
    .upload-type-lrc {
      position: relative;
      margin-top: 10px;
      .upload-link {
        position: absolute;
        bottom: 0px;
        right: 15px;
      }
    }
  }
</style>
