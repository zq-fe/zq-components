<template>
  <div class="enum-manage">
    <enum-list :list="list" @remove="removeHandler"/>
    <enum-item @add="addHandler" />
  </div>
</template>

<script>
  import EnumList from './List';
  import EnumItem from './Item';
  export default {
    name: 'EnumIndex',
    components: {
      EnumList,
      EnumItem
    },
    props: {
      value: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    computed: {
      list: {
        get() {
          return this.value;
        },
        set(list) {
          debugger;
          this.$emit('input', list);
        }
      }
    },
    data() {
      return {
        list: []
      }
    },
    methods: {
      /**
       * 删除枚举中的一个选项
       * @param e
       * @param i
       */
      removeHandler(e, i) {
        this.list.splice(i, 1);
      },
      /**
       * 添加枚举项
       * @param c
       */
      addHandler(c) {
        this.list.push(c);
      }
    }
  }
</script>

<style scoped>

</style>
