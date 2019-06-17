<!--  -->
<template>
  <div style="width:100%;overflow:hidden;">
    <div class="content">
      <el-row>
        <img style="width:100%;" src="../assets/images/表格下载_03.jpg" alt>
      </el-row>
      <el-row>
        <el-card style="height:400px;">
          <div v-if="!lawsList" style="text-align: center;line-height: 30px;font-size: 30px">暂无数据</div>
          <div v-if="lawsList">
            <div nz-row style="padding:20px">
              <div
                :key="index"
                v-for="(item,index) in tableList"
                style="background-color:#f7f7f7;padding:5px 30px;margin-bottom: 10px;cursor: pointer;"
              >
                {{ item.attachmentName }}
                <span style="float: right">{{ item.creationTime }}</span>
              </div>
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
    return { tableList: [] };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
};
</script>
<style lang='less' scoped>
</style>
