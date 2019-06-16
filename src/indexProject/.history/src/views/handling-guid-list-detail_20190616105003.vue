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
          <el-card>444</el-card>
        </el-col>
        <el-col :span="5">
          <el-card>32</el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: "",
      type: ""
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.path = this.$route.params.name;
  },

  methods: {}
};
</script>
<style lang='less' scoped>
</style>