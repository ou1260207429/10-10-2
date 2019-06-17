<!--  -->
<template>
  <el-row>
    <el-row class="top" id="top">
      <el-row class="content">
        <el-col :span="19">
          <img class="logo" src="../assets/images/logo-index.png" alt>
          <span class="title">广西建设工程消防设计审查与验收管理平台</span>
        </el-col>
        <el-col :span="5" class="tip">
          <span>公正</span>
          <span>严格</span>
          <span>文明</span>
          <span>高效</span>
        </el-col>
      </el-row>
    </el-row>
    <el-row id="nav" style="background-color:#fff;">
      <ul class="nav content">
        <template v-for="(item,index) in navList">
          <li :key="index">
            <router-link
              :to="item.path"
              :class="[{activeNav:$route.path==item.path},item.activeName]"
              :active-class="item.acitve"
            >{{item.name}}</router-link>
          </li>
        </template>
      </ul>
    </el-row>
    <el-row v-if="showPath" id="breadcrumb">
      <div style="padding:10px 0px;" class="content">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>建设大厅</el-breadcrumb-item>
          <template v-for="(item,index) in currentPath">
            <el-breadcrumb-item :key="index">{{item}}</el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </div>
    </el-row>
    <router-view></router-view>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      currentPath: [],
      showPath: false,
      navList: [
        {
          path: "/index",
          name: "首页",
          activeName: "antiveIndex",
          acitve: "nowIndex"
        },
        {
          path: "/handling-guid",
          name: "办事指南",
          activeName: "antivehandling",
          acitve: "nowhandling"
        },
        {
          path: "/announcement-information/1",
          name: "公告信息",
          activeName: "antiveinformation",
          acitve: "nowinformation"
        },
        {
          path: "/form-download",
          name: "表格下载",
          activeName: "antiveform",
          acitve: "nowform"
        },
        {
          path: "/laws-and-regulations",
          name: "法律法规",
          activeName: "antivelaws",
          acitve: "nowlaws"
        },
        {
          path: "/account/login",
          name: "登录",
          activeName: "antivelogin",
          acitve: "nowlogin"
        }
      ]
    };
  },
  watch: {
    $route(to, from) {
      this.showPath = this.$route.meta.show;
      this.currentPath = this.$route.meta.name;
    }
  },
  components: {},

  computed: {},

  mounted() {
    this.showPath = this.$route.meta.show;
    this.currentPath = this.$route.meta.name;
  },

  methods: {}
};
</script>
<style lang='less' scoped>
.top {
  height: 85px;
  line-height: 85px;
  color: #fff;
  letter-spacing: 2px;
  background: url("../assets/images/head-bg.jpg") no-repeat center;

  .tip {
    padding-top: 20px;
    font-size: 18px;
    color: #ffefa1ff;
    text-shadow: 0px 2px 4px #bd1127ff;
    font-weight: 600;

    span {
      margin: 0 8px;
    }
  }
}
.logo {
  width: 50px;
  float: left;
  margin-right: 10px;
  margin-top: 15px;
}
.title {
  font-size: 30px;
  float: left;
}
ul {
  overflow: hidden;
  margin-top: 10px;
  li {
    float: left;
    cursor: pointer;
    padding-bottom: 10px;

    a {
      padding: 0 45px;
      padding-bottom: 5px;
      display: inline-block;
      text-decoration: none;
      color: #000;
      background-size: 18px !important;
      background-position: 24px 0px !important;
      background-repeat: no-repeat;
    }
  }
}

.antiveIndex {
  background-image: url("../assets/images/表格下载_13.png");
}

.nowIndex {
  background-image: url("../assets/images/表格下载_132.png") !important;
}

.antivehandling {
  background-image: url("../assets/images/表格下载_15.png");
}

.nowhandling {
  background-image: url("../assets/images/表格下载_152.png") !important;
}

.antiveinformation {
  background-image: url("../assets/images/表格下载_03.png");
}

.nowinformation {
  background-image: url("../assets/images/表格下载_032.png") !important;
}

.antiveform {
  background-image: url("../assets/images/表格下载_052.png");
}

.nowform {
  background-image: url("../assets/images/表格下载_05.png") !important;
}

.antivelaws {
  background-image: url("../assets/images/表格下载_07.png");
}

.nowlaws {
  background-image: url("../assets/images/表格下载_072.png") !important;
}

.antivelogin {
  background-image: url("../assets/images/表格下载_10.png");
}

.nowlogin {
  background-image: url("../assets/images/表格下载_102.png") !important;
}
</style>