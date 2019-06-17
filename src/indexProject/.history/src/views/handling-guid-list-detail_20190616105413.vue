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
        <el-col :span="19">
          <el-card style="min-height:650px;">
            <h1>{{path}}</h1>
          </el-card>
        </el-col>
        <el-col :span="5">
          <el-card style="min-height:650px;">32</el-card>
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
      data: {}
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
</style>