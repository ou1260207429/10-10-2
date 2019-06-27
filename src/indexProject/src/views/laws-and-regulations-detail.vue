<!--  -->
<template>
  <div style="width:100%;overflow:hidden;margin-bottom: 20px;">
    <div class="content">
      <el-row>
        <div id="breadcrumb" style="padding:10px 0px;">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>建设大厅</el-breadcrumb-item>
            <el-breadcrumb-item>法律法规</el-breadcrumb-item>
            <el-breadcrumb-item v-if="data" class="breadcrumb">{{data.title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-row>
      <div ref="banner">
        <img style="width:100%;" src="../assets/images/法律法规_03.jpg" alt>
      </div>
      <el-row>
        <el-card v-loading="!data" :style="{minHeight:tableHight}">
          <div v-if="data">
            <h1
              style="color:#bd1127;text-align:center;padding:20px 0;letter-spacing:3px; box-sizing: border-box;"
            >{{data.title}}</h1>
            <div class="lawContent" v-html="data.content"></div>
            <div v-if="fileList.length>0" style="width:80%;margin:20px auto">
              <p style="margin-bottom:10px;font-weight: bold;">相关文件下载</p>
              <div>
                <div
                  v-for="(item,index) in fileList"
                  :key="index"
                  style="cursor: pointer;margin-bottom:10px;font-size: 14px;"
                >
                  <i class="el-icon-link"></i>
                  <a @click="downLoadFile(item)">{{item.fileName}}</a>
                </div>
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
export default {
  data() {
    return {
      id: "",
      downLoadUrl: app.downLoadUrl,
      tableHight: "200px",
      isLoading: true,
      path: "",
      searchData: {
        regulationId: null
      },
      data: null,
      fileList: []
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.initData(this.$route.params.id);
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
    getFileDetail(guid, id) {
      let _this = this;
      _this.fileList = [];
      app.getFileDetail(guid, id).then(req => {
        _this.fileList = req.data;
      });
    },
    downLoadFile(req) {
      app.downLoadFile(req, this.id);
    },
    initData(id) {
      let _this = this;
      _this.isLoading = true;
      app.post(laws.serach_lawsDetail + "?regulationId=" + id).then(req => {
        _this.isLoading = false;
        if (req.success) {
          _this.data = req.result;
          _this.id = req.result.id;
          _this.getFileDetail(req.result.guid, req.result.id);
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
.lawContent {
  padding: 0 10px;
  width: 80%;
  margin: 20px auto;
  box-sizing: border-box;
}
</style>