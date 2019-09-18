<template>
  <div class="x-tag-select">
    <el-tag
      v-for="item in options"
      :key="item[valueKey]"
      :type="item[valueKey] === value ? 'success' : ''"
      :effect="item[valueKey] === value ? 'dark' : 'light'"
      class="x-tag-item"
      @click="selectTag(item[valueKey])"
    >
      {{ item[labelKey] }}
    </el-tag>
  </div>
</template>
<script>
export default {
  name: 'TagSelect',
  props: {
    options: {
      type: Array,
      default: function() {
        return []
      }
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    value: {
      type: [String, Number],
      default: undefined
    }
  },
  data() {
    return {
      myValue: this.value
    }
  },
  methods: {
    selectTag(value) {
      this.$emit('input', value)
    }
  }
}
</script>
<style lang="scss" scoped>
  .x-tag-select {
    .x-tag-item {
      margin-right: 10px;
      margin-bottom: 10px;
      cursor: pointer;
    }
  }
</style>
