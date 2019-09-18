<template>
  <el-form :model="query" :ref="formName" class="app-table-search">
    <app-form-item
      v-for="(field, index) in fields"
      :showLabel="false"
      :key="`form-item${ index }`"
      v-model.trim="query[field.name]"
      :field="field"
      class="app-form-item"
    />
    <slot name="formItem" />
    <div class="app-form-button">
      <slot name="button" />
    </div>
  </el-form>
</template>
<script>
export default {
  name: 'AppTableSearch',
  props: {
    fields: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: Object,
      default() {
        return {}
      }
    },
    showButton: {
      type: Boolean,
      default() {
        return false
      }
    },
    formName: {
      type: String
    },
    type: {
      type: String

    }

  },
  data() {
    return {
      // rules: []
    }
  },
  computed: {
    query: {
      set(params) {
        this.$emit('input', { ...params })
      },
      get() {
        return this.value
      }
    },
    rules() {
      const fields = this.fields
      const rules = {}
      fields.forEach((v, i) => {
        if (v.required) {
          const name = v.name
          rules[name] = [
            {
              required: true,
              message: '请输入' + v.label
            }
          ]
        }
      })
      return rules
    }
  }
}
</script>
<style lang="scss" scoped>
  .app-table-search {
    display: flex;
    flex-wrap: wrap;
    .app-form-item, .app-form-button {
      padding-right: 20px;
      margin-bottom: 11px;
    }
  }
</style>

