<!--  -->
<template>
  <div style="width:100%;overflow:hidden;margin-bottom: 20px;">
    <div class="content">
      <div ref="banner">
        <img style="width:100%;" src="../assets/images/表格下载_03.jpg" alt>
      </div>
      <el-row>
        <el-card v-loading="!downLoadList" :style="{minHeight:tableHight}">
          <div v-if="downLoadList">
            <div nz-row style="padding:20px">
              <div
                :key="index"
                v-for="(item,index) in downLoadList"
                class="list"
                @click="downList(item.guid,item.id)"
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
      downLoadList: null,
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
    }, 100);
    window.onresize = function() {
      that.tableHight = app.clentHeight() + "px";
    };
  },

  methods: {
    getTableList() {
      let _this = this;
      this.downLoadList = null;
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
    downList(sourceId, id) {
      let data = {
        appId: "9F947774-8CB4-4504-B441-2B9AAEEAF450",
        module: "table",
        sourceId: sourceId
      };
      app.downList(table.downLoadList, "POST", data).then(req => {
        if (req == "success") {
          ///计算下载次数
          app
            .post(table.compute_downLoad, { attachmentId: id })
            .then(result => {
              console.log(result);
            });
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
</style>
