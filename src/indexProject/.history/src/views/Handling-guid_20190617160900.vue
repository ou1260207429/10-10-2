<!--  -->
<template>
  <div style="width:100%;overflow:hidden;">
    <div class="content">
      <el-row :gutter="16">
        <el-col :span="12">
          <el-card style="min-height:640px;">
            <div>
              <p class="zhinan tip">
                <span>行政许可</span>
              </p>
            </div>
            <ul style="margin-top: 30px;padding-left: 0">
              <li :key="index" v-for="(item,index) in allowList">
                <img style="float:left;margin-right:16px;" :src="allowImg[index]" alt>
                <router-link
                  :to="{
         path: '/handling-guid-list-detail/'+item.id, 
      
   }"
                >
                  <p class="title">{{item.title}}</p>
                  <p class="tip">{{item.Brief}}</p>
                  <p class="detail">了解详情</p>
                </router-link>
              </li>
            </ul>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card style="min-height:640px;">
            <div style="overflow:hidden">
              <p class="info tip" style="float: right">
                <span>网上备案</span>
              </p>
            </div>
            <ul style="margin-top: 10px;padding-left: 0">
              <li :key="index" v-for="(item,index) in recordList">
                    <img style="float:left;margin-right:16px;" :src="recordImg[index]" alt>
                    <router-link
                      :to="{
         path: '/handling-guid-list-detail/'+item.id, 
      
   }"
                    >
                      <p class="title">{{item.title}}</p>
                      <p class="tip">{{item.Brief}}</p>
                      <p class="detail">了解详情</p>
                    </router-link>
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
          Brief:
            "审核依据：《中华人民共和国消防法》；《建设工程消防监督管理规定》等消防法规；国家工程建设消防技术标准强制性要求。"
        },
        {
          title: "建设工程消防验收指南",
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

  mounted() {
    this.initList();
  },

  methods: {
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
li {
  margin-top: 30px;
  overflow: hidden;
  a{
    display: block;
  position: relative;
  float: left;
    height: 138px;
  }
}
.title {
  font-size: 20px;
  margin-bottom: 9px;
  font-weight: bold;
}
.tip {
  color: #c9c9c9;
  font-size: 15px;
}
.tip{
  width: 40%;
  padding: 10px 0;
  text-align: center;
  background-repeat: no-repeat;
  background-position: left;
}
.detail {
  width: 63%;
  text-indent: 8%;
  line-height: 25px;
  position: absolute;
  left: 10px;
  bottom: 0;
  background: url("/../../assets/images/办事指南_08.png") no-repeat;
  font-size: 8px !important;
  color: #fff;
}
</style>