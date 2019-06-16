<!--  -->
<template>
  <div style="width:100%;overflow:hidden;">
    <div class="content">
      <el-row :gutter="8">
        <el-col :span="4">
          <el-card style="min-height:640px;">
            <div
              style="background-color: #BD1127FF;color: #fff;font-size: 18px;padding: 6px 0;text-align:center;"
            >公告信息</div>
            <p
              :key="index"
              v-for="(item,index) in navList"
              style="background-color: #fff;font-size: 15px;padding: 14px 0;border-bottom: 1px solid #e8e8e8;margin: 0"
            >{{item.name}}</p>
          </el-card>
        </el-col>
        <el-col :span="20">
          <el-card style="min-height:640px;"></el-card>
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
<style lang='less' scoped>
</style>