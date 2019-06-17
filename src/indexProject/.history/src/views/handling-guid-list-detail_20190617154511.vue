<!--  -->
<template>
  <div style="width:100%;overflow:hidden;">
    <div class="content">
      <el-row>
        <div style="padding:10px 0px;">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>建设大厅</el-breadcrumb-item>
            <el-breadcrumb-item>办事指南</el-breadcrumb-item>
            <el-breadcrumb-item class="breadcrumb">{{path}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-row>
      <el-row :gutter="10">
        <el-card :style="{position:'relative',height:contentHeight}">
          <el-col :span="16">
            <div v-if="data">
              <h1>{{data.title}}</h1>
              <p style="text-align: center;color:#A3A3A3">发布日期：{{data.creationTime}}</p>
              <div style="padding:20px;margin-bottom:50px;">{{data.content}}</div>
            </div>
            <div v-else class="noData">暂无数据</div>
          </el-col>
          <el-col :span="6">
            <img style="width:100%;" src="../assets/images/办事指南详情_03.jpg" alt>
            <div style="border:1px solid #DCDCDC;padding-bottom:20px;">
              <div>
                <p class="zhinan tip">
                  <span>其他相关</span>
                </p>
              </div>
              <el-row :gutter="10" class="item" :key="index" v-for="(item,index) in allowList">
                <router-link
                  :to="{
         path: '/handling-guid-list-detail/'+item.id, 
      
   }"
                >
                  <el-col :span="10" class="cardList">
                    <img style="width:100%;" :src="allowImg[index]" alt>
                  </el-col>
                  <el-col :span="14" style=" position: relative;height:80px;">
                    <h4>{{item.title}}</h4>
                    <p class="itemTip">{{item.Brief}}</p>
                  </el-col>
                </router-link>
              </el-row>
            </div>
            <div style="padding-bottom:20px;border:1px solid #DCDCDC">
              <div>
                <p class="zhinan tip">
                  <span>网上备案</span>
                </p>
              </div>
              <el-row class="item" :key="index+'l'" v-for="(item,index) in recordList">
                <router-link
                  :to="{
         path: '/handling-guid-list-detail/'+item.id, 
      
   }"
                >
                  <img style="float:left;" :src="recordImg[index]" alt>
                  <div style="float:left;">
                    <h4>{{item.title}}</h4>
                    <p class="itemTip">{{item.Brief}}</p>
                  </div>
                </router-link>
              </el-row>
            </div>
          </el-col>
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
      recordImg: [require("../assets/images/办事指南_09.jpg")],
      //行政许可列表
      allowList: [
        {
          title: "建设工程消防设计审核指南",
          Brief:
            "审核依据：《中华人民共和国消防法》；《建设工程消防监督管理规定》等消防法规；国家工程建设消防技术标准强制性要求。"
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
      ],
      contentHeight:app.clentHeight,
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
  },

  methods: {
    queryData() {
      let _this = this;
      _this.data = null;
      let params = { noticeId: this.noticeId };
      // app.pageSize.noticeId = 6;
      app.post(handle.search_handleDetail, params, "", true).then(req => {
        req.result.creationTime = moment(req.result.creationTime).format(
          "YYYY-MM-DD"
        );
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
    }
  }
};
</script>
<style lang='less' scoped>
h1 {
  text-align: center;
  padding: 20px;
  color: #bd1127ff;
}
.tip {
  width: 41%;
  background-size: 100%;
  color: #fff;
  text-align: center;
  font-size: 12px;
  background-repeat: no-repeat;
  background-position: center;
}
.item {
  margin-top: 20px;
  overflow: hidden;
  .itemTip {
    position: absolute;
    bottom: 0;
    right: 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 12px;
  }

  .cardList {
    height: 100%;
  }
}
</style>