<!--  -->
<template>
  <div style="width:100%;overflow:hidden;margin-bottom: 20px;">
    <div class="content">
      <el-row :gutter="8">
        <el-col :span="4" style="background-color: transparent;">
          <div
            style="background-color: #397CC8;color: #fff;font-size: 18px;padding: 6px 0;text-align:center;"
          >公告信息</div>
          <p
            :class="{activeInfo:index+1==searchForm.flowType}"
            @click="getInfo(item.type)"
            :key="index"
            v-for="(item,index) in navList"
            style="background-color: #fff;font-size: 15px;padding: 14px 0;border-bottom: 1px solid #e8e8e8;margin: 0;text-align:center;cursor:pointer;"
          >{{item.name}}</p>
        </el-col>
        <el-col :span="20">
          <el-card style="padding:25px;">
            <div ref="searchForm">
              <el-form id="search" :inline="true" status-icon>
                <el-form-item>
                  <el-select
                    clearable
                    size="small"
                    @change="handleChange"
                    v-model="city"
                    placeholder="请选择（市）"
                  >
                    <el-option
                      v-for="(item,index) in cityList"
                      :key="index"
                      :label="item.Name"
                      :value="item.AreaId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select
                    clearable
                    size="small"
                    @change="handleshi"
                    v-model="searchForm.cityId"
                    placeholder="请选择（区/县）"
                  >
                    <el-option
                      v-for="item in xianList"
                      :key="item.value"
                      :label="item.Name"
                      :value="item.AreaId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-date-picker
                    :format="'yyyy-MM-dd'"
                    size="small"
                    v-model="dateTime"
                    type="daterange"
                    range-separator="~"
                    start-placeholder="公告开始日期"
                    end-placeholder="公告结束日期"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button
                    size="small"
                    style="background-color:#397CC8;border-color:#397CC8;"
                    type="primary"
                    @click="initTable"
                  >提交</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
          <el-card :style="{minHeight:tableHight}">
            <el-table v-loading="!tableData" :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <template v-for="(item,index) in tableCols">
                <template v-if="item.key=='recordCode'">
                  <el-table-column
                    v-if="searchForm.flowType==3"
                    :key="index"
                    :prop="item.key"
                    :label="item.label"
                  ></el-table-column>
                </template>
                <template v-else-if="item.key=='documentCode'">
                  <el-table-column
                    v-if="searchForm.flowType==1||searchForm.flowType==2"
                    :key="index"
                    :prop="item.key"
                    :label="item.label"
                  ></el-table-column>
                </template>
                <el-table-column v-else :key="index" :prop="item.key" :label="item.label"></el-table-column>
              </template>
            </el-table>
            <el-row style="margin-top:40px;margin-bottom:25px;">
              <el-pagination
                style="float:right;"
                :page-size="pageSize.size"
                layout="prev, pager, next"
                :total="total"
                @current-change="changeCurrent"
              ></el-pagination>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { app } from "../assets/js/app";
import { infO } from "../assets/js/apiValue";
import moment from "moment";
export default {
  data() {
    return {
      //分页查询条件
      pageSize: app.pageSize,
      tableHight: "200px",
      //时间
      dateTime: [],
      //
      //左侧菜单
      navList: [
        {
          type: "1",
          name: "消防设计审查"
        },
        {
          type: "2",
          name: "消防验收"
        },
        {
          type: "3",
          name: "竣工验收消防备案"
        }
      ],
      city: "",
      //查询条件
      searchForm: {
        cityId: "",
        cityName: "",
        startTime: "",
        endTime: "",
        flowType: ""
      },
      //省份列表
      cityList: [],
      //区、县列表
      xianList: [],
      //表格数据
      tableData: null,
      //数据总条数
      total: 0,
      //表头数据
      tableCols: [
        // {
        //   key: "id",
        //   label: "序号"
        // },

        {
          key: "recordCode",
          label: "备案编号"
        },
        {
          key: "projectName",
          label: "工程名称"
        },
        {
          key: "companyName",
          label: "单位名称"
        },
        // {
        //   key: "cityName",
        //   label: "单位名称"
        // },
        {
          key: "address",
          label: "工程地址"
        },
        {
          key: "documentCode",
          label: "文书编号"
        },
        {
          key: "finishTime",
          label: "办结时间"
        },
        {
          key: "constructionPermit",
          label: "施工许可证"
        },
        {
          key: "contact",
          label: "联系人"
        },
        {
          key: "announceTime",
          label: "公告时间"
        },
        {
          key: "announceNum",
          label: "第几次公告"
        },
        {
          key: "checkResultText",
          label: "结果"
        }
      ]
    };
  },

  destroyed() {
    app.removeData("activeType");
  },
  components: {},

  computed: {},

  mounted() {
    if (app.getData("activeType")) {
      this.searchForm.flowType = app.getData("activeType");
    } else {
      this.searchForm.flowType = this.$route.params.id;
    }
    this.initTable();
    this.initCityList();
    const that = this;
    setTimeout(function() {
      that.tableHight =
        app.clentHeight() - that.$refs.searchForm.offsetHeight + "px";
    }, 100);
    window.onresize = function() {
      that.tableHight =
        app.clentHeight() - that.$refs.searchForm.offsetHeight + 100 + "px";
    };
  },

  methods: {
    handleshi(value) {
      this.pageSize.cityName = "";
      if (!value) {
        this.city = "";
      }
      this.xianList.forEach(item => {
        if (item.AreaId == value) {
          this.pageSize.cityName = item.Name;
        }
      });
    },
    /**
     * 查询表格数据
     */
    initTable() {
      if (this.dateTime) {
        this.searchForm.startTime = moment(this.dateTime[0]).format(
          "YYYY-MM-DD 00:00:00"
        );
        this.searchForm.endTime = moment(this.dateTime[1]).format(
          "YYYY-MM-DD 23:59:59"
        );
      } else {
        this.searchForm.endTime = "";
        this.searchForm.startTime = "";
      }

      let _this = this;
      let params = Object.assign(this.searchForm, this.pageSize);
      _this.tableData = null;
      app.post(infO.SEARCH_INFO, params).then(req => {
        if (req.success) {
          req.result.data.forEach(element => {
            if (element.finishTime) {
              element.finishTime = moment(element.finishTime).format(
                "YYYY-MM-DD"
              );
            }
            if (element.announceTime) {
              element.announceTime = moment(element.announceTime).format(
                "YYYY-MM-DD"
              );
            }
          });
          _this.tableData = req.result.data;
          _this.total = req.result.totalCount;
        }
      });
    },
    //切换菜单查询数据
    getInfo(type) {
      this.searchForm.flowType = type;
      app.setData("activeType", type);
      this.initTable();
      this.tableHight =
        app.clentHeight() - this.$refs.searchForm.offsetHeight + "px";
    },
    //切换省份查询区/县
    handleChange(value) {
      this.xianList = [];
      this.searchForm.cityId = "";
      this.searchForm.cityName = "";
      this.cityList.forEach(item => {
        if (value == item.AreaId) {
          this.xianList = item.Children;
        }
      });
    },
    //查询省市级联
    initCityList(value) {
      let _this = this;
      app.get(infO.SEARCH_City).then(req => {
        let result = JSON.parse(req.result);
        _this.cityList = result.Children;
      });
    },
    /**
     * 改变当前页码
     */
    changeCurrent(page) {
      this.pageSize.page = page;
      this.initTable();
    }
  }
};
</script>
<style lang='less' scoped>
.activeInfo {
  background-color: transparent !important;
  color: #397cc8;
}
</style>