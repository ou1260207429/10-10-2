<!--  -->
<template>
  <div style="width:100%;overflow:hidden;">
    <div class="content">
      <el-row>
        <img style="width:100%;" src="../assets/images/法律法规_03.jpg" alt>
      </el-row>
      <el-row :gutter="16">
        <el-col :span="12">
          <el-card style="height:450px;">
            <div>
              <p id="tip" class="zhinan">
                <span>法律法规</span>
              </p>
            </div>
            <div v-if="lawsList.length==0" style="text-align: center;line-height: 30px;font-size: 30px">暂无数据</div>
            <div v-if="lawsList.length>0">
              <ul>
                <li v-for="(item,index) in lawsList" :key="index">
                  <div style="overflow: hidden">
                    <span class="title">{{item.title}}</span>
                    <span class="time">————{{item.issueOrg}}</span>
                  </div>
                  <div style="overflow: hidden;margin-top: 6px;">
                    <span style="float: right;font-size: 8px">{{item.creationTime|timeNewString}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card style="height:450px;">
            <div style="overflow:hidden">
              <p id="tip" class="info" style="float: right">
                <span>规范性文件</span>
              </p>
            </div>
            <div v-if="!lawsFiles" style="text-align: center;line-height: 30px;font-size: 30px">暂无数据</div>
            <ul>
              <li v-for="(item,index) in lawsFiles" :key="index">
                <div style="overflow: hidden">
                  <span class="title">{{item.title}}</span>
                  <span class="time">————{{item.issueOrg}}</span>
                </div>
                <div style="overflow: hidden;margin-top: 6px;">
                  <span style="float: right;font-size: 8px">{{item.creationTime|timeNewString}}</span>
                </div>
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
import { laws, table } from "../assets/js/apiValue";
export default {
  data() {
    return {
      lawsList: [],
      lawsFiles: []
    };
  },

  components: {},

  computed: {},

  mounted() {
    let params1 = Object.assign({ group: "Regulation" }, app.pageSize);
    this.getlawsList(params1);

    let params2 = Object.assign({ group: "Normative" }, app.pageSize);
    this.getlawsList(params2);
  },

  methods: {
    getlawsList(params) {
      let _this = this;
      app.post(laws.serach_lawsList, params).then(req => {
        if (req.success) {
          if (params.group == "Normative") {
            _this.lawsFiles = req.result.data;
          } else {
           _this.lawsList = req.result.data;
          }
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
</style>
