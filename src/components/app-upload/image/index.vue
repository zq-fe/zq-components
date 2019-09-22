<template>
  <div>
    <div v-if="multiple && fileList.length>0" v-for="(item,index) in fileList" :key="index" class="preview">
      <img class="avatar" :src="item" alt="">
      <i @click="handleRemove(item)" class="el-icon-delete"></i>
    </div>
    <el-upload
      v-if="multiple"
      :show-file-list="false"
      :http-request="uploadHandler"
      action=""
      :accept="accept"
      :disabled="disabled"
      class="avatar-uploader"
      :class="{disabled: disabled}"
    >
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-upload
      v-if="!multiple"
      :show-file-list="false"
      :http-request="uploadHandler"
      action=""
      :accept="accept"
      :disabled="disabled"
      class="avatar-uploader"
    >
      <img v-if="imageUrl && imageUrl.length>0" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import AliOSS from "ali-oss";
import OssConfig from "../config";
const md5 = require("md5");
export default {
  name: "ImageUpload",
  props: {
    suffix: {
      type: Array,
      default() {
        return ["jpg", "png", "jpeg"];
      }
    },
    value: {
      type: [String, Array],
      default() {
        return "";
      }
    },
    multiple: {
      type: Boolean,
      default() {
        return false;
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  computed: {
    accept() {
      const temp = this.suffix.map(item => {
        return "." + item;
      });
      return temp.join(",");
    },
    imageUrl: {
      set(val) {
        this.$emit("input", val);
      },
      get() {
        return this.value;
      }
    }
  },
  data() {
    return {
      fileList: [],
      dir: OssConfig.directory,
      base: OssConfig.baseUrl,
      bucket: OssConfig.bucket,
      accessId: OssConfig.accessId,
      accessKey: OssConfig.accessKey
    };
  },
  mounted() {
    this.generateSign();
  },
  methods: {
    handleRemove(file) {
      this.fileList.forEach((item, index) => {
        if (file === item) {
          this.fileList.splice(index, 1);
        }
      });
    },
    generateSign() {
      this.client = new AliOSS({
        region: "oss-cn-beijing",
        accessKeyId: this.accessId,
        accessKeySecret: this.accessKey,
        bucket: this.bucket
      });
    },
    uploadHandler(upload) {
      const file = upload.file;
      const fileName = file.name;
      const suffix = fileName.substring(fileName.lastIndexOf(".") + 1);
      const x2 = fileName.lastIndexOf("@2x") > -1 ? "@2x" : "";
      const x3 = fileName.lastIndexOf("@3x") > -1 ? "@3x" : "";
      const fileNameMd5 = md5(fileName) + "_" + x2 + x3 + "." + suffix;
      if (!this.suffix.includes(suffix)) {
        const tooltip = this.suffix.join("、");
        this.$message({
          message: `仅支持${tooltip}格式的文件`,
          type: "error"
        });
      }
      this.$emit("start");
      const fileNameCode = `${this.dir}/${Date.now()}_${fileNameMd5}`;
      this.client
        .put(fileNameCode, file)
        .then(res => {
          const url = `${this.base}${fileNameCode}`;
          this.change(url);
        })
        .catch(err => {
          console.log("error==============:", err);
        });
    },
    change(url) {
      if (this.multiple) {
        this.fileList.push(url);
        this.imageUrl = this.fileList;
      } else {
        this.imageUrl = url;
      }
      this.$emit("change", this.imageUrl);
    }
  }
};
</script>

<style lang="scss">
.app-audio-upload {
  display: flex;
  flex-wrap: wrap;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.disabled .el-upload:hover {
  border-color: #C0C4CC;
  cursor: not-allowed;
  .avatar-uploader-icon {
    font-size: 28px;
    color: #C0C4CC;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px!important;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.preview {
  position: relative;
  margin-right: 10px;
  margin-bottom: 10px;
  > i {
    position: absolute;
    left: 34px;
    color: #fff;
    top: 34px;
    display: none;
    font-size: 30px;
  }
  &:hover {
    > i {
      display: block;
      cursor: pointer;
    }
  }
}
</style>
