<!--  -->
<template>
  <div style="width:100%;overflow:hidden;">
    <div class="content">
      <el-row>
        <div style="padding:10px 0px;">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>建设大厅</el-breadcrumb-item>
            <el-breadcrumb-item>法律法规</el-breadcrumb-item>
            <el-breadcrumb-item class="breadcrumb">{{data.title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-row>
      <el-row>
        <img style="width:100%;" src="../assets/images/法律法规_03.jpg" alt>
      </el-row>
      <el-row>
        <el-card :style="{minHeight:tableHight}">
          <h1
            style="color:#BD1127FF;text-align:center;padding:20px 0;letter-spacing:3px; box-sizing: border-box;"
          >{{data.title}}</h1>
          <div class="lawContent">{{data.content}}</div>
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script>
import { app } from "../assets/js/app";
import { laws } from "../assets/js/apiValue";
export default {
  data() {
    return {
      tableHight: "450px",
      path: "",
      searchData: {
        regulationId: null
      },
      data: {
        content: "",
        contentUrl: null,
        creationTime: null,
        guid: null,
        id: 0,
        issueDate: null,
        issueOrg: null,
        lastUpdateTime: null,
        lastUpdateUserCode: null,
        lastUpdateUserName: null,
        regulationCode: null,
        regulationType: null,
        regulationTypeId: null,
        title: null,
        visitCount: null
      }
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.searchData.regulationId = this.$route.params.id;
    this.initData();
    this.tableHight = app.clentHeight();

  },

  methods: {
    initData() {
      let _this = this;
      let params = Object.assign(this.searchData, app.pageSize);
      app.post(laws.serach_lawsDetail, params).then(req => {
        if (req.success) {
          _this.data = req.result;
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
.lawContent {
  padding: 0 10px;
  box-sizing: border-box;
}
</style>