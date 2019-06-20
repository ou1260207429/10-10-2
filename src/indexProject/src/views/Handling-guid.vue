<!--  -->
<template>
  <div style="width:100%;overflow:hidden;margin-bottom: 20px;">
    <div class="content">
      <el-row :gutter="16">
        <el-col :span="12">
          <el-card :style="{minHeight:tableHight,paddingBottom:'20px'}">
            <div style="overflow:hidden;">
              <p class="tips" style="float: left">
                <img src="../assets/images/img_bg_bszn.png" alt>
                <span>行政许可</span>
              </p>
            </div>
            <ul style="margin-top: 30px;padding-left: 0">
              <li :key="index" v-for="(item,index) in allowList">
                <el-row :gutter="16">
                  <el-col :span="10">
                    <div ref="imgHeight">
                      <img style="width:100%;" :src="allowImg[index]?allowImg[index]:allowImg[0]" alt>
                    </div>
                  </el-col>
                  <el-col :span="14">
                    <div ref="routHeight">
                      <p class="title">{{item.title}}</p>
                      <div class="tip" v-html="item.brief"></div>
                    </div>
                  </el-col>

                  <p class="detail">
                    <router-link
                      :to="{
         path: '/handling-guid-list/detail/'+item.id, 
      
   }"
                    >了解详情</router-link>
                  </p>
                </el-row>
              </li>
            </ul>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card :style="{minHeight:tableHight,paddingBottom:'20px'}">
            <div style="overflow:hidden;">
              <p class="tips" style="float: right">
                <img src="../assets/images/img_bg_bsznr.png" alt>
                <span>网上备案</span>
              </p>
            </div>
            <ul style="margin-top: 10px;padding-left: 0">
              <li :key="index" v-for="(item,index) in recordList">
                <el-row :gutter="16">
                  <el-col :span="10">
                    <div ref="imgHeight">
                      <img style="width:100%;" :src="recordImg[index]?recordImg[index]:recordImg[0]" alt>
                    </div>
                  </el-col>
                  <el-col :span="14">
                    <div ref="routHeight" style="position:relative">
                      <p class="title">{{item.title}}</p>
                      <div class="tip" v-html="item.brief"></div>
                    </div>
                  </el-col>
                  <p class="detail">
                    <router-link
                      :to="{
         path: '/handling-guid-list/detail/'+item.id, 
      
   }"
                    >了解详情</router-link>
                  </p>
                </el-row>
              </li>
            </ul>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { app } from "../assets/js/app";
import { handle } from "../assets/js/apiValue";
export default {
  data() {
    return {
      //许可图片
      allowImg: [
        require("../assets/images/办事指南_03.jpg"),
        require("../assets/images/办事指南_14.jpg")
      ],
      //备案图片
      recordImg: [require("../assets/images/办事指南_09.jpg")],
      //行政许可列表
      allowList: [
        {
          title: "建设工程消防设计审核指南",
          brief:
            "审核依据：《中华人民共和国消防法》；《建设工程消防监督管理规定》等消防法规；国家工程建设消防技术标准强制性要求。",
          src: ""
        },
        {
          title: "建设工程消防验收指南",
          brief:
            "验收依据：《中华人民共和国消防法》；《建设工程消防监督管理规定》等消防法规；建设工程消防验收评定标准。",
          src: ""
        }
      ],
      //网上备案列表
      recordList: [
        {
          title: "建设工程竣工验收消防备案指南",
          brief:
            " 备案依据：《中华人民共和国消防法》；《建设工程消防监督管理规定》；",
          src: ""
        }
      ],
      tableHight: "450px"
    };
  },

  mounted() {
    const that = this;
    this.initList();
    setTimeout(function() {
      that.tableHight = app.clentHeight() + "px";
      that.$refs.imgHeight.forEach((item, index) => {
        that.$refs.routHeight[index].clentHeight = item.offsetHeight + 30;
      });
    }, 100);
    window.onresize = function() {
      that.tableHight = app.clentHeight() + "px";
      that.tableHight = app.clentHeight() + "px";
      that.$refs.imgHeight.forEach((item, index) => {
        that.$refs.routHeight[index].clentHeight = item.offsetHeight + 30;
        console.log(that.$refs.routHeight[index].clentHeight);
        console.log(item.offsetHeight);
      });
    };
  },

  methods: {
    //查询办事指南列表 NoticeTypeId：1//行政许可，2//网上备案
    initList() {
      let _this = this;
      this.allowList = [];
      this.recordList = [];
      app.post(handle.search_handleList, app.pageSize).then(req => {
        req.result.data.forEach(item => {
          item.brief = item.brief.replace(/<[^>]+>|&[^>]+;/g, "").trim();
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
li {
  margin-top: 30px;
  overflow: hidden;
  .img {
    min-width: 260px;
    float: left;
    margin-right: 16px;
  }
  a {
    display: block;
    position: relative;
    float: left;
    height: 138px;
    min-width: 250px;
  }
}
.title {
  font-size: 20px;
  margin-bottom: 9px;
  font-weight: bold;
}
.tip {
  width: 100%;
  padding: 5px 0;
  background-repeat: no-repeat;
  background-position: left;
  color: #c9c9c9 !important;
  font-size: 14px !important;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  padding-right: 8px;
  box-sizing: border-box;
}
.detail {
  width: 125px;
  text-indent: 8%;
  line-height: 25px;
  position: absolute;
  left: 10px;
  bottom: 3px;
  margin-left: 41.66667%;
  background: url("/../../assets/images/办事指南_08.png") no-repeat;
  background-size: 100%;
  font-size: 8px !important;
  color: #fff;
  cursor: pointer;
  a {
    width: 100%;
    height: auto;
    color: #fff;
  }
}
</style>