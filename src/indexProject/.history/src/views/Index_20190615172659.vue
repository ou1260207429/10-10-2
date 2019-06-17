<!--  -->
<template>
  <div style="width:100%;overflow:hidden;">
    <div class="content">
      <el-row :gutter="16">
        <el-col :span="12">
          <div class="comeIn">消防设计审查和验收办事入口</div>
          <el-card class="box-card" style="min-height:270px;">
            <div>
              <p id="tip" style="background-image: url('../../assets/images/img_bg_bszn.png');">
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
                <div class="cardList">
                  <img :src="item.src" alt>
                </div>
                <div>{{item.name}}</div>
              </el-col>
            </el-row>
          </el-card>
          <el-card nz-card style="font-size:8px;height: 219px;margin-top:8px;">
            <p class="titleLeft">
              <span>法律法规</span>
            </p>
            <div v-if="!lawsList" style="text-align: center;line-height: 30px;font-size: 30px">暂无数据</div>
            <div v-if="lawsList">
              <div nz-row style="padding:20px">
                <div
                  :key="index"
                  v-for="(item,index) in lawsList"
                  style="background-color:#f7f7f7;padding:5px 30px;margin-bottom: 10px;cursor: pointer;"
                >{{ item.title }}</div>
              </div>
              <div style="position: absolute;bottom: 0;left: 0;">
                <!-- <p class="more">
                  <span>更多 ></span>
                </p>-->
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card style="font-size:8px;height: 301px;">
            <div style="overflow:hidden">
              <p class="titleRight" style="float: right">
                <span>公告消息</span>
              </p>
            </div>
            <el-row :gutter="50" style="padding:20px 40px;">
              <el-col
                class="item"
                :span="8"
                :key="index"
                v-for="(item,index) in infoList"
                @click="getNoticeDetail('handle',item.type,item.name)"
              >
                <div class="cardList">
                  <img :src="item.src" alt>
                </div>
                <div>{{item.name}}</div>
              </el-col>
            </el-row>
          </el-card>
          <el-card nz-card style="font-size:8px;height: 347px;margin-top:8px;">
            <p class="titleLeft">
              <span>法律法规</span>
            </p>
            <div v-if="!lawsList" style="text-align: center;line-height: 30px;font-size: 30px">暂无数据</div>
            <div v-if="lawsList">
              <div nz-row style="padding:20px">
                <div
                  :key="index"
                  v-for="(item,index) in tableList"
                  style="background-color:#f7f7f7;padding:5px 30px;margin-bottom: 10px;cursor: pointer;"
                >
                  {{ item.attachmentName }}
                  <span style="float: right">{{ item.creationTime }}</span>
                </div>
              </div>
              <div style="position: absolute;bottom: 0;left: 0;">
                <!-- <p class="more">
                  <span>更多 ></span>
                </p>-->
              </div>
            </div>
          </el-card>
        </el-col>
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
      lawsList: [],
      tableList: [],
      handleList: [
        {
          type: "Audit",
          name: "建设工程消防设计审核指南",
          src: require("../assets/images/首页02_21.jpg")
        },
        {
          type: "Acceptance",
          src: require("../assets/images/首页02_23.jpg"),

          name: "建设工程消防验收指南"
        },
        {
          type: "Record",
          name: "建设工程竣工验收消防备案指南",
          src: require("../assets/images/首页02_25.jpg")
        }
      ],
      infoList: [
        {
          type: "Audit",
          name: "建设工程消防设计审查公告",
          src: require("../assets/images/首页02_21.jpg")
        },
        {
          type: "Acceptance",
          src: require("../assets/images/首页02_23.jpg"),
          name: " 建设工程消防验收公告"
        },
        {
          type: "Record",
          name: "建设工程竣工验收消防备案公告",
          src: require("../assets/images/首页02_25.jpg")
        }
      ]
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.getlawsList();
    this.getTableList();
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
    getNoticeDetail() {}
  }
};
</script>
<style  lang='less' scoped>
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
}

.titleLeft {
  border-top: 26px solid #bd1127ff;
  border-right: 40px solid transparent;
  width: 150px;
  text-align: center;
  font-size: 15px;
  color: #fff;
  position: relative;

  span {
    position: absolute;
    top: -24px;
    left: 22px;
  }
}

.titleRight {
  border-top: 26px solid #bd1127ff;
  border-left: 40px solid transparent;
  width: 150px;
  text-align: center;
  font-size: 15px;
  color: #fff;
  position: relative;

  span {
    position: absolute;
    top: -24px;
    left: 13px;
  }
}

.more {
  border-bottom: 22px solid #e6e5e5;
  border-right: 30px solid transparent;
  width: 100px;
  text-align: center;
  font-size: 8px !important;
  position: relative;
  margin: 0;
  cursor: pointer;

  span {
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 2px;
    margin-left: 20px;
    color: #c23c49;
  }

  // color: #c23c49;
  // background-color: #e6e5e5;
  // width: 100px;
  // padding: 5px 20px;
  // margin: 0;
  // cursor: pointer;
}

.cardList {
  width: 100%;
  height: 150px;
  -border: 1px solid #cccccc;
  text-align: center;
  line-height: 150px;
  margin-bottom: 10px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>