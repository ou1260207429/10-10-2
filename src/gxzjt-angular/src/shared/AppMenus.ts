import { Menu } from '@delon/theme';

// 全局的左侧导航菜单
export class AppMenus {

  static aclCompany = "reg";//注册公司
  static aclSys = "sys";//管理员
  static aclOrg = "org";//机构人员
  static orgManager = "orgManager";//机构管理员
  static aclAny = "any";//所有人


  static Menus: Menu[] = [
    {
      text: "",
      i18n: "首页",
      icon: { type: "icon", value: "home" },// 图标
      acl: [AppMenus.aclSys, AppMenus.orgManager],
      children: [
        {
          text: "",
          i18n: "系统首页",
          link: "/app/home/systemHomeComponent",
        },
        {
          text: "",
          i18n: "监控大屏",
          link: "/app/big-screen/big",
          // externalLink: "/app/big-screen/big",
          target: "_blank",
          hideInBreadcrumb: true,
          "reuse": false
        },
        // {
        //     "text": "主屏",
        //     "icon": "anticon anticon-bars",
        //     "link": "/gd-monitor-big-screen/gd-main-screen",
        //     // "externalLink": "/#/gd-monitor-big-screen/gd-main-screen", // 本地调试
        //     "externalLink": "/dist/index.html#/gd-monitor-big-screen/gd-main-screen", // 发布
        //     "target": "_blank"
        //   },
      ]
    },
    {
      text: "",
      i18n: "工作事项",
      icon: { type: "icon", value: "bars" },// 图标
      acl: [AppMenus.aclSys, AppMenus.aclOrg, AppMenus.orgManager],
      children: [
        {
          text: "",
          i18n: "待办",
          link: "/app/work-matters/agencyDoneComponent",
        },
        {
          text: "",
          i18n: "已办",
          link: "/app/work-matters/alreadyDoneComponent",
        },
        {
          text: "",
          i18n: "经办事项",
          link: "/app/work-matters/all-done",
        },

        // {
        //   text: "办结查询",
        //   alc: [AppMenus.aclCompany, AppMenus.aclSys],
        //   link: "/app/work-matters/searchHadDone",
        // },
        // {
        //   text: "",
        //   i18n: "草稿",
        //   link: "/app/work-matters/draf",
        // },
        // {
        //   text: "",
        //   i18n: "流程",
        //   link: "/app/work-matters/flowModuleComponent",
        // },
        // {
        //   text: "",
        //   i18n: "草稿箱",
        //   link: "/app/work-matters/draftsComponent",
        // },
        // {
        //   text: "",
        //   i18n: "表单",
        //   link: "/app/work-matters/formModuleComponent",
        // },
      ]
    },

    {
      text: "预警中心",
      icon: { type: "icon", value: "warning" },// 图标
      acl: [AppMenus.aclSys, AppMenus.aclOrg, AppMenus.orgManager],
      link: "/app/statistics/warning-center",
    }
    ,
    {
      text: "统计分析",
      icon: { type: "icon", value: "area-chart" },// 图标
      acl: [AppMenus.aclOrg, AppMenus.orgManager],
      children: [
        // {
        //   text: "预警中心",

        //   link: "/app/statistics/warning-center",
        // },
        {
          text: "项目申报情况",
          link: "/app/statistics/pro-app-static",
        },
        {
          text: "超时办理项目",
          link: "/app/statistics/timeout-deal-with",
        },
        // {
        //   text: "办理时限统计",
        //   link: "/app/statistics/time-limt-deal",
        // },
        {
          text: "单位项目办理统计",
          link: "/app/statistics/unit-project-statis",
        },
        {
          text: "周报数据统计",
          link: "/app/statistics/weekly-statis",
        },
      ]
    },
    {
      text: "",
      i18n: "内容管理",
      icon: { type: "icon", value: "form" },// 图标\
      acl: [AppMenus.aclSys],
      children: [
        {
          text: "",
          i18n: "政策法规",
          link: "/app/content-manage/policiesAndRegulationsComponent",
        },
        {
          text: "",
          i18n: "办事指南",
          link: "/app/content-manage/handlingGuideComponent",
        },
        {
          text: "",
          i18n: "表格下载",
          link: "/app/content-manage/formDownloadComponent",
        },
      ]
    },
    {
      text: "",
      i18n: "工程管理",
      icon: { type: "icon", value: "project" },// 图标
      acl: [AppMenus.aclCompany, AppMenus.aclSys, AppMenus.aclOrg, AppMenus.orgManager],
      children: [
        {
          text: "",
          i18n: "工程列表",
          link: "/app/engineering-management/engineeringListComponent",
        },
        {
          text: "",
          i18n: "消防设计审查",
          link: "/app/engineering-management/fireDesignComponent",
        },
        {
          text: "",
          i18n: "消防验收管理",
          link: "/app/engineering-management/fireAcceptanceComponent",
        },
        {
          text: "",
          i18n: "竣工验收备案",
          link: "/app/engineering-management/completedAcceptanceComponent",
        },
        {
          text: "",
          i18n: "草稿箱",
          link: "/app/work-matters/draftsComponent",
        },
      ]
    },
    {
      text: "系统管理",

      icon: { type: "icon", value: "account-book" },// 图标
      acl: [AppMenus.aclSys],
      children: [
        {
          text: "抽查比例中心",

          link: "/app/sys-setting/spot-check-proportion",
        },
        // {
        //   text: "单位信息管理",
        //   link: "/app/sys-setting/unit-info-manage",
        // },
        // {
        //   text: "日志管理",
        //   link: "/app/sys-setting/log-manage",
        // },

      ]
    },

    {
      text: "",
      i18n: "用户中心",
      icon: { type: "icon", value: "user" },// 图标
      children: [
        {
          text: "修改密码",

          link: "/app/user-center/modify-psw",
        },

      ]
    },
    {
      text: "",
      i18n: "用户权限",
      icon: { type: "icon", value: "cluster" },// 图标
      acl: [AppMenus.aclSys, AppMenus.orgManager],
      children: [
        {
          text: "用户列表",
          link: "/app/userright/userlist",
          acl: [AppMenus.aclSys, AppMenus.orgManager],
        },
        {
          text: "机构配置",
          link: "/app/userright/orgedit",
        },
        {
          text: "区域配置",
          link: "/app/userright/Aareedit",
        },
        {
          text: "岗位列表",
          link: "/app/userright/postwork",
          acl: [AppMenus.aclSys],
        },
        {
          text: "角色列表",
          link: "/app/userright/rolelist",
          acl: [AppMenus.aclSys],
        },

      ]
    },
  ];


