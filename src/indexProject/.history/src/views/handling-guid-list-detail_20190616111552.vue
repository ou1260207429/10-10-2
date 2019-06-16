<!--  -->
<template>
  <div style="width:100%;overflow:hidden;">
    <div class="content">
      <el-row>
        <div style="padding:10px 0px;" class="content">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>建设大厅</el-breadcrumb-item>
            <el-breadcrumb-item>办事指南</el-breadcrumb-item>
            <el-breadcrumb-item class="breadcrumb">{{path}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="18">
          <el-card style="min-height:650px;">
            <h1>{{path}}</h1>
            <p style="text-align: center;">{{data.time}}</p>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card style="min-height:650px;">
            <img style="width:100%;" src="../assets/images/办事指南详情_03.jpg" alt>
            <div>
              <p id="tip" class="zhinan">
                <span>其他相关</span>
              </p>
            </div>
            <el-row
              :gutter="10"
              class="item"
              :key="index"
              v-for="(item,index) in handleList"
              @click="getNoticeDetail('handle',item.type,item.name)"
            >
              <router-link
                :to="{
         path: '/handling-guid-list-detail/'+item.type+'/'+item.name, 
      
   }"
              >
                <el-col :span="10" class="cardList">
                  <img style="width:100%;" :src="item.src" alt>
                </el-col>
                <el-col :span="14">
                  <h4>{{item.name}}</h4>
                </el-col>
              </router-link>
            </el-row>
            <div>
              <p id="tip" class="zhinan">
                <span>网上备案</span>
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
import { laws, table } from "../assets/js/apiValue";
import moment from "moment";
export default {
  data() {
    return {
      path: "",
      type: "",
      data: { time: "2019-10-20 :02:02:02" },
      handleList: [
        {
          type: "Acceptance",
          src: require("../assets/images/办事指南详情_10.jpg"),
          name: "建设工程消防验收指南"
        },
        {
          type: "Audit",
          name: "建设工程消防设计审核指南",
          src: require("../assets/images/办事指南详情_16.jpg")
        },

        {
          type: "Record",
          name: "建设工程竣工验收消防备案指南",
          src: require("../assets/images/办事指南详情_18.jpg")
        }
      ]
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.path = this.$route.params.name;
    this.queryData();
  },

  methods: {
    queryData() {
      let _this = this;
      app.pageSize.regulationId = this.type;
      app.post(laws.serach_lawsList, app.pageSize).then(req => {
        _this.lawsList = req.result.data;
        console.log(req);
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
.item {
  margin-top: 20px;
  height: 80px;
  .cardList{
      height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>