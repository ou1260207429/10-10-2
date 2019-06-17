<!--  -->
<template>
  <div style="width:100%;overflow:hidden;">
    <div class="content">
      <el-row :gutter="8">
        <el-col :span="4" style="background-color: transparent;">
          <div
            style="background-color: #BD1127FF;color: #fff;font-size: 18px;padding: 6px 0;text-align:center;"
          >公告信息</div>
          <p
            :class="{activeInfo:index+1==activeType}"
            @click="getInfo(item.type)"
            :key="index"
            v-for="(item,index) in navList"
            style="background-color: #fff;font-size: 15px;padding: 14px 0;border-bottom: 1px solid #e8e8e8;margin: 0;text-align:center;cursor:pointer;"
          >{{item.name}}</p>
        </el-col>
        <el-col :span="20">
          <el-card style="padding:20px;">
            <el-form :inline="true" status-icon ref="searchForm">
              <el-form-item>
                <el-select
                  clearable
                  size="small"
                  @change="handleChange"
                  v-model="searchForm.sheng"
                  placeholder="请选择（市）"
                >
                  <el-option
                    v-for="(item,index) in shengList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select clearable size="small" v-model="searchForm.xian" placeholder="请选择（区/县）">
                  <el-option
                    v-for="item in xianList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
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
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  style="background-color:#bd1127ff;border-color:#bd1127ff;"
                  type="primary"
                  @click="initTable"
                >提交</el-button>
              </el-form-item>
            </el-form>
          </el-card>
          <el-card style="min-height:640px;">
            <el-table :data="tableData" style="width: 100%">
              <template v-for="(item,index) in tableCols">
              <el-table-column :key="index" prop="date" label="日期" width="180"></el-table-column>
               
              </template>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { app } from "../assets/js/app";
import { laws, table } from "../assets/js/apiValue";
import moment from "moment";
export default {
  data() {
    return {
      dateTime: [],
      activeType: "",
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
      searchForm: {
        sheng: "",
        xian: "",
        startTime: "",
        endTime: ""
      },
      shengList: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      xianList: [],
      tableData: [],
      tableCols: []
    };
  },
  destroyed() {},
  components: {},

  computed: {},

  mounted() {
    if (app.getData("activeType")) {
      this.activeType = app.getData("activeType");
    } else {
      this.activeType = 1;
    }
  },

  methods: {
    initTable() {
      this.searchForm.startTime = moment(this.dateTime[0]).format("YYYY-MM-DD");
      this.searchForm.endTime = moment(this.dateTime[1]).format("YYYY-MM-DD");
    },
    getInfo(type) {
      this.activeType = type;
      app.setData("activeType", this.activeType);
    },
    handleChange(value) {
      this.xianList = [];
      this.shengList.forEach(item => {
        if (value == item.value) {
          this.xianList = item.children;
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
.activeInfo {
  background-color: transparent !important;
  color: #bd1127ff;
}
</style>