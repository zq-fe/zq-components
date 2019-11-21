<template>
  <div class="app-table-column-cell">
    <!--  图片类型 -->
    <image-item v-if="type === 'image'" :record="record" :column="column" />
    <!--  链接类型 -->
    <link-item v-if="type ==='link'" :urls="urls" :record="record" :column="column" />
    <!--  文本类型 -->
    <text-item v-if="type === 'text'" :record="record" :column="column" />
    <!--  音频类型 -->
    <audio-item v-if="type === 'audio'" :urls="urls" :record="record" :column="column" />
    <!-- 插槽 -->
    <slot :name="column.name" :row="record"/>
  </div>
</template>

<script>
  import ImageItem from './items/Image';
  import TextItem from './items/Text';
  import LinkItem from './items/Link';
  import AudioItem from './items/Audio';
  export default {
    name: 'AppTableColumnCell',
    components: {
      ImageItem,
      TextItem,
      LinkItem,
      AudioItem
    },
    props: {
      column: {
        type: Object,
        required: true,
        default() {
          return {
            type: 'text'
          };
        }
      },
      record: {
        type: Object,
        required: true,
        default() {
          return {}
        }
      }
    },
    computed: {
      type() {
        return this.column.type || 'text';
      },
      urls() {
        const record = this.record;
        const column = this.column;
        const { getUrl, name } = column;
        const text = record[name];
        if (getUrl) {
          const urlConfig = getUrl(text, record, column);
          return typeof urlConfig === 'string' ? [{ url: urlConfig }] : urlConfig;
        }
        return [{url: text, text}];
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
