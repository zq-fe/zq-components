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
          return (this.value || []).slice();
        },
        set(list) {
          this.$emit('input', list);
        }
      }
    },
    methods: {
      /**
       * 删除枚举中的一个选项
       * @param e
       * @param i
       */
      removeHandler(e, i) {
        const list = this.list.slice();
        list.splice(i, 1);
        this.list = list;
      },
      /**
       * 添加枚举项
       * @param c
       */
      addHandler(c) {
        const list = this.list.slice();
        list.push(c);
        this.list = list;
      }
    }
  }
</script>

<style scoped>

</style>
