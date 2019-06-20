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
            <el-row style="margin-top:40px;margin-bottom:25px;">
              <el-pagination
                style="float:right;"
                :page-size="pageSize.size"
                layout="prev, pager, next"
                :total="total"
                @current-change="changeCurrent()"
              ></el-pagination>
            </el-row>
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
      tableHight: "100px",
      pageSize: app.pageSize,
      total: 0
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
      app.post(table.search_tableList, _this.pageSize).then(req => {
        req.result.data.forEach(element => {
          element.creationTime = moment(element.creationTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        });
        _this.downLoadList = req.result.data;
        _this.total = req.result.totalCount;
      });
    },

    /**
     * 下载表格
     */
    downList(guid,id) {
      app.getFileDetail(guid,id);
    },
    /**
     * 分页
     */
    changeCurrent(page) {
      this.pageSize.page = page;
      this.getTableList();
    }
  }
};
</script>
<style lang='less' scoped>
</style>
