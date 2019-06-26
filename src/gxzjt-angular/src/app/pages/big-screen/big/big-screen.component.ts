import { ProjectFlowServcieServiceProxy, ScreenServiceServiceProxy, ScreenTimeoutStatisticsQueryDto, DeclareRateQueryDto, YearApplyNumberQueryDto } from './../../../../shared/service-proxies/service-proxies';
import { OnInit, Component } from "@angular/core";
import { _HttpClient } from "@delon/theme";

@Component({
    selector: 'app-big-screen',
    templateUrl: './big-screen.component.html',
    styleUrls: ['./big-screen.component.less'],
    providers: [ScreenServiceServiceProxy]
})

export class BigScreenComponent {
    echarts = require('echarts');

    percent = 87;
    color = '#2f9cff';

    clientHeight = 0; //  屏幕可视高度
    clientWidth = 0;
    FireWidth = '';
    FireHeight = '';
    MiddleWidth = '';
    RightWidth = '';
    SignInData = [0, 0, 0, 1, 0, 0, 8, 6];
    GetThrough = [0, 0, 2, 3, 4, 8, 9, 0];
    rankingTopData = [
        { name: '南宁', ranking: 1 },
        { name: '崇左', ranking: 2 },
        { name: '北海', ranking: 3 },
    ]
    rankingData = [

        { name: '柳州', ranking: '04' },
        { name: '河池', ranking: '05' },
        { name: '桂林', ranking: '06' },
        { name: '贺州', ranking: '07' },
        { name: '梧州', ranking: '08' },
        { name: '玉林', ranking: '09' },
        { name: '钦州', ranking: '10' },
        { name: '百色', ranking: '11' },
        { name: '来宾', ranking: '12' },
        { name: '贵港', ranking: '13' },
        { name: '防城港', ranking: '14' }
    ]
    constructor(
        private http: _HttpClient,
        private service: ProjectFlowServcieServiceProxy,
        private screenService: ScreenServiceServiceProxy
    ) {
        let currComponent = this;
        if (document.body.scrollHeight === window.screen.height && document.body.scrollWidth === window.screen.width) {
            this.clientHeight = window.screen.height - 5; // 网页可见区域高
            this.clientWidth = window.screen.width;
        } else {
            this.clientHeight = document.body.clientHeight - 5; // 网页可见区域高
            this.clientWidth = document.body.clientWidth;
        }

        this.FireHeight = this.clientHeight * 0.5 + 'px';
        this.FireWidth = this.clientWidth * 0.32 + 'px';
        this.MiddleWidth = this.clientWidth * 0.47 + 'px';
        this.RightWidth = this.clientWidth * 0.18 + 'px';

        window.onresize = () => {

            if (document.body.scrollHeight === window.screen.height && document.body.scrollWidth === window.screen.width) {
                currComponent.clientHeight = window.screen.height - 5; // 网页可见区域高
                currComponent.clientWidth = window.screen.width;
            } else {
                currComponent.clientHeight = document.body.clientHeight - 5; // 网页可见区域高
                currComponent.clientWidth = document.body.clientWidth;
            }
            currComponent.FireHeight = currComponent.clientHeight * 0.5 + 'px';
            currComponent.FireWidth = currComponent.clientWidth * 0.32 + 'px';
            currComponent.MiddleWidth = currComponent.clientWidth * 0.47 + 'px';
            currComponent.RightWidth = currComponent.clientWidth * 0.18 + 'px';
        };
    }
    data: any = [{}];
    dateTime: any = new Date();
    BarTitle = '消防设计审查';
    OverTimeTitle = '消防设计审查';
    pagesize = 4;
    pageindex = 1;
    ngOnInit() {
        this.Line();
        // this.OverTimeBar1();
        // this.OverTimeBar2();
        // this.OverTimeBar3();
        // this.Bar2();
        // this.Bar3();
        // this.Bar4();
        this.Pie1();
        this.Pie2();
        this.Pie3();
        this.Pie4();
        this.Pie5();
        this.Pie6();
        this.EchartsMap();
        this.GetData();
        setInterval(() => {
            this.dateTime = new Date();
        }, 1000);
        setInterval(() => {
            switch (this.BarTitle) {
                case '消防设计审查':
                    this.BarTitle = '消防验收';
                    break;
                case '消防验收':
                    this.BarTitle = '竣工验收备案';
                    break;
                case '竣工验收备案':
                    this.BarTitle = '消防设计审查';
                    break;
            }
        }, 5000);
        setInterval(() => {
            switch (this.OverTimeTitle) {
                case '消防设计审查':
                    this.OverTimeTitle = '消防验收';
                    break;
                case '消防验收':
                    this.OverTimeTitle = '竣工验收备案';
                    break;
                case '竣工验收备案':
                    this.OverTimeTitle = '消防设计审查';
                    break;
            }
        }, 3000);
        this.Post_GetDeclareRate();
        this.GetScreenCityTimeoutStatistics();
        this.GetApplyStatistics();
        this.GetScreenYearApplyNumber();
        this.GetScreenTimeoutList();
        this.GetFireDataList();
        this.GetFireDataList2();
        this.GetFireDataList3();
    }
    model = new DeclareRateQueryDto();
    //申报统计
    Post_GetDeclareRate() {
        this.model.processedStatus = 2;
        const CityList = [];
        const completeList = [];
        const fireAudit = [];
        const fireComplete = [];
        this.screenService.post_GetDeclareRate(this.model).subscribe((res) => {
            if (res.items != null) {
                res.items.forEach(e => {
                    CityList.push(e.cityName);
                    completeList.push(e.completeNumber);
                    fireAudit.push(e.fireAuditNumber);
                    fireComplete.push(e.fireCompleteNumber);
                });
                this.OverTimeBar1(CityList, fireAudit);
                this.OverTimeBar2(CityList, fireComplete);
                this.OverTimeBar3(CityList, completeList);
            }
        });
    }
    // 一次性通过率
    // GetATimeByStatistics() {
    //     const CityList = [];
    //     const flowPathTypeList = [];
    //     const throughRateList = [];
    //     this.screenService.post_GetATimeByStatistics().subscribe((res) => {
    //         console.log(res);
    //         if (res != null) {
    //             // res.forEach(e => {
    //             //     CityList.push(e.cityName);
    //             //     flowPathTypeList.push(e.flowPathType);
    //             //     throughRateList.push(e.throughRate);
    //             // });
    //         }