  static MenusOrg: Menu[] = [

    {
      text: "",
      i18n: "工作事项",
      icon: { type: "icon", value: "bars" },// 图标
      acl: [AppMenus.aclSys, AppMenus.aclOrg],
      children: [
        {
          text: "",
          i18n: "待办",
          link: "/app/work-matters/agencyDoneComponent",
        },
        {
          text: "",
          i18n: "已办",
          link: "/app/work-matters/alreadyDoneComponent",
        },


      ]
    },

    {
      text: "预警中心",
      icon: { type: "icon", value: "warning" },// 图标
      acl: [AppMenus.aclSys, AppMenus.aclOrg],
      link: "/app/statistics/warning-center",
    },

    {
      text: "",
      i18n: "工程管理",
      icon: { type: "icon", value: "project" },// 图标
      acl: [AppMenus.aclCompany, AppMenus.aclSys, AppMenus.aclOrg],
      children: [
        {
          text: "",
          i18n: "工程列表",
          link: "/app/engineering-management/engineeringListComponent",
        },
        {
          text: "",
          i18n: "消防设计审查",
          link: "/app/engineering-management/fireDesignComponent",
        },
        {
          text: "",
          i18n: "消防验收管理",
          link: "/app/engineering-management/fireAcceptanceComponent",
        },
        {
          text: "",
          i18n: "竣工验收备案",
          link: "/app/engineering-management/completedAcceptanceComponent",
        },
        {
          text: "",
          i18n: "草稿箱",
          link: "/app/work-matters/draftsComponent",
        },
      ]
    },

    {
      text: "",
      i18n: "用户中心",
      icon: { type: "icon", value: "user" },// 图标
      children: [
        {
          text: "修改密码",

          link: "/app/user-center/modify-psw",
        },

      ]
    },

  ];

