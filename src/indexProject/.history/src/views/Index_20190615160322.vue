<!--  -->
<template>
  <div style="width:100%;overflow:hidden;">
    <div class="content">
      <el-row :gutter="16">
        <el-col :span="12">
          <div class="comeIn"></div>
          <el-card class="box-card">444</el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">444</el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
};
</script>
<style  lang='less' scoped>
.comeIn {
  width: 100%;
  height: 100px;
  background: url("../assets/images/首页02_03.png") no-repeat center;
}
</style>