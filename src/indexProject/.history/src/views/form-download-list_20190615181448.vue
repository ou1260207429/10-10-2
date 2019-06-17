<!--  -->
<template>
  <div style="width:100%;overflow:hidden;">
    <div class="content">
      <el-row>
        <img src="../assets/images/表格下载_03.jpg" alt="">
      </el-row>
      <el-row>
        <el-card>
           <div v-if="!lawsList" style="text-align: center;line-height: 30px;font-size: 30px">暂无数据</div>
            <div v-if="lawsList">
              <div nz-row style="padding:20px">
                <div
                  :key="index"
                  v-for="(item,index) in lawsList"
                  style="background-color:#f7f7f7;padding:5px 30px;margin-bottom: 10px;cursor: pointer;"
                >{{ item.title }}</div>
              </div>
              <div style="position: absolute;bottom: 0;left: 0;">
                <p class="more">
                  <span>更多 ></span>
                </p>
              </div>
            </div>
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
};
</script>
<style lang='less' scoped>
</style>
