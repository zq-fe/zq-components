<template>
  <el-form-item class="app-form-item" v-if="field.display !== false" :style="{ ...field.style }" :prop="fieldItem.name" :label="showLabel ? fieldItem.label : ''">
    <!-- 日期组件 -->
    <el-date-picker
      v-if="fieldItem.type == 'daterange'"
      v-model="inputValue"
      :disabled="fieldItem.disabled"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      valueat="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
    />
    
    <!-- 下来远程搜索  -->
    <div>
      <el-select
          v-if="fieldItem.type == 'select-search'"
          v-model="inputValue"
          :disabled="fieldItem.disabled"
          filterable
          remote
          reserve-keyword
          :placeholder="fieldItem.placeholder"
          :remote-method="remoteMethod"
          :loading="loading"
          :clearable="true"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
        <el-option
            v-for="item in fieldItem.data"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <span v-if="item.playUrl" style="float: right; color: #8492a6; font-size: 13px;">
        </span>
        </el-option>
      </el-select>
      <app-audio v-if="previewPlayUrl" :url="previewPlayUrl" style="margin: 0 15px 0"/>
    </div>
    
    
    <!-- 下拉列表 -->
    <el-select
      v-if="fieldItem.type == 'select'"
      v-model="inputValue"
      :multiple="fieldItem.multiple"
      :disabled="fieldItem.disabled"
      :placeholder="fieldItem.placeholder"
      clearable
    >
      <el-option
        v-for="item in fieldItem.data"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    
    <!-- 文本类型， 字符串 -->
    <el-input
      v-if="fieldItem.type == 'text'"
      v-model="inputValue"
      :disabled="fieldItem.disabled"
      :placeholder="fieldItem.placeholder"
      :maxlength="fieldItem.maxlength"
      class="input"
      :clearable="true"
    />
    
    <!-- 文本类型， 数字 -->
    <el-input
      v-if="fieldItem.type == 'number'"
      v-model.number="inputValue"
      :rows="fieldItem.rows"
      :disabled="fieldItem.disabled"
      :placeholder="fieldItem.placeholder"
      class="input"
      :clearable="true"
    />
    
    <!-- 文本类型， 文本域 -->
    <el-input
      v-if="fieldItem.type == 'textarea'"
      v-model="inputValue"
      :rows="fieldItem.rows"
      :disabled="fieldItem.disabled"
      :placeholder="fieldItem.placeholder"
      :maxlength="fieldItem.maxlength"
      type="textarea"
      class="input"
      :clearable="true"
    />
    
    <!-- 自定义组件， 标签  -->
    <tag
      v-if="fieldItem.type == 'tag'"
      :options="inputValue || []"
      :label-key="fieldItem.label"
      :value-key="fieldItem.value"
    />
    
    <!-- 自定义组件， 标签  -->
    <tag-select
      v-if="fieldItem.type == 'tag-select'"
      v-model="inputValue"
      :options="fieldItem.data"
      :label-key="fieldItem.labelKey"
      :value-key="fieldItem.valueKey"
    />
    
    <!-- 自定义组件， 音频播放  -->
    <audio
      v-if="fieldItem.type == 'audio'"
      :src="inputValue"
      controlsList="nodownload"
      controls
      autoplay
    />
    
    <!-- 自定义组件，单选框  -->
    <el-radio-group
      v-if="fieldItem.type === 'radio-group'"
      v-model="inputValue"
      :disabled="fieldItem.disabled"
    >
      <el-radio
        v-for="item in fieldItem.data"
        :key="item.value"
        :label="item.value"
      >
        {{ item.label }}
      </el-radio>
    </el-radio-group>
    
    <!-- 自定义组件，复选框 单选  -->
    <el-checkbox-group
      v-if="fieldItem.type === 'checkbox-group-single'"
      v-model="inputValue"
      :disabled="fieldItem.disabled"
      @change="singleHandler"
    >
      <el-checkbox
        v-if="showSubs"
        v-for="item in fieldItem.data"
        :key="'checkout-item-single-' + item.value"
        :label="item.value"
      >
        {{ item.label }}
      </el-checkbox>
    </el-checkbox-group>
    
    <!-- 自定义组件，复选框 多选  -->
    <el-checkbox-group
      v-if="fieldItem.type === 'checkbox-group'"
      v-model="inputValue"
      :disabled="fieldItem.disabled"
    >
      <el-checkbox
        v-for="item in fieldItem.data"
        :key="'checkout-item' + item.value"
        :label="item.value"
      >
        {{ item.label }}
      </el-checkbox>
    </el-checkbox-group>
    
    <!-- 图片上传 -->
    <image-upload
      v-if="fieldItem.type === 'image-upload'"
      v-model="inputValue"
      :suffix="['jpg', 'png', 'jpeg']"
      :multiple="fieldItem.multiple"
      :disabled="fieldItem.disabled"
      class="app-audio-upload"
    />
    
    <!-- 音频文件上传 -->
    <audio-upload
      v-if="fieldItem.type === 'audio-upload'"
      v-model="inputValue"
      :suffix="fieldItem.suffix"
      :disabled="fieldItem.disabled"
      class="zq-upload"
    />
    
    <!-- switch 开关 -->
    <el-switch
      v-if="fieldItem.type === 'switch'"
      v-model="inputValue"
      :disabled="fieldItem.disabled"
    />
    
    <!-- 枚举选项 -->
    <enum
      v-if="fieldItem.type === 'enum'"
      v-model="inputValue"
      :disabled="fieldItem.disabled"
    />
  </el-form-item>
