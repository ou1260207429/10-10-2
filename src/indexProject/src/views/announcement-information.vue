<!--  -->
<template>
  <div style="width:100%;overflow:hidden;margin-bottom: 20px;">
    <div class="content">
      <el-row :gutter="8">
        <el-col :span="4" style="background-color: transparent;">
          <div
            style="background-color: #bd1127;color: #fff;font-size: 18px;padding: 6px 0;text-align:center;"
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
                  <el-input
                    v-model.trim="searchForm.projectName"
                    style="width:250px"
                    size="small"
                    placeholder="请输入工程名称"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-select
                    clearable
                    size="small"
                    @change="handleChange"
                    v-model="searchForm.cityname"
                    placeholder="请选择（市）"
                  >
                    <el-option
                      v-for="(item,index) in cityList"
                      :key="index"
                      :label="item.Name"
                      :value="item.Name"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select
                    clearable
                    size="small"
                    v-model="searchForm.regionname"
                    placeholder="请选择（区/县）"
                  >
                    <el-option
                      v-for="item in xianList"
                      :key="item.value"
                      :label="item.Name"
                      :value="item.Name"
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
                    start-placeholder="办结开始日期"
                    end-placeholder="办结结束日期"
                  ></el-date-picker>
                </el-form-item>
                <br />
                <el-form-item>
                  <el-button
                    size="small"
                    style="background-color:#bd1127;border-color:#bd1127;"
                    type="primary"
                    @click="searchTable"
                  >查询</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button
                    size="small"
                    style="background-color:#bd1127;border-color:#bd1127;"
                    type="primary"
                    @click="autoRefre"
                  >重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
          <el-card :style="{minHeight:tableHight,padding:'0 20px',boxSizing:'border-box'}">
            <el-table v-loading="!tableData" :data="tableData" style>
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <template v-for="(item,index) in tableCols">
                <!-- <template v-if="item.key=='recordCode'">
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
                </template>-->
                <el-table-column
                  :width="item.width?item.width:''"
                  :align="item.width?'center':'left'"
                  :key="index"
                  :prop="item.key"
                  :label="item.label"
                ></el-table-column>
              </template>
            </el-table>
            <el-row style="margin-top:40px;margin-bottom:25px;">
              <el-pagination
                style="float:right;"
                :page-size="pageSize.size"
                :current-page="pageSize.page"
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
      pageSize: { size: 10, page: 1, isAsc: true },
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
      //查询条件
      searchForm: {
        cityname: "",
        regionname: "",
        startTime: "",
        endTime: "",
        flowType: "",
        projectName: ""
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

        // {
        //   key: "recordCode",
        //   label: "备案编号"
        // },
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
        // {
        //   key: "documentCode",
        //   label: "文书编号"
        // },
        {
          key: "finishTime",
          label: "办结时间",
          width: "110px"
        },
        // {
        //   key: "constructionPermit",
        //   label: "施工许可证"
        // },
        {
          key: "contact",
          label: "联系人",
          width: "110px"
        },
        // {
        //   key: "announceTime",
        //   label: "公告时间",
        //   width: "110px"
        // },
        {
          key: "announceNum",
          label: "第几次公告",
          width: "95px"
        },
        {
          key: "checkResultText",
          label: "结果",
          width: "80px"
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
    autoRefre() {
      this.dateTime = [];
      this.searchForm.cityname = "";
      this.searchForm.regionname = "";
      this.searchForm.startTime = "";
      this.searchForm.endTime = "";
      this.searchForm.projectName = "";
      this.xianList = [];
      this.pageSize.page = 1;
      this.initTable();
    },
    searchTable() {
      this.pageSize.page = 1;
      this.initTable();
    },
    /**
     * 查询表格数据
     */ initTable() {
      if (this.dateTime && this.dateTime.length > 0) {
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
      this.pageSize.page = 1;
      this.dateTime = [];
      this.searchForm = {
        cityname: "",
        regionname: "",
        startTime: "",
        endTime: "",
        projectName: "",
        flowType: type
      };

      app.setData("activeType", type);
      this.initTable();
      this.tableHight =
        app.clentHeight() - this.$refs.searchForm.offsetHeight + "px";
    },
    //切换省份查询区/县
    handleChange(value) {
      this.xianList = [];
      this.searchForm.regionname = "";
      this.cityList.forEach(item => {
        if (value == item.Name) {
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
  color: #bd1127;
}
</style>