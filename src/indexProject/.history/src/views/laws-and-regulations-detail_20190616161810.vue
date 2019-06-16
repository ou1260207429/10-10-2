<!--  -->
<template>
  <div style="width:100%;overflow:hidden;">
    <div class="content">
      <el-row>
        <img style="width:100%;" src="../assets/images/法律法规_03.jpg" alt>
      </el-row>
      <el-row>
        <el-card style="min-height:400px;">
            <h3 style="color:#BD1127FF;">{{data.title}}</h3>
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
      searchData: {
        regulationId: null
      },
      data: {
        content: null,
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
        title: "建设工程消防监督管理规定",
        visitCount: null
      }
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.searchData.regulationId = this.$route.params.id;
    this.initData();
  },

  methods: {
    initData() {
      let _this = this;
      let params = Object.assign(this.searchData, app.pageSize);
      app.post(laws.serach_lawsDetail, params).then(req => {
        if (req.success) {
          console.log(req);
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
</style>