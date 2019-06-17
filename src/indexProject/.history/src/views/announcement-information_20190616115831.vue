<!--  -->
<template>
  <div style="width:100%;overflow:hidden;">
    <div class="content">
      <el-row :gutter="8">
        <el-col :span="4">
          <div>
            <div
              style="background-color: #BD1127FF;color: #fff;font-size: 18px;padding: 6px 0;text-align:center;"
            >公告信息</div>
            <p
              :class="{activeInfo:index==activeType}"
              @click="getInfo(item.type)"
              :key="index"
              v-for="(item,index) in navList"
              style="background-color: #fff;font-size: 15px;padding: 14px 0;border-bottom: 1px solid #e8e8e8;margin: 0;text-align:center;"
            >{{item.name}}</p>
          </div>
        </el-col>
        <el-col :span="20">
          <el-card style="min-height:640px;"></el-card>
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
      activeType: "",
      navList: [
        {
          type: "1",
          name: "消防设计审查"
        },
        {
          type: "2",
          name: "消防验收"
        },
        {
          type: "3",
          name: "竣工验收消防备案"
        }
      ]
    };
  },
  destroyed() {},
  components: {},

  computed: {},

  mounted() {
    if(app.getData("activeType")){
      this.activeType = app.getData("activeType");
    }else{
       this.activeType =1
    }
  },

  methods: {
    getInfo(type) {
      app.setData("activeType", this.activeType);
    }
  }
};
</script>
<style lang='less' scoped>
</style>