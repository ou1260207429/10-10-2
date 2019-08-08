
export function getAddDeisnRepData(): any {
    return {
        jsconstructionUnit: '',//建设单位
        legalRepresentative: '',//法定代表人/主要负责人
        legalRepresentativeNo: '',//法定代表人/主要负责人 联系电话
        projectName: '',//工程名称
        contacts: '',//联系人
        contactsNumber: '',//联系电话
        engineeringCitycountyAndDistrict: '',//工程地址 省市县
        //2019.7.4 新增审批单位
        engineeringId: '',
        engineeringNo: '',//审批单位
        engineeringAddress: '',//工程详细地址
        planStartTime: '',//计划开工时间
        planEndTime: '',//计划竣工时间
        projectCategoryId: '',
        projectUsageId:'',//使用性质
        design: [   //设计单位
            {
                designUnit: '',
                qualificationLevel: '',
                legalRepresentative: '',
                contacts: '',
                contactsNumber: ''
            }
        ],
        constructionUnit: [  //施工单位
            {
                designUnit: '',
                qualificationLevel: '',
                legalRepresentative: '',
                contacts: '',
                contactsNumber: ''
            }
        ],
        constructionControlUnit: { //监理单位
            designUnit: '',
            qualificationLevel: '',
            legalRepresentative: '',
            contacts: '',
            contactsNumber: ''
        },
        mappingUnit: {    //审图单位
            designUnit: '',
            qualificationLevel: '',
            legalRepresentative: '',
            contacts: '',
            contactsNumber: '',
            mainAdiseNo: '',
            no: [{ noValue: '' }],
        },
        basicInformation: [
            {
                name: '',
                type: '',
                grade: '',
                aboveGround: '',
                underground: '',
                height: '',
                builtUpArea: '',
                areaCovered: '',
                jzmjaboveGround: '',
                jzmjunderground: '',
            }
        ],
        storageTank: [
            {
                position: '',
                totalCapacity: '',
                setupType: '',
                storageForm: '',
                name: '',
            }
        ],
        yard: [
            { reserves: '', name: '' }
        ],
        buildingThermalInsulation: {
            type: '',
            layerNumber: '',
            useNature: '',
            originallyUsed: '',
        },
        decorationProject: {
            decorationSite: [
                { label: '顶棚', value: false, checked: true },
                { label: '墙面', value: false, checked: false },
                { label: '地面', value: false, checked: false },
                { label: '隔断', value: false, checked: false },
                { label: '固定家具', value: false, checked: false },
                { label: '装饰织物', value: false, checked: false },
                { label: '其他', value: false, checked: false },
            ],
            decorationArea: '',
            decorationFloorNumber: '',
            useNature: '',
            originallyUsed: '',
        },
        fireFightingFacilities: [
            { label: '室内消火栓系统', value: false, checked: false },
            { label: '室外消火栓系统', value: false, checked: false },
            { label: '火灾自动报警系统', value: false, checked: false },
            { label: '自动喷水灭火系统', value: false, checked: false },
            { label: '气体灭火系统', value: false, checked: false },
            { label: '泡沫灭火系统', value: false, checked: false },
            { label: '其他灭火系统', value: false, checked: false },
            { label: '疏散指示标志', value: false, checked: false },
            { label: '消防应急照明', value: false, checked: false },
            { label: '防烟排烟系统', value: false, checked: false },
            { label: '消防电梯', value: false, checked: false },
            { label: '灭火器', value: false, checked: false },
            { label: '其他', value: false, checked: false },
        ],

        //同时提供的材料
        simultaneousMaterials: {
            a1Checkbox: '',
            a1Input: '',
            a2Checkbox: '',
            a2Input: '',
            a3Checkbox: '',
            a4Checkbox: '',
            a5Checkbox: '',
        },
        corporateOpinion: {
            seal: '',
            name: '',
            opinion: '该项目消防设计文件的编制符合消防设计文件申请要求；建筑的总平面布局和平面布置、耐火等级、建筑构造、安全疏散、消防给水、消防电源及配电、消防设施等的消防设计符合国家建设消防技术标准。'
        },

        uploadMaterial: {
            list0: [],
            list1: [],
            list2: [],
            list3: [],
            list4: [],
            list5: [],
        },

        //特殊建设工程列表
        specialEngineering: {
            value: '',
            listArr: [
                {
                    value: "",
                    title: "建筑总面积大于二万平方米",
                    arr: [{
                        name: "体育场馆",
                        checked: false,
                        value: '体育场馆'
                    }, {
                        name: "会堂",
                        checked: false,
                        value: "会堂"

                    }, {
                        name: "公共展览馆",
                        checked: false,
                        value: "公共展览馆"
                    }, {
                        name: "博物馆的展示厅",
                        checked: false,
                        value: "博物馆的展示厅"
                    }]
                }, {
                    value: "",
                    title: "建筑总面积大于一万五千平方米",
                    arr: [{
                        name: "民用机场航站楼",
                        checked: false,
                        value: "民用机场航站楼"
                    }, {
                        name: "客运车站候车室",
                        checked: false,
                        value: "客运车站候车室"
                    }, {
                        name: "客运码头候船厅",
                        checked: false,
                        value: "客运码头候船厅"
                    }]
                },
                {
                    value: "",
                    title: "建筑总面积大于一万平方米",
                    arr: [{
                        name: "宾馆",
                        checked: false,
                        value: "宾馆"
                    }, {
                        name: "饭店",
                        checked: false,
                        value: "饭店"
                    }, {
                        name: "商场",
                        checked: false,
                        value: "商场"
                    }, {
                        name: "市场",
                        checked: false,
                        value: "市场"
                    }]
                }, {
                    value: "",
                    title: "建筑总面积大于二千五百平方米",
                    arr: [{
                        name: "影剧院",
                        checked: false,
                        value: "影剧院"
                    }, {
                        name: "公共图书馆的阅览室",
                        checked: false,
                        value: "公共图书馆的阅览室"
                    }, {
                        name: "营业性室内健身场馆",
                        checked: false,
                        value: "营业性室内健身场馆"
                    }, {
                        name: "休闲场馆",
                        checked: false,
                        value: "休闲场馆"
                    }, {
                        name: "医院的门诊楼",
                        checked: false,
                        value: "医院的门诊楼"
                    }, {
                        name: "大学的教学楼",
                        checked: false,
                        value: "大学的教学楼"
                    }, {
                        name: "图书馆",
                        checked: false,
                        value: "图书馆"
                    }, {
                        name: "食堂",
                        checked: false,
                        value: "食堂"
                    }, {
                        name: "劳动密集型企业的生产加工车间",
                        checked: false,
                        value: "劳动密集型企业的生产加工车间"
                    }, {
                        name: "寺庙",
                        checked: false,
                        value: "寺庙"
                    }, {
                        name: "教堂",
                        checked: false,
                        value: "教堂"
                    }]
                }, {
                    value: "",
                    title: "建筑总面积大于一千平方米",
                    arr: [{
                        name: "托儿所",
                        checked: false,
                        value: "托儿所"
                    }, {
                        name: "幼儿园的儿童用房",
                        checked: false,
                        value: "幼儿园的儿童用房"
                    }, {
                        name: "儿童游乐厅等室内儿童活动场所",
                        checked: false,
                        value: "儿童游乐厅等室内儿童活动场所"
                    }, {
                        name: "养老院",
                        checked: false,
                        value: "养老院"
                    }, {
                        name: "福利院",
                        checked: false,
                        value: "福利院"
                    }, {
                        name: "医院",
                        checked: false,
                        value: "医院"
                    }, {
                        name: "疗养院的病房楼",
                        checked: false,
                        value: "疗养院的病房楼"
                    }, {
                        name: "中小学校的教学楼",
                        checked: false,
                        value: "中小学校的教学楼"
                    }, {
                        name: "图书馆",
                        checked: false,
                        value: "图书馆1"
                    }, {
                        name: "食堂",
                        checked: false,
                        value: "食堂"
                    }, {
                        name: "学校的集体宿舍",
                        checked: false,
                        value: "学校的集体宿舍"
                    }, {
                        name: "劳动密集型企业的员工集体宿舍",
                        checked: false,
                        value: "劳动密集型企业的员工集体宿舍"
                    }]
                }, {
                    value: "",
                    title: "建筑总面积大于五百平方米",
                    arr: [{
                        name: "歌舞厅",
                        checked: false,
                        value: "歌舞厅"
                    }, {
                        name: "录像厅",
                        checked: false,
                        value: "录像厅"
                    }, {
                        name: "放映厅",
                        checked: false,
                        value: "放映厅"
                    }, {
                        name: "卡拉ＯＫ厅",
                        checked: false,
                        value: "卡拉ＯＫ厅"
                    }, {
                        name: "夜总会",
                        checked: false,
                        value: "夜总会"
                    }, {
                        name: "游艺厅",
                        checked: false,
                        value: "游艺厅"
                    }, {
                        name: "桑拿浴室",
                        checked: false,
                        value: "桑拿浴室"
                    }, {
                        name: "网吧",
                        checked: false,
                        value: "网吧"
                    }, {
                        name: "酒吧",
                        checked: false,
                        value: "酒吧"
                    }, {
                        name: "具有娱乐功能的□餐馆",
                        checked: false,
                        value: "具有娱乐功能的□餐馆"
                    }, {
                        name: "茶馆",
                        checked: false,
                        value: "茶馆"
                    }, {
                        name: "咖啡厅",
                        checked: false,
                        value: "咖啡厅"
                    }]
                }, {
                    value: "",
                    title: "",
                    arr: [{
                        name: "国家机关办公楼",
                        checked: false,
                        value: "国家机关办公楼"
                    }, {
                        name: "电力调度楼",
                        checked: false,
                        value: "电力调度楼"
                    }, {
                        name: "电信楼",
                        checked: false,
                        value: "电信楼"
                    }, {
                        name: "邮政楼",
                        checked: false,
                        value: "邮政楼"
                    }, {
                        name: "防灾指挥调度楼",
                        checked: false,
                        value: "防灾指挥调度楼"
                    }, {
                        name: "广播电视楼",
                        checked: false,
                        value: "广播电视楼"
                    }, {
                        name: "档案楼",
                        checked: false,
                        value: "档案楼"
                    }]
                }, {
                    value: "",
                    title: "",
                    arr: [{
                        name: "本条第一至七项规定以外的单体建筑面积大于四万平方米或者建筑高度超过五十米的公共建筑",
                        checked: false,
                        value: "本条第一至七项规定以外的单体建筑面积大于四万平方米或者建筑高度超过五十米的公共建筑"
                    }]
                }, {
                    value: "",
                    title: "",
                    arr: [{
                        name: "国家标准规定的一类高层住宅建筑",
                        checked: false,
                        value: "国家标准规定的一类高层住宅建筑"
                    }]
                }, {
                    value: "",
                    title: "",
                    arr: [{
                        name: "城市轨道交通",
                        checked: false,
                        value: "城市轨道交通"
                    }, {
                        name: "隧道工程",
                        checked: false,
                        value: "隧道工程"
                    }, {
                        name: "大型发电",
                        checked: false,
                        value: "大型发电"
                    }, {
                        name: "变配电工程",
                        checked: false,
                        value: "变配电工程"
                    }]
                }, {
                    value: "",
                    title: "",
                    arr: [{
                        name: "生产、储存、装卸易燃易爆危险物品的工厂",
                        checked: false,
                        value: "生产、储存、装卸易燃易爆危险物品的工厂"
                    }, {
                        name: "仓库",
                        checked: false,
                        value: "仓库"
                    }, {
                        name: "专用车站",
                        checked: false,
                        value: "专用车站"
                    }, {
                        name: "码头，易燃易爆气体和液体的的充装站",
                        checked: false,
                        value: "码头，易燃易爆气体和液体的的充装站"
                    }, {
                        name: "供应站",
                        checked: false,
                        value: "供应站"
                    }, {
                        name: "调压站",
                        checked: false,
                        value: "调压站"
                    }]
                }],

        },

        engineerinDescription: '',

        fileList: [
            {
                //建设工程消防设计审查申报表（纸质申报表的图片）
                type: 0,
                array: [

                ]
            },
            {
                //消防设计文件
                type: 1,
                array: [

                ]
            },
            {
                //专家评审申报材料
                type: 2,
                array: [

                ]
            },
            {
                //建设工程规划许可证明文件
                type: 3,
                array: [

                ]
            },
            {
                //城乡规划主管部门批准的临时性建筑证明文件
                type: 4,
                array: [

                ]
            },
            {
                //生产工艺和物品有特殊灭火要求的消防设计说明材料
                type: 5,
                array: [

                ]
            },
        ],

        //建设工程规划许可证号
        licenseNumber: '',

        //申报人姓名
        applyName: '',

    };

};