  static MenusOrgLeader: Menu[] = [

    {
      text: "",
      i18n: "工作事项",
      icon: { type: "icon", value: "bars" },// 图标
      acl: [AppMenus.aclSys, AppMenus.aclOrg],
      children: [
        {
          text: "",
          i18n: "待办",
          link: "/app/work-matters/agencyDoneComponent",
        },
        {
          text: "",
          i18n: "已办",
          link: "/app/work-matters/alreadyDoneComponent",
        },
        {
          text: "",
          i18n: "经办事项",
          link: "/app/work-matters/all-done",
        },

      ]
    },

    {
      text: "预警中心",
      icon: { type: "icon", value: "warning" },// 图标
      acl: [AppMenus.aclSys, AppMenus.aclOrg],
      link: "/app/statistics/warning-center",
    },
    {
      text: "统计分析",
      icon: { type: "icon", value: "area-chart" },// 图标
      acl: [AppMenus.aclOrg, AppMenus.orgManager],
      children: [
        // {
        //   text: "预警中心",

        //   link: "/app/statistics/warning-center",
        // },
        {
          text: "项目申报情况",
          link: "/app/statistics/pro-app-static",
        },
        {
          text: "超时办理项目",
          link: "/app/statistics/timeout-deal-with",
        },
        // {
        //   text: "办理时限统计",
        //   link: "/app/statistics/time-limt-deal",
        // },
        {
          text: "单位项目办理统计",
          link: "/app/statistics/unit-project-statis",
        },
        {
          text: "周报数据统计",
          link: "/app/statistics/weekly-statis",
        },
      ]
    },

    {
      text: "",
      i18n: "工程管理",
      icon: { type: "icon", value: "project" },// 图标
      acl: [AppMenus.aclCompany, AppMenus.aclSys, AppMenus.aclOrg],
      children: [
        {
          text: "",
          i18n: "工程列表",
          link: "/app/engineering-management/engineeringListComponent",
        },
        {
          text: "",
          i18n: "消防设计审查",
          link: "/app/engineering-management/fireDesignComponent",
        },
        {
          text: "",
          i18n: "消防验收管理",
          link: "/app/engineering-management/fireAcceptanceComponent",
        },
        {
          text: "",
          i18n: "竣工验收备案",
          link: "/app/engineering-management/completedAcceptanceComponent",
        },
        {
          text: "",
          i18n: "草稿箱",
          link: "/app/work-matters/draftsComponent",
        },
      ]
    },

    {
      text: "",
      i18n: "用户中心",
      icon: { type: "icon", value: "user" },// 图标
      children: [
        {
          text: "修改密码",

          link: "/app/user-center/modify-psw",
        },

      ]
    },

  ];

  static MenusCompy: Menu[] = [

    {
      text: "",
      i18n: "工作事项",
      icon: { type: "icon", value: "bars" },// 图标
      acl: [AppMenus.aclSys, AppMenus.aclOrg],
      children: [
        {
          text: "",
          i18n: "待办",
          link: "/app/work-matters/agencyDoneComponent",
        },
        {
          text: "",
          i18n: "已办",
          link: "/app/work-matters/alreadyDoneComponent",
        }

      ]
    },

    {
      text: "",
      i18n: "工程管理",
      icon: { type: "icon", value: "project" },// 图标
      acl: [AppMenus.aclCompany, AppMenus.aclSys, AppMenus.aclOrg],
      children: [
        {
          text: "",
          i18n: "工程列表",
          link: "/app/engineering-management/engineeringListComponent",
        },
        {
          text: "",
          i18n: "消防设计审查",
          link: "/app/engineering-management/fireDesignComponent",
        },
        {
          text: "",
          i18n: "消防验收管理",
          link: "/app/engineering-management/fireAcceptanceComponent",
        },
        {
          text: "",
          i18n: "竣工验收备案",
          link: "/app/engineering-management/completedAcceptanceComponent",
        },
        {
          text: "",
          i18n: "草稿箱",
          link: "/app/work-matters/draftsComponent",
        },
      ]
    },

    {
      text: "",
      i18n: "用户中心",
      icon: { type: "icon", value: "user" },// 图标
      children: [
        {
          text: "修改密码",

          link: "/app/user-center/modify-psw",
        },

      ]
    },

  ];
}

