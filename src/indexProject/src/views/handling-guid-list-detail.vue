<!--  -->
<template>
  <div style="width:100%;overflow:hidden;margin-bottom: 20px;">
    <div class="content">
      <!-- <el-row>
        <div id="breadcrumb" style="padding:10px 0px;">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>建设大厅</el-breadcrumb-item>
            <el-breadcrumb-item>办事指南</el-breadcrumb-item>
            <el-breadcrumb-item v-if="data" class="breadcrumb">{{data.title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-row>-->
      <el-row>
        <el-card :style="{minHeight:tableHight}">
          <el-row :gutter="10">
            <el-col :span="17" v-loading="!data" :style="{minHeight:tableHight}">
              <div style="width:100%;height:2px;"></div>
              <div v-if="data">
                <h1>{{data.title}}</h1>
                <p
                  v-if="data.creationTime"
                  style="text-align: center;color:#A3A3A3"
                >发布日期：{{data.creationTime}}</p>
                <div
                  id="contentHandel"
                  v-html="data.content"
                  style="padding:20px;margin-bottom:50px;"
                ></div>
              </div>
            </el-col>
            <el-col :span="7">
              <img style="width:100%;" src="../assets/images/办事指南详情_03.jpg" alt />
              <div style="border:1px solid #DCDCDC;padding-bottom:20px;">
                <div style="overflow:hidden;">
                  <p class="tips" style="float: left">
                    <img style="height:28px;" src="../assets/images/img_bg_bszn00.png" alt />
                    <span style="font-size:16px;">其他相关</span>
                  </p>
                </div>
                <!-- <div>
                  <p class="zhinan tip">
                    <span>其他相关</span>
                  </p>
                  img_bg_bsznr
                </div>-->
                <el-row :gutter="10" class="item" :key="index" v-for="(item,index) in allowList">
                  <router-link
                    :to="{
         path: '/handling-guid-list/detail/'+item.id, 
      
   }"
                  >
                    <el-col :span="10" class="cardList">
                      <img
                        style="width:100%;"
                        :src="allowImg[index]?allowImg[index]:allowImg[0]"
                        alt
                      />
                    </el-col>
                    <el-col :span="14" style=" position: relative;height:80px;">
                      <h4>{{item.title}}</h4>
                      <p class="itemTip">{{item.brief}}</p>
                    </el-col>
                  </router-link>
                </el-row>
              </div>
              <div style="padding-bottom:20px;border:1px solid #DCDCDC;margin-top:10px;">
                <div style="overflow:hidden;">
                  <p class="tips" style="float: left">
                    <img style="height:28px;" src="../assets/images/img_bg_bszn00.png" alt />
                    <span style="font-size:16px;">网上备案</span>
                  </p>
                </div>
                <el-row
                  :gutter="10"
                  class="item"
                  :key="index+'l'"
                  v-for="(item,index) in recordList"
                >
                  <router-link
                    :to="{
         path: '/handling-guid-list/detail/'+item.id, 
      
   }"
                  >
                    <el-col :span="10" class="cardList">
                      <img
                        style="width:100%;"
                        :src="recordImg[index]?recordImg[index]:recordImg[0]"
                        alt
                      />
                    </el-col>
                    <el-col :span="14" style=" position: relative;height:80px;">
                      <h4>{{item.title}}</h4>
                      <p class="itemTip">{{item.brief}}</p>
                    </el-col>
                  </router-link>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <div
              v-if="fileList.length>0"
              style="margin-top:20px;padding-left:30px;margin-bottom:20px;"
            >
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
          </el-row>
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script>
import { app } from "../assets/js/app";
import { handle } from "../assets/js/apiValue";
import moment from "moment";
import Vue from "vue";
export default {
  data() {
    return {
      id: "",
      downLoadUrl: app.downLoadUrl,
      fileList: [],
      tableHight: "450px",
      downLoadUrl: app.downLoadUrl,
      path: "",
      type: "",
      data: null,
      noticeId: "",
      //许可图片
      allowImg: [
        require("../assets/images/办事指南详情_16.jpg"),
        require("../assets/images/办事指南详情_10.jpg")
      ],
      //备案图片
      recordImg: [require("../assets/images/办事指南详情_18.jpg")],
      //行政许可列表
      allowList: [
        {
          title: "建设工程消防设计审查指南",
          Brief:
            "审查依据：《中华人民共和国消防法》；《建设工程消防监督管理规定》等消防法规；国家工程建设消防技术标准强制性要求。"
        },
        {
          name: "建设工程消防验收指南",
          Brief:
            "验收依据：《中华人民共和国消防法》；《建设工程消防监督管理规定》等消防法规；建设工程消防验收评定标准。"
        }
      ],
      //网上备案列表
      recordList: [
        {
          title: "建设工程竣工验收消防备案指南",
          Brief:
            " 备案依据：《中华人民共和国消防法》；《建设工程消防监督管理规定》；"
        }
      ]
    };
  },

  components: {},
  watch: {
    $route(to, from) {
      this.noticeId = this.$route.params.id;
    },
    noticeId(news) {
      this.queryData();
    }
  },
  computed: {},

  mounted() {
    this.noticeId = this.$route.params.id;
    this.queryData();
    this.initList();
    const that = this;
    setTimeout(function() {
      that.tableHight = app.clentHeight() + "px";
    }, 100);
    window.onresize = function() {
      that.tableHight = app.clentHeight() + "px";
    };
  },

  methods: {
    queryData() {
      let _this = this;
      _this.data = null;
      let params = { noticeId: this.noticeId };
      // app.pageSize.noticeId = 6;
      app.post(handle.search_handleDetail, params, "", true).then(req => {
        if (req.result.creationTime) {
          req.result.creationTime = moment(req.result.creationTime).format(
            "YYYY-MM-DD"
          );
        }
        _this.id = req.result.id;
        _this.getFileDetail(req.result.guid, req.result.id);
        _this.data = req.result;
      });
    },
    //查询办事指南列表 NoticeTypeId：1//行政许可，2//网上备案
    initList() {
      let _this = this;
      this.allowList = [];
      this.recordList = [];
      app.post(handle.search_handleList, app.pageSize).then(req => {
        req.result.data.forEach(item => {
          if (item.noticeTypeId == 1) {
            _this.allowList.push(item);
          } else if (item.noticeTypeId == 2) {
            _this.recordList.push(item);
          }
        });
      });
    },
    getFileDetail(guid, id) {
      let _this = this;
      _this.fileList = [];

      app.getFileDetail(guid, id).then(req => {
        _this.fileList = req.data;
      });
    },
    downLoadFile(req) {
      app.downLoadFile(req, this.id);
    }
  }
};
</script>
<style lang='less' scoped>
h1 {
  text-align: center;
  padding: 20px;
  color: #bd1127;
}
#contentHandel img {
  display: inline-block;
  max-width: 100%;
}
.tip {
  width: 41%;
  padding: 5px 0;
  background-size: 100%;
  color: #fff;
  text-align: center;
  font-size: 16px;
  background-repeat: no-repeat;
  background-position: center;
}
.item {
  margin-top: 20px;
  overflow: hidden;
  .itemTip {
    -position: absolute;
    margin-top: 10px;
    bottom: 0;
    right: 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 12px;
    color: #c9c9c9 !important;
  }

  .cardList {
    height: 100%;
  }
}
</style>