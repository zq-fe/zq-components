<template>
  <span v-if="url">
    <audio ref="audio" style="diplay:none" @ended="isPlaying = false"></audio>
    <el-button
      :type="isPlaying?'success':'warning'"
      size="mini"
      :icon="isPlaying ? 'el-icon-video-pause' : 'el-icon-video-play'"
      circle
      @click="handlePlayPre"
      title="播放"
    />
  </span>
</template>

<script>
  /**
   * 音频 组件模板.
   * @displayName App-audio
   */
  export default {
    name: 'AppAudio',
    props: {
      /**
       * 音频播放 url
       */
      url: {
        type: String,
        required: true,
        default() {
          return ''
        }
      }
    },
    data() {
      return {
        isPlaying: false,
      }
    },
    methods: {
      handlePlayPre() {
        this.isPlaying = false;
        if (this.$refs.audio && this.$refs.audio.paused) {
          setTimeout(() => {
            this.$refs.audio.src = this.url;
            this.$refs.audio.play();
            this.isPlaying = true;
          }, 100);
        } else {
          this.$refs.audio.pause();
          this.isPlaying = false;
        }
      }
    }
  };
</script>

<style scoped>
</style>
