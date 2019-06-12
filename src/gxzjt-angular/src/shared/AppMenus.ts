import { Menu } from '@delon/theme';

// 全局的左侧导航菜单
export class AppMenus {
    static Menus: Menu[] = [
        {
            text: "",
            i18n: "首页",
            icon: { type: "icon", value: "home" },// 图标
            children: [
                {
                    text: "",
                    i18n: "系统首页",
                    link: "/app/home/systemHomeComponent",
                },
                {
                    text: "",
                    i18n: "监控大屏",
                    link: "/app/home/systemHomeComponent",
                },
            ]
        },
        {
            text: "",
            i18n: "工作事项",
            icon: { type: "icon", value: "home" },// 图标
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
                    i18n: "草稿",
                    link: "/app/work-matters/draf",
                },
                {
                    text: "",
                    i18n: "流程",
                    link: "/app/work-matters/flowModuleComponent",
                },
                {
                    text: "",
                    i18n: "表单",
                    link: "/app/work-matters/formModuleComponent",
                },
            ]
        },
        {
            text: "统计分析",

            icon: { type: "icon", value: "account-book" },// 图标
            children: [
                {
                    text: "预警中心",

                    link: "/app/statistics",
                }

            ]
        },
        {
            text: "",
            i18n: "内容管理",
            icon: { type: "icon", value: "home" },// 图标
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
            icon: { type: "icon", value: "home" },// 图标
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
            ]
        },
    ];
}