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
            <div v-if="!lawsList" style="text-align: center;line-height: 30px;font-size: 30px">暂无数据</div>
            <div v-if="lawsList">
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
        <el-col  :span="12">
          <el-card style="height:450px;">
            <div style="overflow:hidden">
              <p id="tip" class="info" style="float: right">
                <span>规范性文件</span>
              </p>
            </div>
            <div v-if="!lawsList" style="text-align: center;line-height: 30px;font-size: 30px">暂无数据</div>
            <div v-if="lawsList">
              <div nz-row style="padding:20px">
                <div
                  :key="index"
                  v-for="(item,index) in lawsList"
                  style="background-color:#f7f7f7;padding:5px 30px;margin-bottom: 10px;cursor: pointer;"
                >{{ item.title }}</div>
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
    this.getlawsList("Regulation");
    this.getlawsList("Normative");
  },

  methods: {
    getlawsList(type) {
      let _this = this;
      app.pageSize.group = type;
      app.post(laws.serach_lawsList, app.pageSize).then(req => {
        if (type == "Normative") {
          _this.lawsFiles = req.result.data;
        } else {
          _this.lawsList = req.result.data;
        }
        console.log(req);
      });
    }
  }
};
</script>
<style lang='less' scoped>
</style>
