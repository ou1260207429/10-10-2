<!--  -->
<template>
  <div style="width:100%;overflow:hidden;">
    <div class="content">
      <el-row :gutter="16">
        <el-col :span="12">
          <el-card style="min-height:640px;">
            <div>
              <p id="tip" class="zhinan">
                <span>行政许可</span>
              </p>
            </div>
            <ul style="margin-top: 30px;padding-left: 0">
              <li
                :key="index"
                v-for="(item,index) in xukeList"
                @click="getNoticeDetail(item.type,item.name)"
              >
                <el-row :gutter="16">
                  <el-col :span="8">
                    <img style="width: 100%;height:130px;display:block" :src="item.src" alt>
                  </el-col>
                  <el-col :span="16" style="position: relative;height:130px;">
                       <router-link
                  :to="{
         path: '/handling-guid-list-detail/'+item.type+'/'+item.name, 
      
   }"
                    <p class="title">{{item.name}}</p>
                    <p class="tip">{{item.tip}}</p>
                    <p class="detail">了解详情</p>
                    </router-link>
                  </el-col>
                </el-row>
              </li>
            </ul>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card style="min-height:640px;">
            <div style="overflow:hidden">
              <p id="tip" class="info" style="float: right">
                <span>网上备案</span>
              </p>
            </div>
            <ul style="margin-top: 10px;padding-left: 0">
              <li
                :key="index"
                v-for="(item,index) in rightList"
                @click="getNoticeDetail(item.type,item.name)"
              >
                <el-row :gutter="16">
                  <el-col :span="9">
                    <img style="width: 100%;height:130px;" :src="item.src" alt>
                  </el-col>
                  <el-col :span="15" style="position: relative;height:130px;">
                    <p class="title">{{item.name}}</p>
                    <p class="tip">{{item.tip}}</p>
                    <p class="detail">了解详情</p>
                  </el-col>
                </el-row>
              </li>
            </ul>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      xukeList: [
        {
          type: "Audit",
          name: "建设工程消防设计审核指南",
          src: require("../assets/images/办事指南_03.jpg"),
          tip:
            "审核依据：《中华人民共和国消防法》；《建设工程消防监督管理规定》等消防法规；国家工程建设消防技术标准强制性要求。"
        },
        {
          type: "Acceptance",
          src: require("../assets/images/办事指南详情_10.jpg"),
          name: "建设工程消防验收指南",
          tip:
            "验收依据：《中华人民共和国消防法》；《建设工程消防监督管理规定》等消防法规；建设工程消防验收评定标准。",
          time: "2019-06-03 12:12"
        }
      ],
      rightList: [
        {
          type: "Record",
          name: "建设工程竣工验收消防备案指南",
          src: require("../assets/images/办事指南详情_18.jpg"),
          tip:
            " 备案依据：《中华人民共和国消防法》；《建设工程消防监督管理规定》；"
        }
      ]
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    getNoticeDetail() {}
  }
};
</script>
<style lang='less' scoped>

li{
  margin-top: 30px;
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
  .detail {
      width: 85px;
      height: 20px;
      position: absolute;
      left: 10px;
      bottom: 0;
      background: url("/../../assets/images/办事指南_08.png") no-repeat;
      background-size: 85px 20px;
      font-size: 8px;
      color: #fff;
    }

</style>