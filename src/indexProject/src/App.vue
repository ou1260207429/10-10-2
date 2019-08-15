<template>
  <div id="app">
    <router-view />
    <div v-if="showVideo" class="videoWrap">
      <div class="video">
        <video style="width:100%;" :src="ApiUrl" controls="controls" autoplay="autoplay"></video>
        <span @click="closeVideo" title="关闭">X</span>
      </div>
    </div>
  </div>
</template>

<script>
import { app } from "./assets/js/app";

export default {
  name: "App",
  data() {
    return {
      ApiUrl: "",
      showVideo: false
    };
  },
  watch: {
    "$store.state.showVideo": function(newFlag, oldFlag) {
      this.showVideo = newFlag;
      // 需要执行的代码
    }
  },
  mounted() {
    this.ApiUrl = app.ApiUrl() + "广西住建厅.mp4";

    this.showVideo = this.$store.state.showVideo;
  },
  methods: {
    closeVideo() {
      this.showVideo = false;
      this.$store.commit("increment", false);
    }
  }
};
</script>

<style>
.videoWrap {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  left: 0;
  top: 0;
}
.videoWrap span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  position: absolute;
  right: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  z-index: 9999;
  border-radius: 35px;
  font-size: 20px;
  cursor: pointer;
}
.video {
  width: 60%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  background-color: #f0f2f5;
  width: 100%;
  height: 100vh;
  min-width: 1420px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