</template>
<script>
  import Tag from './tag/index';
  import TagSelect from './tag-select/index';
  import Enum from './enum/Index';
  import { ImageUpload, AudioUpload } from '../app-upload';

  /**
   * form item组件模板.
   * @displayName App-Form-Item
   */
  export default {
    name: 'AppFormItem',
    components: {
      Tag,
      TagSelect,
      AudioUpload,
      ImageUpload,
      Enum
    },
    props: {
      /**
       * 表单控件配置
       */
      field: {
        type: Object,
        required: true,
        default() {
          return {
            type: 'text',
            label: '',
            placeholder: '',
            data: []
          }
        }
      },
      /**
       * 是否禁用该组件
       */
      disabled: {
        type: [String, Boolean, Function],
        default() {
          return '';
        }
      },
      /**
       * 表单项值
       */
      value: {
        type: [String, Number, Array, Boolean],
        default: ''
      },
      /**
       * 是否显示标签
       */
      showLabel: {
        type: Boolean,
        default() {
          return true;
        }
      },
      /**
       * 播放类，预览url 可播放
       */
      playUrl: {
        type: String,
        default() {
          return ''
        }
      }
    },
    computed: {
      previewPlayUrl() {
        return this.selectedOptionItem.playUrl || this.fieldItem.playUrl;
      },
      inputValue: {
        get() {
          const field = this.field;
          const { type, get } = field;
          // 定制 get 方法，特殊字段处理
          if (get) {
            return get(this.value);
          }
          // 单选框 初始化值为 []
          if (type === 'checkbox-group-single') {
            return this.value || [];
          }
          return this.value;
        },
        set(value) {
          const field = this.field;
          const format = field.format;
          const set = field.set;
          const selectedItems = this.optionsData.filter(v => v.value === value);
          
          this.selectedOptionItem = selectedItems.length > 0 ? selectedItems[0] : {};
          if (format) {
            /**
             * 修改表单项值回调 v-model
             * @event input
             * @type {object}
             */
            this.$emit('input', format(value));
          } else if (set) {
            // 定制 set 方法，特殊字段处理
            this.$emit('input', set(value));
          } else {
            this.$emit('input', value)
          }
        }
      },
      showSubs() {
        const data = this.field.data || {};
        return data.length;
      },
      fieldItem: {
        get () {
          const field = { data: [], ...this.field };
          // 支持在 app-form-item 直接配置 disabled
          if (typeof (this.disabled) === 'boolean') {
            field.disabled = this.disabled;
          }
          // 支持在 配置项 直接配置 disabled 类型为函数
          if (typeof (field.disabled) === 'function') {
            field.disabled = field.disabled();
          }
          field.placeholder = field.placeholder || field.label;
          return field;
        },
        set (val) {
          this.field = val
        }
      }
    },
    data() {
      return {
        loading: false,
        optionsData: [],
        selectedOptionItem: {}
      }
    },
    created() {
      this.initDataList();
    },
    methods: {
      /**
       * 配置项有url 时， 初始化 菜单项
       */
      initDataList() {
        const field = this.field;
        const { url, label, value, params } = field.remote || field.data || {};
        if (url) {
          this.loading = true;
          this.request({
            url,
            params
          }).then(res => {
            this.loading = false;
            const dataList = res.data.items && [];
            this.optionsData = dataList.slice();
            this.field.data = dataList.map(o => {
              return {
                label: o[label],
                value: o[value]
              }
            });
          }).catch((e) => {
            this.loading = false;
          });
        }
      },
      /**
       * 处理单选
       * @param val
       */
      singleHandler(val) {
        if (val && val.length > 1) {
          const length = val.length
          const newVal = val.slice(length - 1, length);
          this.inputValue = newVal
        }
      },
      /**
       * 远程获取菜单项
       */
      remoteMethod(keyValue) {
        const field = this.fieldItem;
        const { url, label, value, params, keyWord, isList, playUrl } = field.remote || {};
        const paramsData = {
          ...params,
          [keyWord]: keyValue
        };
        this.loading = true;
        this.request({
          url,
          params: paramsData
        }).then(res => {
          this.loading = false;
          const data = res.data;
          const dataList = data.items || data.accounts || [];
          this.optionsData = dataList.slice();
          if (dataList && dataList.length > 0) {
            let i = 0;
            this.fieldItem.data = dataList.map(o => {
              return {
                key: i++,
                label: o[label],
                playUrl: o[playUrl],
                value: o[value]
              }
            });
          } else if (data[value]){
            this.fieldItem.data = [
              {
                key: 0,
                label: data[label],
                playUrl: data[playUrl],
                value: data[value]}
            ];
            this.optionsData = data;
          } else {
            this.fieldItem.data = []
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .app-form-item {
    /deep/.is-disabled {
      .el-textarea__inner, .el-input__inner {
        color: #606266 !important;
      }
    }
  }
</style>
