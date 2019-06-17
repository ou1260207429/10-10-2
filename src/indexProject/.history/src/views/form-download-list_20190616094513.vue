<!--  -->
<template>
  <div style="width:100%;overflow:hidden;">
    <div class="content">
      <el-row>
        <img style="width:100%;" src="../assets/images/表格下载_03.jpg" alt>
      </el-row>
      <el-row>
        <el-card style="height:400px;">
          <div v-if="downLoadList.length==0" style="text-align: center;line-height: 30px;font-size: 30px">暂无数据</div>
          <div v-if="downLoadList.length>0">
            <div nz-row style="padding:20px">
              <div
                :key="index"
                v-for="(item,index) in downLoadList"
                style="background-color:#f7f7f7;padding:5px 30px;margin-bottom: 10px;cursor: pointer;"
              >
                {{ item.attachmentName }}
                <span style="float: right">{{ item.creationTime }}</span>
              </div>
            </div>
          </div>
        </el-card>
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
    return { downLoadList: [] };
  },

  components: {},

  computed: {},

  mounted() {
    this.getTableList();
  },

  methods: {
    getTableList() {
      let _this = this;
      app.post(table.search_tableList, app.pageSize).then(req => {
        req.result.data.forEach(element => {
          element.creationTime = moment(element.creationTime).format(
            "YYYY-MM-DD hh:mm:ss"
          );
        });
        _this.downLoadList = req.result.data;
      
      });
    }
  }
};
</script>
<style lang='less' scoped>
</style>
