<!--  -->
<template>
  <div style="width:100%;overflow:hidden;">
    <div class="content">
      <el-row :gutter="16">
        <el-col :span="12">
          <div class="comeIn">消防设计审查和验收办事入口</div>
          <el-card class="box-card">
            <p class="titleLeft">
              <span>办事指南</span>
            </p>
            <el-row :gutter="50" style="padding:2px 40px;">
              <el-col
                :span="8"
                :key="index"
                v-for="(item,index) in handleList"
                @click="getNoticeDetail('handle',item.type,item.name)"
              >
                <div class="cardList">
                  <img :src="item.src" alt>
                </div>
                <div>{{item.name}}</div>
              </el-col>
            </el-row>
          </el-card>
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
    return {
      lawsList: [],
      handleList: []
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
<style  lang='less' scoped>
.comeIn {
  width: 100%;
  height: 160px;
  line-height: 160px;
  font-size: 28px;
  color: #fff;
  letter-spacing: 4px;
  text-align: center;
  background: url("../assets/images/index1.jpg") no-repeat center;
}

.titleLeft {
  border-top: 26px solid #bd1127ff;
  border-right: 40px solid transparent;
  width: 150px;
  text-align: center;
  font-size: 15px;
  color: #fff;
  position: relative;

  span {
    position: absolute;
    top: -24px;
    left: 22px;
  }

  .titleRight {
    border-top: 26px solid #bd1127ff;
    border-left: 40px solid transparent;
    width: 150px;
    text-align: center;
    font-size: 15px;
    color: #fff;
    position: relative;

    span {
      position: absolute;
      top: -24px;
      left: 13px;
    }
  }

  .more {
    border-bottom: 22px solid #e6e5e5;
    border-right: 30px solid transparent;
    width: 100px;
    text-align: center;
    font-size: 8px !important;
    position: relative;
    margin: 0;
    cursor: pointer;

    span {
      position: absolute;
      top: 0;
      left: 0;
      margin-top: 2px;
      margin-left: 20px;
      color: #c23c49;
    }

    // color: #c23c49;
    // background-color: #e6e5e5;
    // width: 100px;
    // padding: 5px 20px;
    // margin: 0;
    // cursor: pointer;
  }

  .cardList {
    width: 100%;
    height: 150px;
    -border: 1px solid #cccccc;
    text-align: center;
    line-height: 150px;
    margin-bottom: 10px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>