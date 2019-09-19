<template>
  <el-form-item v-if="field.display !== false" :style="{ ...field.style }" :prop="fieldItem.name" :label="showLabel ? fieldItem.label : ''">
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
    <el-select
      v-if="fieldItem.type == 'select'"
      v-model.number="inputValue"
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
    <el-input
      v-if="fieldItem.type == 'text'"
      v-model="inputValue"
      :disabled="fieldItem.disabled"
      :placeholder="fieldItem.placeholder"
      class="input"
    />
    <el-input
      v-if="fieldItem.type == 'number'"
      v-model.number="inputValue"
      :rows="fieldItem.rows"
      :disabled="fieldItem.disabled"
      :placeholder="fieldItem.placeholder"
      class="input"
    />
    <el-input
      v-if="fieldItem.type == 'textarea'"
      v-model="inputValue"
      :rows="fieldItem.rows"
      :disabled="fieldItem.disabled"
      :placeholder="fieldItem.placeholder"
      type="textarea"
      class="input"
    />
    <tag
      v-if="fieldItem.type == 'tag'"
      :options="inputValue || []"
      :label-key="fieldItem.label"
      :value-key="fieldItem.value"
    />
    <tag-select
      v-if="fieldItem.type == 'tag-select'"
      v-model="inputValue"
      :options="fieldItem.data"
      :label-key="fieldItem.labelKey"
      :value-key="fieldItem.valueKey"
    />
    <audio
      v-if="fieldItem.type == 'audio'"
      :src="inputValue"
      controlsList="nodownload"
      controls
      autoplay
    />
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
    <image-upload
      v-if="fieldItem.type === 'image-upload'"
      v-model="inputValue"
      :suffix="['jpg', 'png', 'jpeg']"
      :multiple="fieldItem.multiple"
      class="app-audio-upload"
    />
    <audio-upload
      v-if="fieldItem.type === 'audio-upload'"
      v-model="inputValue"
      :suffix="field.suffix"
      :disabled="field.disabled"
      class="zq-upload"
    />
    <el-switch
      v-if="fieldItem.type === 'switch'"
      v-model="inputValue"
    />

  </el-form-item>
</template>
<script>
import Tag from './tag/index';
import TagSelect from './tag-select/index';
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
    ImageUpload
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
      type: [String, Boolean],
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
    }
  },
  computed: {
    inputValue: {
      get() {
        const field = this.field;
        const { type, get } = field;
        if (type === 'text' || type === 'textarea') {
          return this.value && this.value.toString();
        }
        // 定制 get 方法，特殊字段处理
        if (get) {
          return get(this.value);
        }
        // 单选框 初始化值为 []
        if (field.type === 'checkbox-group-single') {
          return this.value || [];
        }
        return this.value;
      },
      set(value) {
        const field = this.field;
        const format = field.format;
        const set = field.set;
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
    fieldItem() {
      const field = { ...this.field };
      // 支持在 ipt 直接配置 disabled
      if (typeof (this.disabled) === 'boolean') {
        field.disabled = this.disabled;
      }
      field.placeholder = field.placeholder || field.label;
      return field;
    }
  },
  created() {
    this.initDataList();
  },
  methods: {
    initDataList() {
      const field = this.field;
      const { url, label, value, params } = field.data || {};
      if (url) {
        this.request({
          url,
          params
        }).then(res => {
          const dataList = res.data.items;
          this.field.data = dataList.map(o => {
            return {
              label: o[label],
              value: o[value]
            }
          });
        });
      }
    },
    singleHandler(val) {
      if (val && val.length > 1) {
        const length = val.length
        const newVal = val.slice(length - 1, length);
        this.inputValue = newVal
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .x-ipt {
  }
</style>
