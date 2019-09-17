<template>
  <div class="app-table-column-cell">
    <!--  图片类型 -->
    <image-item v-if="type === 'image'" :url="url" :record="record" :column="column" />
    <!--  图片类型 -->
    <link-item v-if="type ==='link'" :url="url" :record="record" :column="column" />
    <!--  图片类型 -->
    <text-item v-if="type === 'text'" :url="url" :record="record" :column="column" />
    <!--  图片类型 -->
    <audio-item v-if="type === 'audio'" :url="url" :record="record" :column="column" />
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
    url() {
      const record = this.record;
      const column = this.column;
      const { getUrl, name } = column;
      const text = record[name];
      if (getUrl) {
        return getUrl(text, record, column);
      }
      return text + '';
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
