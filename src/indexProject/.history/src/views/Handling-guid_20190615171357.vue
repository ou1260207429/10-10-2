<!--  -->
<template>
  <div style="width:100%;overflow:hidden;">
    <div class="content">
      <el-row :gutter="16">
        <el-col :span="12" style="min-height:640px;">
          <el-card style="font-size:8px;min-height:640px;">
            <div style="overflow: hidden">
              <p class="titleLeft">
                <span>行政许可</span>
              </p>
            </div>
            <ul style="margin-top: 10px;padding-left: 0">
              <li
                :key="index"
                v-for="(item,index) in xukeList"
                @click="getNoticeDetail(item.type,item.name)"
              >
                <el-row :gutter="16">
                  <el-col :span="9">
                    <img style="width: 100%;" [src]="item.src" alt>
                  </el-col>
                  <el-col :span="15" style="position: relative;height:126px;">
                    <p class="title">{{item.name}}</p>
                    <p class="tip">{{item.tip}}</p>
                    <p class="detail">了解详情</p>
                  </el-col>
                </el-row>
              </li>
            </ul>
          </el-card>
        </el-col>
        <el-col :span="12" style="min-height:640px;">
          <el-card style="font-size:8px;min-height:640px;">
            <div style="overflow: hidden">
              <p class="titleLeft">
                <span>网上备案</span>
              </p>
            </div>
            <ul style="margin-top: 10px;padding-left: 0">
              <li
                :key="index"
                v-for="(item,index) in xukeList"
                @click="getNoticeDetail(item.type,item.name)"
              >
                <el-row :gutter="16">
                  <el-col :span="9">
                    <img style="width: 100%;" [src]="item.src" alt>
                  </el-col>
                  <el-col :span="15" style="position: relative;height:126px;">
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
      xukeList: []
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
</style>