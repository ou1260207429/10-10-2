<!--  -->
<template>
  <div style="width:100%;overflow:hidden;">
    <div class="content">
      <el-row>
        <img style="width:100%;" src="../assets/images/法律法规_03.jpg" alt>
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
      data: {}
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