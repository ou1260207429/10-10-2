<!--  -->
<template>
  <el-row>
    <el-row>
      <div style="padding:10px 0px;" class="content">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>建设大厅</el-breadcrumb-item>
          <el-breadcrumb-item>办事指南</el-breadcrumb-item>
          <el-breadcrumb-item>{{path}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-row>
  </el-row>
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
    console.log(this.$route.params);
  },

  methods: {}
};
</script>
<style lang='less' scoped>
</style>