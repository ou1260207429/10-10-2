

export class URLConfig {

    private constructor() {

    }


    private static instance = new URLConfig();

    public SERVER_URL = "http://222.84.250.158:8111/";
    public REGISTER_URL = "http://222.84.250.158:8000/";
    public XIEFENG_SERVICES_URL = 'http://222.84.250.158:8113/';
    public APP_URL = "./";

    public static getInstance() {
        return this.instance;
    }
    // export var SERVER_URL =   'http://dn5.gxcic.net:8303';

    // // export const SERVER_URL = IS_DEBUG ? 'http://222.84.250.158:8111' : 'http://222.84.250.158:8111';
    // // export const SERVER_URL = SERVER_URL;

    // //谢峰的服务地址
    // export var XIEFENG_SERVICES_URL = 'http://dn5.gxcic.net:8305';

    // //庞博的服务器上传图片地址
    // // export var REGISTER_URL = "";//IS_DEBUG ? 'http://222.84.250.158:8000/' : 'http://222.84.250.158:8111/';

    // //注册地址，勿随意动
    // export var REGISTER_URL = "http://dn5.gxcic.net:8304";


}