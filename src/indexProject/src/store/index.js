import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    showVideo: false
  },
  //改变state中的count数据、
  mutations: {
    increment(state, value) { //调用     this.$store.commit("increment");
      state.showVideo = value;
    }
  }
})
