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
      data: {}
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    initData() {
      app.post(laws.serach_lawsList, app.pageSize).then(req => {
        if (req.success) {
          req.result.data.forEach(element => {
            element.creationTime = moment(element.creationTime).format(
              "YYYY-MM-DD hh:mm:ss"
            );
          });
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