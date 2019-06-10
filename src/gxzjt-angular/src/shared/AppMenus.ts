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
    ];
}