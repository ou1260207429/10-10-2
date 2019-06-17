<!--  -->
<template>
  <div style="width:100%;overflow:hidden;">
    <div class="content">
      <el-row :gutter="16">
        <el-col :span="12">
          <div class="comeIn">消防设计审查和验收办事入口</div>
          <el-card style="min-height:270px;">
            <div>
              <p id="tip" class="zhinan">
                <span>办事指南</span>
              </p>
            </div>
            <el-row :gutter="50" style="padding:20px 40px;">
              <el-col
                class="item"
                :span="8"
                :key="index"
                v-for="(item,index) in handleList"
                @click="getNoticeDetail('handle',item.type,item.name)"
              >
                <router-link
                  :to="{
         path: '/handling-guid-list-detail/'+item.id, 
      
   }"
                >
                  <div class="cardList">
                    <img :src="item.src" alt>
                  </div>
                </router-link>
                <div>{{item.title}}</div>
              </el-col>
            </el-row>
          </el-card>
          <el-card nz-card style="margin-top:8px; position: relative;">
            <div>
              <p id="tip" class="fagui">
                <span>法律法规</span>
              </p>
            </div>

            <div v-if="!lawsList" class="noData">暂无数据</div>
            <div v-if="lawsList">
              <div class="listParent">
                <div :key="index" v-for="(item,index) in lawsList" class="list">
                  <router-link :to="'/laws-and-regulations-detail/'+item.id">{{ item.title }}</router-link>
                </div>
              </div>
              <div style="position: absolute;bottom: 0;left: 0;">
                <p class="more">
                  <span>更多 ></span>
                </p>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card style="min-height: 301px; position: relative;">
            <div style="overflow:hidden">
              <p id="tip" class="info" style="float: right">
                <span>公告消息</span>
              </p>
            </div>
            <el-row :gutter="50" style="padding:20px 40px;">
              <el-col class="item" :span="8" :key="index" v-for="(item,index) in infoList">
                <router-link :to="'/announcement-information/'+item.type">
                  <div class="cardList">
                    <img :src="infoImg[index]" alt>
                  </div>
                </router-link>
                  <div>{{item.name}}</div>
              </el-col>
            </el-row>
            <div style="position: absolute;bottom: 0;left: 0;">
              <p class="more">
                <span>更多 ></span>
              </p>
            </div>
          </el-card>
          <el-card nz-card style="margin-top:8px; position: relative;">
            <div style="overflow:hidden">
              <p id="tip" class="tablein" style="float: right">
                <span>表格下载</span>
              </p>
            </div>
            <div v-if="!lawsList" class="noData">暂无数据</div>
            <div v-if="lawsList">
              <div nz-row style="padding:20px">
                <div :key="index" v-for="(item,index) in tableList" class="list">
                  {{ item.attachmentName }}
                  <span style="float: right">{{ item.creationTime }}</span>
                </div>
              </div>
            </div>
            <div style="position: absolute;bottom: 0;left: 0;">
              <p class="more">
                <span>更多 ></span>
              </p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { app } from "../assets/js/app";
import { laws, table, handle } from "../assets/js/apiValue";
import moment from "moment";
export default {
  data() {
    return {
      lawsList: [],
      tableList: [],
      handleImg: [
        require("../assets/images/img_zn_sjsc.png"),
        require("../assets/images/img_zn_xfys.png"),
        require("../assets/images/img_zn_jgys.png")
      ],
      handleList: [
        // {
        //   type: "Audit",
        //   name: "建设工程消防设计审核指南",
        //   src: require("../assets/images/img_zn_sjsc.png")
        // },
        // {
        //   type: "Acceptance",
        //   src: require("../assets/images/img_zn_xfys.png"),

        //   name: "建设工程消防验收指南"
        // },
        // {
        //   type: "Record",
        //   name: "建设工程竣工验收消防备案指南",
        //   src: require("../assets/images/img_zn_jgys.png")
        // }
      ],
      infoImg:[require("../assets/images/img_xx_sjsc.png"),require("../assets/images/img_xx_xfys.png"), require("../assets/images/img_xx_jgys.png")],
      infoList: [
        {
          type: "1",
          name: "建设工程消防设计审查公告",
          src: require("../assets/images/img_xx_sjsc.png")
        },
        {
          type: "2",
          src: require("../assets/images/img_xx_xfys.png"),
          name: " 建设工程消防验收公告"
        },
        {
          type: "3",
          name: "建设工程竣工验收消防备案公告",
          src: require("../assets/images/img_xx_jgys.png")
        }
      ]
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.getlawsList();
    this.getTableList();
    this.initHandleList();
  },

  methods: {
    getlawsList() {
      let _this = this;
      app.post(laws.serach_lawsList, app.pageSize).then(req => {
        _this.lawsList = req.result.data;
        console.log(req);
      });
    },
    getTableList() {
      let _this = this;
      app.post(table.search_tableList, app.pageSize).then(req => {
        req.result.data.forEach(element => {
          element.creationTime = moment(element.creationTime).format(
            "YYYY-MM-DD hh:mm:ss"
          );
        });
        _this.tableList = req.result.data;
      });
    },
    //查询办事指南列表 NoticeTypeId：1//行政许可，2//网上备案
    initHandleList() {
      let _this = this;
      this.allowList = [];
      this.recordList = [];
      app.post(handle.search_handleList, app.pageSize).then(req => {
        req.result.data.forEach(item => {
          if (item.title.indexOf("设计") != -1) {
            item.src = _this.handleImg[0];
            item.srcIndex = 1;
          } else if (item.title.indexOf("竣工") != -1) {
            item.src = _this.handleImg[2];
            item.srcIndex = 3;
          } else {
            item.src = _this.handleImg[1];
            item.srcIndex = 2;
          }
        });
        _this.handleList = app.sortByKey(req.result.data, "srcIndex");
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
<style  lang='less' scoped>
.zhinan {
  background-image: url("../assets/images/img_bg_bszn.png");
}
.fagui {
  background-image: url("../assets/images/img_bg_flfg.png");
}
.info {
  background-image: url("../assets/images/img_bg_ggxx.png");
}
.tablein {
  background-image: url("../assets/images/img_bgxz.png");
}
.comeIn {
  width: 100%;
  height: 160px;
  line-height: 160px;
  font-size: 28px;
  color: #fff;
  letter-spacing: 4px;
  text-align: center;
  background: url("../assets/images/img_bg_bsrk.png") no-repeat center;
  background-size: 100%;
  cursor: pointer;
}

.more {
  width: 90px;
  text-align: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  color: #bd1127ff;
  padding: 5px 0;
  font-size: 12px;
  background-image: url("../assets/images/img_bg_more.png");
  cursor: pointer;
}
.item {
  a {
    width: 100%;
    display: block;
    padding-top: 100%;
    height: 0; //避免被内容撑开多余的高度
    position: relative;
    .cardList {
      width: 90%;
      height: 90%;
      text-align: center;
      margin: 0 auto;
      box-sizing: border-box;
      cursor: pointer;
      background-color: #f4f4f4;
      position: absolute;
      top: 0;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -35px;
        margin-top: -35px;
      }
    }
  }
}
</style>