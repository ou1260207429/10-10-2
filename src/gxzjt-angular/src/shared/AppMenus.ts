import { Menu } from '@delon/theme';

// 全局的左侧导航菜单
export class AppMenus {
    static Menus: Menu[] = [
        {
            text: "",// 无本地化显示字符
            i18n: "首页",// 本地化主键(ABP本地化)
            acl: "",// 权限
            icon: { type: "icon", value: "home" },// 图标
            link: "/app/home", // url 地址
            // hide: true,  // 强制隐藏
            // ...还有更多选项，请查看 Menu成员
        },

        {
            text: "",
            i18n: "工作事项",
            icon: { type: "class", value: "iconfont  icon8636f874" },
            children: [
                {
                    text: "",
                    i18n: "测试",
                    link: "/app/test",
                },
                {
                    text: "",
                    i18n: "表单",
                    link: "/app/formModuleComponent",
                },
            ]
        },
    ];
}