    //         // this.Line(CityList, flowPathTypeList, throughRateList);
    //         // this.Bar3(CityList, flowPathTypeList);
    //         // this.Bar4(CityList, fireComplete);
    //     });
    // }
    // 超时统计 1.消防设计审查申报 2.消防竣工验收 3.竣工验收备案
    GetScreenCityTimeoutStatistics() {
        let model: any = {
            dateTimeNow: new Date()
        };
        model.dateTimeNow = new Date();
        const CityList = [];
        const completeList = [];
        const fireAuditList = [];
        const fireCompleteList = [];
        this.screenService.post_GetScreenCityTimeoutStatistics(model).subscribe((res) => {
            if (res.items.length !== 0) {
                res.items.forEach(e => {
                    CityList.push(e.cityName);
                    fireAuditList.push(e.fireAuditNumber);
                    fireCompleteList.push(e.fireCompleteNumber);
                    completeList.push(e.completeNumber);
                });
            }
            this.Bar2(CityList, fireAuditList);
            this.Bar3(CityList, fireCompleteList);
            this.Bar4(CityList, completeList);
        })
    }
    // 累计办理情况
    ScreenYearApplyData: any = [];
    GetScreenYearApplyNumber() {
        let model: any = {
            dateTimeNow: new Date(),
            startDateTime: null,
            endDateTime: new Date(),
            completeStatus: 2,
            page: 1,
            sorting: "CityName",
            skipCount: 0,
            maxResultCount: 10
        };
        model.startDateTime = (new Date().getFullYear() + '-01-01');
        this.screenService.post_GetScreenYearApplyNumber(model).subscribe(res => {
            this.ScreenYearApplyData = res.data;
        });
    }
    // 申请 办结
    ApplyStatistics1: any = 0; // 设计审查
    ApplyStatistics2: any = 0; // 消防竣工验收
    ApplyStatistics3: any = 0; // 竣工验收备查
    statisticsNumberCount: any = 0;
    fireCompleteNumberCount: any = 0;
    completeNumberCount: any = 0;
    GetApplyStatistics() {
        let model: any = {
            startTime: new Date(),
            endTime: null,
        };
        model.endTime = new Date(new Date().getFullYear() - 1 + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
        this.screenService.post_GetApplyStatistics(model).subscribe(res => {
            // this.ApplyStatistics = res;
            this.statisticsNumberCount = res.statisticsNumberCount;
            this.fireCompleteNumberCount = res.fireCompleteNumberCount;
            this.completeNumberCount = res.completeNumberCount;
            if (res.statisticsNumberCount !== 0) {
                this.ApplyStatistics1 = Math.floor((res.hasStatisticsNumber / res.statisticsNumberCount) * 100 / 100);
            }
            if (res.fireCompleteNumberCount !== 0) {
                this.ApplyStatistics2 = Math.floor((res.hasFireCompleteNumber / res.fireCompleteNumberCount) * 100 / 100);
            }
            if (res.completeNumberCount !== 0) {
                this.ApplyStatistics3 = Math.floor((res.hasCompleteNumber / res.completeNumberCount) * 100 / 100);
            }
        });
    }
    // 超时办理列表
    ScreenTimeoutList: any = [];
    GetScreenTimeoutList() {
        let model: any = {
            dateTimeNow: new Date(),
            orderStatus: 2,
            page: 1,
            sorting: "ProjectName",
            skipCount: 0,
            maxResultCount: 10,
        }
        this.screenService.post_GetScreenTimeoutList(model).subscribe(res => {
            this.ScreenTimeoutList = res.data;
        });
    }
    FireData1: any;
    FireData2: any;
    FireData3: any;
    // 地图右边框数据(消防设计审查申报数量统计)
    MapList: any = [];
    GetFireDataList() {
        let model: any = {
            statisticsType: 1,
            dateTimeNow: new Date(),
            processedStatus: 0
        };
        this.screenService.post_GetFireDataList(model).subscribe((res:any) => {
            console.log(res);
            for (let i = 0; i < res.length - 1; i++) {
                for (let j = 0; j < res.length - 1 - i; j++) {
                    if (res[j] > res[j + 1]) {
                        var temp = res[j];
                        res[j] = res[j + 1];
                        res[j + 1] = temp;
                    }
                }
            }
            let num = 1;
            res.forEach(e => {
                // this.MapList.push({
                //     name: e.cityName,
                //     value: e.completeCountNumber === 0 ? 0 : Math.floor((e.aTimeByCountNumber / e.completeCountNumber) * 100 / 100),
                //     ranking: num,
                //     acceptTotal:e.completeCountNumber,
                //     passrateTotal:e.aTimeByCountNumber
                // });
                // num = num + 1;
            });
            this.FireData1 = res;
        });
    }
    //  地图右边框数据(消防竣工验收数量统计)
    GetFireDataList2() {
        let model: any = {
            statisticsType: 2,
            dateTimeNow: new Date(),
            processedStatus: 0
        }
        this.screenService.post_GetFireDataList(model).subscribe(res => {
            this.FireData2 = res;
        });
    }
    //  地图右边框数据(竣工验收备案数量统计)
    GetFireDataList3() {
        let model: any = {
            statisticsType: 3,
            dateTimeNow: new Date(),
            processedStatus: 0
        }
        this.screenService.post_GetFireDataList(model).subscribe(res => {
            this.FireData3 = res;
        });
    }
    GetData() {
        this.data = [];
        for (let i = 0; i < 2; i++) {
            if (i % 2 === 0) {
                this.data.push({
                    name: '市政建设工程一',
                    unit: '部门一',
                    people: '张三',
                    time: '2019-06-01',
                    state: '合格'
                });
            } else {
                this.data.push({
                    name: '市政建设工程一',
                    unit: '部门一',
                    people: '张三',
                    time: '2019-06-01',
                    state: '不合格'
                });
            }

            //         }
            //         // 计算有多少页
            //         this.changeNum = Math.floor(this.tatol / 7);
            //         if (this.tatol % 7 !== 0) {
            //             this.changeNum = this.changeNum + 1;
            //         }
        }
        //     changeNum = 0;
        //     tatol = 100;
        //     PageChange() {

    }
    option: any;
    Line() { //city, flowPathTypeList, throughRateList
        this.option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {             //  坐标轴指示器，坐标轴触发有效
                    type: 'shadow'         //  默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['南宁', '崇左', '北海', '柳州', '河池', '桂林', '贺州', '梧州', '玉林', '钦州', '百色', '来宾', '贵港'],
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    },
                    interval: 0,
                    rotate: '60'
                },
                axisTick: {
                    alignWithLabel: true
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}%',
                    textStyle: {
                        color: '#fff'
                    },
                },
                max: '5',
                min: '1',
                splitLine: {
                    show: false
                },
                axisTick: {
                    alignWithLabel: true
                },
            },
            legend: {
                x: 'center',
                data: ['消防设计审查,消防验收,竣工验收备案'],
                padding: [20, 0, 0, 0],
                textStyle: {
                    color: '#fff'
                },
            },
            series: [
                {
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    type: 'line',
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    },
                    areaStyle: {
                        normal: {
                            barBorderRadius: 5, // 圆角
                            //  添加渐变颜色
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgba(16,97,204, 0.3)'  //  0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(17,235,210, 0)' //  100% 处的颜色
                                }],
                                globalCoord: false,  //  缺省为 false
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5, // 圆角
                            //  添加渐变颜色
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgba(16,97,204,1)'  //  0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(17,235,210,1)'//  100% 处的颜色
                                }],
                                globalCoord: false,  //  缺省为 false
                            }
                        },
                        emphasis: {
                            color: 'rgb(0,196,132)',
                            borderColor: 'rgba(0,196,132,0.2)',
                            extraCssText: 'box-shadow: 8px 8px 8px rgba(0, 0, 0, 1);',
                            borderWidth: 10
                        }
                    },
                }
            ]
        };
    }
    OverTimebar1: any;
    OverTimeBar1(city, data) {
        this.OverTimebar1 = {
            legend: {
                x: 'center',
                data: ['消防设计审查'],
                padding: [20, 0, 0, 0],
                textStyle: {
                    color: '#fff'
                },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {             //  坐标轴指示器，坐标轴触发有效
                    type: 'shadow'         //  默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: city,// ['南宁', '崇左', '北海', '柳州', '河池', '桂林', '贺州', '梧州', '玉林', '钦州', '百色', '来宾', '贵港'],
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        },
                        interval: 0,
                        rotate: '60'
                    },
                    axisTick: {
                        alignWithLabel: true
                    },
                },

            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        },
                    },
                    splitLine: {
                        show: false
                    },
                    max: 'dataMax',
                }

            ],
            series: [
                {
                    name: '消防设计审查',
                    type: 'bar',
                    data: data,//[5, 8, 5, 7, 10, 18, 6, 7, 9, 10, 13, 8, 3],
                    barWidth: 20, // 柱形宽度
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5, // 圆角
                            //  添加渐变颜色
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#00c6fb'  //  0% 处的颜色
                                }, {
                                    offset: 1, color: '#005bea'  //  100% 处的颜色
                                }],
                                globalCoord: false  //  缺省为 false
                            }
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            color: '#fff'
                        }
                    },
                },
            ]
        };
    }
    OverTimebar2: any;
    OverTimeBar2(city, data) {
        this.OverTimebar2 = {
            legend: {
                x: 'center',
                data: ['消防验收'],
                padding: [20, 0, 0, 0],
                textStyle: {
                    color: '#fff'
                },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {             //  坐标轴指示器，坐标轴触发有效
                    type: 'shadow'         //  默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: city,//['南宁', '崇左', '北海', '柳州', '河池', '桂林', '贺州', '梧州', '玉林', '钦州', '百色', '来宾', '贵港'],
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        },
                        interval: 0,
                        rotate: '60'
                    },
                    axisTick: {
                        alignWithLabel: true
                    },
                },

            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        },
                    },
                    splitLine: {
                        show: false
                    },
                    max: 'dataMax',
                }

            ],
            series: [
                {
                    name: '消防验收',
                    type: 'bar',
                    data: data,//[5, 8, 5, 7, 10, 18, 6, 7, 9, 10, 13, 8, 3],
                    barWidth: 20, // 柱形宽度
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5, // 圆角
                            //  添加渐变颜色
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#00c6fb'  //  0% 处的颜色
                                }, {
                                    offset: 1, color: '#005bea'  //  100% 处的颜色
                                }],
                                globalCoord: false  //  缺省为 false
                            }
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            color: '#fff'
                        }
                    },
                },
            ]
        };
    }
    OverTimebar3: any;
    OverTimeBar3(city, data) {
        this.OverTimebar3 = {
            legend: {
                x: 'center',
                data: ['竣工验收备案'],
                padding: [20, 0, 0, 0],
                textStyle: {
                    color: '#fff'
                },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {             //  坐标轴指示器，坐标轴触发有效
                    type: 'shadow'         //  默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: city,//['南宁', '崇左', '北海', '柳州', '河池', '桂林', '贺州', '梧州', '玉林', '钦州', '百色', '来宾', '贵港'],
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        },
                        interval: 0,
                        rotate: '60'
                    },
                    axisTick: {
                        alignWithLabel: true
                    },
                },

            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        },
                    },
                    splitLine: {
                        show: false
                    },
                    max: 'dataMax',
                }

            ],
            series: [
                {
                    name: '竣工验收备案',
                    type: 'bar',
                    data: data,// [5, 8, 5, 7, 10, 18, 6, 7, 9, 10, 13, 8, 3],
                    barWidth: 20, // 柱形宽度
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5, // 圆角
                            //  添加渐变颜色
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#00c6fb'  //  0% 处的颜色
                                }, {
                                    offset: 1, color: '#005bea'  //  100% 处的颜色
                                }],
                                globalCoord: false  //  缺省为 false
                            }
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            color: '#fff'
                        }
                    },
                },
            ]
        };
    }
    bar2: any;
    Bar2(city, data) {
        this.bar2 = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {             //  坐标轴指示器，坐标轴触发有效
                    type: 'shadow'         //  默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                x: 'center',
                data: ['消防设计审查'],
                padding: [20, 0, 0, 0],
                textStyle: {
                    color: '#fff'
                },
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: city,// ['南宁', '崇左', '北海', '柳州', '河池', '桂林', '贺州', '梧州', '玉林', '钦州', '百色', '来宾', '贵港'],
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        },
                        interval: 0,
                        rotate: '60'
                    },
                    axisTick: {
                        alignWithLabel: true
                    },
                },

            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        },
                    },
                    splitLine: {
                        show: false
                    },
                    max: 'dataMax',
                }

            ],
            series: [
                {
                    name: '消防设计审查',
                    type: 'bar',
                    data: data,//[5, 8, 5, 7, 10, 18, 6, 7, 9, 10, 13, 8, 3],
                    barWidth: 20, // 柱形宽度
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5, // 圆角
                            //  添加渐变颜色
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#00c6fb'  //  0% 处的颜色
                                }, {
                                    offset: 1, color: '#005bea'  //  100% 处的颜色
                                }],
                                globalCoord: false  //  缺省为 false
                            }
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            color: '#fff'
                        }
                    },
                }
            ]
        };
    }
    bar3: any;
    Bar3(city, data) {
        this.bar3 = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {             //  坐标轴指示器，坐标轴触发有效
                    type: 'shadow'         //  默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                x: 'center',
                data: ['消防验收'],
                padding: [20, 0, 0, 0],
                textStyle: {
                    color: '#fff'
                },
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: city,// ['南宁', '崇左', '北海', '柳州', '河池', '桂林', '贺州', '梧州', '玉林', '钦州', '百色', '来宾', '贵港'],
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        },
                        interval: 0,
                        rotate: '60'
                    },
                    axisTick: {
                        alignWithLabel: true
                    },
                },

            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        },
                    },
                    splitLine: {
                        show: false
                    },
                    max: 'dataMax',
                }

            ],
            series: [

                {
                    name: '消防验收',
                    type: 'bar',
                    data: data,//[5, 8, 5, 7, 10, 18, 6, 7, 9, 10, 13, 8, 3],
                    barWidth: 20, // 柱形宽度
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5, // 圆角
                            //  添加渐变颜色
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#00c6fb'  //  0% 处的颜色
                                }, {
                                    offset: 1, color: '#005bea'  //  100% 处的颜色
                                }],
                                globalCoord: false  //  缺省为 false
                            }
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            color: '#fff'
                        }
                    },
                }
            ]
        };
    }
    bar4: any;
    Bar4(city, data) {
        this.bar4 = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {             //  坐标轴指示器，坐标轴触发有效
                    type: 'shadow'         //  默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                x: 'center',
                data: ['竣工验收备案'],
                padding: [20, 0, 0, 0],
                textStyle: {
                    color: '#fff'
                },
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: city,// ['南宁', '崇左', '北海', '柳州', '河池', '桂林', '贺州', '梧州', '玉林', '钦州', '百色', '来宾', '贵港'],
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        },
                        interval: 0,
                        rotate: '60'
                    },
                    axisTick: {
                        alignWithLabel: true
                    },
                },

            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        },
                    },
                    splitLine: {
                        show: false
                    },
                    max: 'dataMax',
                }

            ],
            series: [
                {
                    name: '竣工验收备案',
                    type: 'bar',
                    data: data,//[5, 8, 5, 7, 10, 18, 6, 7, 9, 10, 13, 8, 3],
                    barWidth: 20, // 柱形宽度
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5, // 圆角
                            //  添加渐变颜色
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: '#00c6fb'  //  0% 处的颜色
                                }, {
                                    offset: 1, color: '#005bea'  //  100% 处的颜色
                                }],
                                globalCoord: false  //  缺省为 false
                            }
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            color: '#fff'
                        }
                    },
                },
            ]
        };
    }
    pie1: any;
    Pie1() {
        this.pie1 = {
            title: {
                text: '本年',
                textStyle: {
                    color: '#f2f2f2',
                    fontSize: 20,
                    // align: 'center'
                },
                subtextStyle: {
                    fontSize: 30,
                    color: ['#ff9d19']
                },
                x: 'center',
                y: 'center',
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [

                {
                    // name: '数量',
                    type: 'pie',
                    radius: [30, 50],
                    data: [
                        {
                            value: 20, name: '消防设计审查', itemStyle: {
                                normal: {
                                    color: '#F6FF00',
                                    shadowColor: '#F6FF00',
                                    borderWidth: 2,
                                    borderColor: '#F6FF00',
                                    shadowBlur: 10
                                }
                            }
                        },
                        {
                            value: 30, name: '竣工验收备案', itemStyle: {
                                normal: {
                                    color: '#0EF9B3',
                                    shadowColor: '#0EF9B3',
                                    borderWidth: 2,
                                    borderColor: '#0EF9B3',
                                    shadowBlur: 10
                                }
                            }
                        },
                        {
                            value: 50, name: '消防验收', itemStyle: {
                                normal: {
                                    color: '#01B4FF',
                                    shadowColor: '#01B4FF',
                                    borderWidth: 2,
                                    borderColor: '#01B4FF',
                                    shadowBlur: 10
                                }
                            }
                        },

                    ]
                }
            ]
        };
    }
    pie2: any;
    Pie2() {
        this.pie2 = {
            title: {
                text: '本月',
                textStyle: {
                    color: '#f2f2f2',
                    fontSize: 20,
                    // align: 'center'
                },
                subtextStyle: {
                    fontSize: 30,
                    color: ['#ff9d19']
                },
                x: 'center',
                y: 'center',
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [

                {
                    // name: '数量',
                    type: 'pie',
                    radius: [30, 50],
                    data: [
                        {
                            value: 60, name: '消防设计审查', itemStyle: {
                                normal: {
                                    color: '#F6FF00',
                                    shadowColor: '#F6FF00',
                                    borderWidth: 2,
                                    borderColor: '#F6FF00',
                                    shadowBlur: 10
                                }
                            }
                        },
                        {
                            value: 120, name: '竣工验收备案', itemStyle: {
                                normal: {
                                    color: '#0EF9B3',
                                    shadowColor: '#0EF9B3',
                                    borderWidth: 2,
                                    borderColor: '#0EF9B3',
                                    shadowBlur: 10
                                }
                            }
                        },
                        {
                            value: 80, name: '消防验收', itemStyle: {
                                normal: {
                                    color: '#01B4FF',
                                    shadowColor: '#01B4FF',
                                    borderWidth: 2,
                                    borderColor: '#01B4FF',
                                    shadowBlur: 10
                                }
                            }
                        },

                    ]
                }
            ]
        };
    }
    pie3: any;
    Pie3() {
        this.pie3 = {
            title: {
                left: 'left',
                text: '竣工验收备案数量',
                textStyle: {
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: '400',
                },
                padding: [50, 0, 0, 50]
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x: 'right',
                orient: 'vertical',
                data: ['日数量', '月数量', '季度数量'],
                padding: [20, 50, 0, 0],
                textStyle: {
                    color: '#fff'
                },
            },

            series: [

                {
                    name: '数量',
                    type: 'pie',
                    radius: [30, 50],
                    // center : ['75%', '50%'],
                    roseType: 'area',
                    data: [
                        { value: 20, name: '日数量', itemStyle: { color: '#24e236' } },
                        { value: 30, name: '月数量', itemStyle: { color: '#f8e71c' } },
                        { value: 100, name: '季度数量', itemStyle: { color: '#7111c7' } },

                    ]
                }
            ]
        };
    }
    pie4: any;
    Pie4() {
        this.pie4 = {
            title: {
                left: 'left',
                text: '消防竣工验收数量',
                textStyle: {
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: '400',
                },
                padding: [50, 0, 0, 50]
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            // legend: {
            //     orient: 'vertical',
            //     left: 'left',
            //     data: ['南宁', '崇左', '北海', '柳州', '河池', '桂林', '贺州', '梧州', '玉林', '钦州', '百色', '来宾', '贵港'],
            // },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: 335, name: '南宁' },
                        { value: 310, name: '崇左' },
                        { value: 234, name: '北海' },
                        { value: 135, name: '柳州' },
                        { value: 1548, name: '河池' },
                        { value: 335, name: '桂林' },
                        { value: 310, name: '贺州' },
                        { value: 234, name: '梧州' },
                        { value: 135, name: '玉林' },
                        { value: 1548, name: '钦州' },
                        { value: 335, name: '百色' },
                        { value: 310, name: '来宾' },
                        { value: 234, name: '贵港' }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    color: ['#24cbff', '#7760f6', '#484cdc', '#711d8e', '#2d3c98', '#2a43b0', '#293bcc', '#1589ff', '#5c4ac9', '#24cbff', '#7760f6', '#484cdc', '#711d8e']
                }
            ]
        };
    }
    pie5: any;
    Pie5() {
        this.pie5 = {
            title: {
                left: 'left',
                text: '消防竣工验收数量',
                textStyle: {
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: '400',
                },
                padding: [50, 0, 0, 50]
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            // legend: {
            //     orient: 'vertical',
            //     left: 'left',
            //     data: ['南宁', '崇左', '北海', '柳州', '河池', '桂林', '贺州', '梧州', '玉林', '钦州', '百色', '来宾', '贵港'],
            // },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: 335, name: '南宁' },
                        { value: 310, name: '崇左' },
                        { value: 234, name: '北海' },
                        { value: 135, name: '柳州' },
                        { value: 1548, name: '河池' },
                        { value: 335, name: '桂林' },
                        { value: 310, name: '贺州' },
                        { value: 234, name: '梧州' },
                        { value: 135, name: '玉林' },
                        { value: 1548, name: '钦州' },
                        { value: 335, name: '百色' },
                        { value: 310, name: '来宾' },
                        { value: 234, name: '贵港' }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    color: ['#24cbff', '#7760f6', '#484cdc', '#711d8e', '#2d3c98', '#2a43b0', '#293bcc', '#1589ff', '#5c4ac9', '#24cbff', '#7760f6', '#484cdc', '#711d8e']
                }
            ]
        };
    }
    pie6: any;
    Pie6() {
        this.pie6 = {
            title: {
                left: 'left',
                text: '消防竣工验收数量',
                textStyle: {
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: '400',
                },
                padding: [50, 0, 0, 50]
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            // legend: {
            //     orient: 'vertical',
            //     left: 'left',
            //     data: ['南宁', '崇左', '北海', '柳州', '河池', '桂林', '贺州', '梧州', '玉林', '钦州', '百色', '来宾', '贵港'],
            // },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: 335, name: '南宁' },
                        { value: 310, name: '崇左' },
                        { value: 234, name: '北海' },
                        { value: 135, name: '柳州' },
                        { value: 1548, name: '河池' },
                        { value: 335, name: '桂林' },
                        { value: 310, name: '贺州' },
                        { value: 234, name: '梧州' },
                        { value: 135, name: '玉林' },
                        { value: 1548, name: '钦州' },
                        { value: 335, name: '百色' },
                        { value: 310, name: '来宾' },
                        { value: 234, name: '贵港' }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    color: ['#24cbff', '#7760f6', '#484cdc', '#711d8e', '#2d3c98', '#2a43b0', '#293bcc', '#1589ff', '#5c4ac9', '#24cbff', '#7760f6', '#484cdc', '#711d8e']
                }
            ]
        };
    }
    map: any;
    myChart: any;
    Icon: any = {
        passrate1: 'assets/images/passrate/passrate1.png',
        passrate2: 'assets/images/passrate/passrate2.png',
        passrate3: 'assets/images/passrate/passrate3.png',
        passrate4: 'assets/images/passrate/passrate4.png',
        passrate5: 'assets/images/passrate/passrate5.png',
        passrate6: 'assets/images/passrate/passrate6.png',
        passrate7: 'assets/images/passrate/passrate7.png',
        passrate8: 'assets/images/passrate/passrate8.png',
        passrate9: 'assets/images/passrate/passrate9.png',
        passrate10: 'assets/images/passrate/passrate10.png',
        passrate11: 'assets/images/passrate/passrate11.png',
        passrate12: 'assets/images/passrate/passrate12.png',
        passrate13: 'assets/images/passrate/passrate13.png',
        passrate14: 'assets/images/passrate/passrate14.png',
    }
    
    EchartsMap() {
        this.MapList = [
            { name: '南宁市', value: 154717.48, ranking: 1, passrate: '10%', acceptTotal: '200', passrateTotal: '20' },
            { name: '崇左市', value: 531686.1, ranking: 2, passrate: '10%', acceptTotal: '200', passrateTotal: '20' },
            { name: '北海市', value: 535477.48, ranking: 3, passrate: '10%', acceptTotal: '200', passrateTotal: '20' },
            { name: '柳州市', value: 511686.1, ranking: 4, passrate: '10%', acceptTotal: '200', passrateTotal: '20' },
            { name: '河池市', value: 325477.48, ranking: 5, passrate: '10%', acceptTotal: '200', passrateTotal: '20' },
            { name: '桂林市', value: 69686.1, ranking: 6, passrate: '10%', acceptTotal: '200', passrateTotal: '20' },
            { name: '贺州市', value: 155477.48, ranking: 7, passrate: '10%', acceptTotal: '200', passrateTotal: '20' },
            { name: '梧州市', value: 321686.1, ranking: 8, passrate: '10%', acceptTotal: '200', passrateTotal: '20' },
            { name: '玉林市', value: 259477.48, ranking: 9, passrate: '10%', acceptTotal: '200', passrateTotal: '20' },
            { name: '钦州市', value: 61686.1, ranking: 10, passrate: '10%', acceptTotal: '200', passrateTotal: '20' },
            { name: '百色市', value: 41686.1, ranking: 11, passrate: '10%', acceptTotal: '200', passrateTotal: '20' },
            { name: '来宾市', value: 11686.1, ranking: 12, passrate: '10%', acceptTotal: '200', passrateTotal: '20' },
            { name: '贵港市', value: 361686.1, ranking: 13, passrate: '10%', acceptTotal: '200', passrateTotal: '20' },
            { name: '防城港市', value: 761686.1, ranking: 14, passrate: '10%', acceptTotal: '200', passrateTotal: '20' },
        ];
        this.http.get('assets/guangxi.json').subscribe((e) => {
            this.echarts.registerMap('广西壮族自治区', e);
            this.map = {
                visualMap: {
                    show: false,
                    min: 10000,
                    max: 500000,
                    text: ['高', '低'],
                    realtime: false,
                    calculable: true,
                    inRange: {
                        //color: ['#469ffb', '#42a5fc', '#24cbff', '#5b54e6', '#5142cc', '#494bda', '#d0b210', '#6b249a', '#6728a1', '#6b2499',]
                        color: ['#90ccff', '#2f98ff', '#074ec1']
                    },
                    textStyle: {
                        color: '#fff',
                    },
                    left: "10%",
                },

                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(255,255,255,0)',
                    formatter: function (params, ticket, callback) {
                        let retStr = `<div style="background-image:url('./assets/images/big2/img_bg_tk.png');background-size: 100% 100%;height:180px;width:250px;position:absolute;top:-100px">
                        <span style='font-size: 18px;margin-left:50px;margin-top: 40px; display: block;'> 一次性通过率：`+ params.data.passrate + ` </span>
                        <span style='color:#F6FF00;display: block;margin-left:50px;'>`+ params.data.name + `</span>
                        <span style='color:#F6FF00;display: block;margin-left:50px;'>排名：第`+ params.data.ranking + `</span>
                        <span style='color:#F6FF00;display: block;margin-left:50px;'>验收总数：`+ params.data.acceptTotal + `项</span>
                        <span style='color:#F6FF00;display: block;margin-left:50px;'> 一次性通过总数：` + params.data.passrateTotal + `项</span>
                    </div>`;
                        //  let retStr = '区县:';
                        // retStr += params.data.name + '<br />排名:'; //position:absolute
                        // retStr += params.data.ranking  +  '<br />通过率:';
                        // retStr += params.data.passrate  +  '<br />验收总数:';
                        // retStr += params.data.acceptTotal  +  '<br />一次性通过总数:';
                        // retStr += params.data.passrateTotal ;
                        return retStr;
                    }
                },
                series: [
                    {
                        type: 'map',
                        mapType: '广西壮族自治区',
                        zoom: 1.2,
                        label: {
                            normal: {
                                show: true,
                                formatter: function (params) {
                                    if (params.data.ranking == 1) {
                                        return params.name + '\n' + '{passrate1|}';
                                    } else if (params.data.ranking == 2) {
                                        return params.name + '\n' + '{passrate2|}';
                                    } else if (params.data.ranking == 3) {
                                        return params.name + '\n' + '{passrate3|}';
                                    } else if (params.data.ranking == 4) {
                                        return params.name + '\n' + '{passrate4|}';
                                    } else if (params.data.ranking == 5) {
                                        return params.name + '\n' + '{passrate5|}';
                                    } else if (params.data.ranking == 6) {
                                        return params.name + '\n' + '{passrate6|}';
                                    } else if (params.data.ranking == 7) {
                                        return params.name + '\n' + '{passrate7|}';
                                    } else if (params.data.ranking == 8) {
                                        return params.name + '\n' + '{passrate8|}';
                                    } else if (params.data.ranking == 9) {
                                        return params.name + '\n' + '{passrate9|}';
                                    } else if (params.data.ranking == 10) {
                                        return params.name + '\n' + '{passrate10|}';
                                    } else if (params.data.ranking == 11) {
                                        return params.name + '\n' + '{passrate11|}';
                                    } else if (params.data.ranking == 12) {
                                        return params.name + '\n' + '{passrate12|}';
                                    } else if (params.data.ranking == 13) {
                                        return params.name + '\n' + '{passrate13|}';
                                    } else if (params.data.ranking == 14) {
                                        return params.name + '\n' + '{passrate14|}';
                                    }
                                    else {
                                        return params.name;
                                    }
                                },
                                rich: {
                                    passrate1: {
                                        backgroundColor: {
                                            image: this.Icon.passrate1,
                                        },
                                        height: 42,
                                        width: 75
                                    },
                                    passrate2: {
                                        backgroundColor: {
                                            image: this.Icon.passrate2,
                                        },
                                        height: 42,
                                        width: 75
                                    },
                                    passrate3: {
                                        backgroundColor: {
                                            image: this.Icon.passrate3,
                                        },
                                        height: 42,
                                        width: 75
                                    },
                                    passrate4: {
                                        backgroundColor: {
                                            image: this.Icon.passrate4,
                                        },
                                        height: 42,
                                        width: 75
                                    },
                                    passrate5: {
                                        backgroundColor: {
                                            image: this.Icon.passrate5,
                                        },
                                        height: 42,
                                        width: 75
                                    },
                                    passrate6: {
                                        backgroundColor: {
                                            image: this.Icon.passrate6,
                                        },
                                        height: 42,
                                        width: 75
                                    },
                                    passrate7: {
                                        backgroundColor: {
                                            image: this.Icon.passrate7,
                                        },
                                        height: 42,
                                        width: 75
                                    },
                                    passrate8: {
                                        backgroundColor: {
                                            image: this.Icon.passrate8,
                                        },
                                        height: 42,
                                        width: 75
                                    },
                                    passrate9: {
                                        backgroundColor: {
                                            image: this.Icon.passrate9,
                                        },
                                        height: 42,
                                        width: 75
                                    },
                                    passrate10: {
                                        backgroundColor: {
                                            image: this.Icon.passrate10,
                                        },
                                        height: 42,
                                        width: 75
                                    },
                                    passrate11: {
                                        backgroundColor: {
                                            image: this.Icon.passrate11,
                                        },
                                        height: 42,
                                        width: 75
                                    },
                                    passrate12: {
                                        backgroundColor: {
                                            image: this.Icon.passrate12,
                                        },
                                        height: 42,
                                        width: 75
                                    },
                                    passrate13: {
                                        backgroundColor: {
                                            image: this.Icon.passrate13,
                                        },
                                        height: 42,
                                        width: 75
                                    },
                                    passrate14: {
                                        backgroundColor: {
                                            image: this.Icon.passrate14,
                                        },
                                        height: 42,
                                        width: 75
                                    },
                                }
                            }
                        },
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        // label: {
                        //     normal: {
                        //         textStyle: {
                        //             color: '#fff'
                        //         }
                        //     }
                        // },
                        data: this.MapList
                    }
                ]
            };
            this.myChart = this.echarts.init(document.getElementById('echarts'));
            this.myChart.setOption(this.map);
            var faultByHourIndex = 0; //播放所在下标
            var faultByHourTime = setInterval(() => {
                //使得tootip每隔三秒自动显示
                this.myChart.dispatchAction({
                    type: "showTip", // 根据 tooltip 的配置项显示提示框。
                    seriesIndex: 0,
                    dataIndex: faultByHourIndex
                });
                faultByHourIndex++;
                // faultRateOption.series[0].data.length 是已报名纵坐标数据的长度
                if (faultByHourIndex > this.MapList.length) {
                    faultByHourIndex = 0;
                }
            }, 3000);
        });

    }
}
