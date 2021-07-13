<template>
  <el-dialog
    :visible.sync="showForm"
    width="576px"
    class="x-form"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    v-if="showForm"
    :before-close="handleClose"
    @close="$emit('close')"
  >
    <el-form :model="query" :rules="rules" :ref="name" label-width="100px">
      <div class="form-item" v-for="(field, index) in fields" :key="`form-item${ index }`" >
        <!-- @slot 对于特定form 控件，需要特定添加，需要特定位置时，需要在表单项中添加占位，type 为slot -->
        <slot v-if="field.type === 'slot'" :name="field.name" />
        <app-form-item v-bind="$attrs" :showLabel="true" v-model="query[field.name]" :field="field" v-else/>
      </div>
      <!-- @slot 添加整个表单项, 可以使用elementui 表单项 -->
      <slot name="formItem" />
    </el-form>
    <div class="form-footer" slot="footer">
      <slot name="button" />
      <el-button type="primary" v-if="showCancelBtn.btnShow" @click="cancelHandler">{{showCancelBtn.btnText}}</el-button>
      <el-button type="primary" v-if="showSubmitBtn.btnShow" @click="submitHandler" :loading="loading">{{showSubmitBtn.btnText}}</el-button>
    </div>
  </el-dialog>
</template>
<script>

/**
 * form 组件模板.
 * @displayName App-Form
 */
export default {
  name: 'AppForm',
  props: {
    /**
     * 控制显示
     */
    show: {
      type: Boolean,
      required: true,
      default() {
        return false
      }
    },
    /**
     *  form表单项配置
     */
    form: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    },
    /**
     * 表单值
     */
    value: {
      type: Object,
      required: true,
      default() {
        return {};
      }
    },
    /**
     * 表单名称
     */
    name: {
      type: String,
      required: false,
      default() {
        return 'form' + Date.now();
      }
    },
     /**
     * 是否显示操按
     */
    showSubmitBtn:{
      type: Object,
      required: false,
      default() {
        return {
         btnShow:true,
          btnText:"提交"
        }
      }
    },
    showCancelBtn:{
      type: Object,
      required: false,
      default() {
        return {
          btnShow:true,
          btnText:"取消"
        }
      }
    },
  },
  data() {
    return {
      // rules: [],
      loading: false
    }
  },
  
  computed: {
    query: {
      set(params) {
        /**
         * form 提交表单值
         * @type {object}
         */
        this.$emit('input', { ...params })
      },
      get() {
        return this.value;
      }
    },
    rules() {
      const fields = this.fields;
      const rules = {};
      fields.forEach((v, i) => {
        const required = v.required;
        if (required) {
          const name = v.name;
          rules[name] = [
            {
              required: typeof required === 'boolean' ? required : required(),
              message: '请输入' + v.label
            }
          ]
        }
      });
      return rules;
    },
    showForm: {
      get() { 
        console.log(1)
        return this.show;
      },
      set(val) {
        this.$emit('update:show', val);
      }
    },
    fields() {
      return this.form.fields;
    }
  },
  methods: {
    /**
     * 表单提交，触发 submit
     */
    submitHandler() {
      const formName = this.name;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitForm({ ...this.query });
        } else {
          return false
        }
      })
    },
    /**
     * 提交 form 表单数据
     */
    submitForm(data) {
      const form = this.form;
      const url = form.url;
      const method = form.method || 'post';
      this.loading = true;
      let config
      if (method === 'post' || method === 'put') {
        config = {
          url,
          method,
          data
        }
      } else {
        config = {
          url,
          method,
          params: data
        }
      }
      this.request(config).then((res) => {
        this.loading = false;
        this.closeHandler();
        /**
         * form 提交后回调
         * @arguments {object}
         * @type {object}
         */
        this.$emit('done', { ...data }, this.name);
      }).catch(e => {
        this.loading = false;
        this.$emit('done', e, this.name);
      });
    },
    /**
     * 关闭 form
     */
    closeHandler() {
      this.showForm = false;
      this.resetData();
    },
    /**
     * 取消表单，触发 cancel
     */
    cancelHandler() {
      this.closeHandler();
      /**
       * form 弹窗取消回调
       * @type {object}
       */
      this.$emit('cancel', this.name);
    },
    /**
     * 关闭时，value 设置为空 TODO: 待优化，关闭时表单清除还原
     * @param done
     */
    handleClose(done) {
      this.resetData();
      done();
    },
    /**
     * 重置数据
     */
    resetData() {
      this.query = {};
    }
  }
}
</script>
<style lang="scss" scoped>
  .x-form {
    display: flex;
    flex-direction: column;
    .form-footer {
      text-align: center;
    }
  }
</style>
