<!--  -->
<template>
  <div style="width:100%;overflow:hidden;">
    <div class="content">
      <div ref="banner">
        <img style="width:100%;" src="../assets/images/表格下载_03.jpg" alt>
      </div>
      <el-row>
        <el-card v-loading="!downLoadList" :style="{minHeight:tableHight}">
          <div v-if="downLoadList.length>0">
            <div nz-row style="padding:20px">
              <div
                :key="index"
                v-for="(item,index) in downLoadList"
                class="list"
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
import { app } from "../assets/js/app";
import { laws, table } from "../assets/js/apiValue";
import moment from "moment";
export default {
  data() {
    return {
      downLoadList: [],
      tableHight: "100px"
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.getTableList();
    const that = this;
    setTimeout(function() {
      that.tableHight =
        app.clentHeight() - that.$refs.banner.offsetHeight + "px";
    },100);
    window.onresize = function() {
      that.tableHight = app.clentHeight() + "px";
    };
  },

  methods: {
    getTableList() {
      let _this = this;
      app.post(table.search_tableList, app.pageSize).then(req => {
        req.result.data.forEach(element => {
          element.creationTime = moment(element.creationTime).format(
            "YYYY-MM-DD hh:mm:ss"
          );
        });
        _this.downLoadList = req.result.data;
      });
    },
    /**
     * 下载表格
     */
    downList() {}
  }
};
</script>
<style lang='less' scoped>
</style>
