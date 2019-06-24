<!--  -->
<template>
  <div style="width:100%;overflow:hidden;margin-bottom: 20px;">
    <div class="content">
      <div ref="banner">
        <img style="width:100%;" src="../assets/images/法律法规_03.jpg" alt>
      </div>
      <el-row :gutter="16">
        <el-col :span="12">
          <el-card v-loading="!lawsList" :style="{minHeight:tableHight}">
            <div style="overflow:hidden;">
              <p class="tips" style="float: left">
                <img src="../assets/images/img_bg_flfg.png" alt>
                <span>法律法规</span>
              </p>
            </div>
            <ul class="listParent">
              <li v-for="(item,index) in lawsList" :key="index" class="list">
                <router-link :to="'/laws-and-regulations/detail/'+item.id">
                  <div style="overflow: hidden">
                    <span class="title">{{item.title}}</span>
                    <span class="time">{{item.creationTime}}</span>
                  </div>
                  <div style="overflow: hidden;margin-top: 6px;">
                    <span style="float: right;font-size: 12px">————&nbsp;{{item.issueOrg}}</span>
                  </div>
                </router-link>
              </li>
            </ul>
            <el-row style="margin-top:40px;margin-bottom:25px;">
              <el-pagination
                style="float:right;"
                :page-size="lawPageSize.size"
                layout="prev, pager, next"
                :total="lawtotalCount"
                @current-change="changeCurrent($event,'Regulation')"
              ></el-pagination>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card v-loading="!lawsFiles" :style="{minHeight:tableHight}">
            <div style="overflow:hidden;">
              <p class="tips" style="float: right">
                <img src="../assets/images/法律法规_03.png" alt>
                <span>规范性文件</span>
              </p>
            </div>
            <ul class="listParent">
              <li v-for="(item,index) in lawsFiles" :key="index" class="list">
                <router-link :to="'/laws-and-regulations/detail/'+item.id">
                  <div style="overflow: hidden">
                    <span class="title">{{item.title}}</span>
                    <span class="time">{{item.creationTime}}</span>
                  </div>
                  <div style="overflow: hidden;margin-top: 6px;">
                    <span style="float: right;font-size: 12px">————&nbsp;{{item.issueOrg}}</span>
                  </div>
                </router-link>
              </li>
            </ul>
            <el-row style="margin-top:40px;margin-bottom:25px;">
              <el-pagination
                style="float:right;"
                :page-size="filePageSize.size"
                layout="prev, pager, next"
                :total="filetotalCount"
                @current-change="changeCurrent($event,'Normative')"
              ></el-pagination>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { app } from "../assets/js/app";
import { laws } from "../assets/js/apiValue";
import moment from "moment";
export default {
  data() {
    return {
      lawsList: null,
      lawsFiles: null,
      tableHight: "200px",
      lawPageSize: { size: 10, page: 1, isAsc: true },
      filePageSize: { size: 10, page: 1, isAsc: true },
      lawtotalCount: 0,
      filetotalCount: 0
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.getlawsList();
    this.getFileList();
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
    //获取法律法规文件
    getlawsList() {
      let _this = this;
      _this.lawsList = [];
      let lawParams = Object.assign({ group: "Regulation" }, this.lawPageSize);
      app.post(laws.serach_lawsList, lawParams).then(req => {
        if (req.success) {
          req.result.data.forEach(element => {
            if (element.creationTime) {
              element.creationTime = moment(element.creationTime).format(
                "YYYY-MM-DD hh:mm:ss"
              );
            }
          });
          _this.lawsList = req.result.data;

          _this.lawtotalCount = req.result.totalCount;
        }
      });
    },
    /**
     *
     * 获取规范性文件
     */
    getFileList() {
      let _this = this;
      _this.lawsFiles = [];
      let fileParams = Object.assign({ group: "Normative" }, this.filePageSize);
      app.post(laws.serach_lawsList, fileParams).then(req => {
        if (req.success) {
          req.result.data.forEach(element => {
            if (element.creationTime) {
              element.creationTime = moment(element.creationTime).format(
                "YYYY-MM-DD hh:mm:ss"
              );
            }
          });
          _this.lawsFiles = req.result.data;
          _this.filetotalCount = req.result.totalCount;
        }
      });
    },
    changeCurrent(page, type) {
      if (type == "Regulation") {
        this.lawPageSize.page = page;
        this.getlawsList();
      } else if (type == "Normative") {
        this.filePageSize.page = page;
        this.getFileList();
      }
    }
  }
};
</script>
<style lang='less' scoped>
.title {
  float: left;
}
.time {
  float: right;
}
.tip {
  width: 32%;
  padding: 5px 0;
  text-indent: 20%;
  background-repeat: no-repeat;
  background-position: left;
  font-size: 22px;
  color: #fff;
}
</style>
