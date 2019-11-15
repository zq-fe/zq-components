<template>
  <app-audio :url="urls.length && urls[0].url" />
</template>

<script>
import Mixins from "../mixins";
export default {
  name: "ColumnCellAudio",
  mixins: [Mixins]
};
</script>

<style scoped>
</style>
