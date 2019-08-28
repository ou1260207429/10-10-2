import { ProjectFlowServcieServiceProxy, ScreenServiceServiceProxy } from './../../../../shared/service-proxies/service-proxies';
import { OnInit, Component } from "@angular/core";
import { _HttpClient } from "@delon/theme";

import { URLConfig } from "@shared/config/host";
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
    NewYear = new Date().getFullYear();
    clientHeight = 0; //  屏幕可视高度
    clientWidth = 0;
    FireWidth = '';
    FireHeight = '';
    MiddleWidth = '';
    RightWidth = '';
    SignInData = [];
    GetThrough = [];
    rankingData = [
    ]
    constructor(
        private http: _HttpClient,
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
            };

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
        this.GetApplyStatistics();
        this.GetScreenYearApplyNumber();
        this.GetScreenTimeoutList();
        this.GetFireDataList();
        this.GetATimeByStatistics();
        this.post_GetFireDataSumList();
        this.Post_GetApplyRate();
        this.Post_GetUserNum();
        // setInterval(() => {
        //     this.ScreenTimeoutChangePage();
        //     this.ScreenYearApplyChangePage();
        // }, 10000);
        setInterval(() => {
            this.Post_GetDeclareRate();
            this.GetApplyStatistics();
            this.GetScreenYearApplyNumber();
            this.GetScreenTimeoutList();
            this.GetFireDataList();
            this.GetATimeByStatistics();
            this.post_GetFireDataSumList();
            this.Post_GetUserNum();
        }, 10 * 60 * 1000)
    }
    // model = new DeclareRateQueryDto();
    Post_GetUserNum(){
        this.SignInData = [];
        this.screenService.post_GetUserNum().subscribe((res:any)=>{
            if(res.data!=null){
                const aaa =JSON.stringify(res.data[0].userNum);
                for (let i = 0; i < 8 - aaa.split("").length; i++) {
                    this.SignInData.push(0);
                }
                aaa.split("").forEach(e => {
                    this.SignInData.push(e);
                });
            }
        });
    }
    //申报统计
    Post_GetDeclareRate() {
        // this.model.processedStatus = 2;
        const CityList = [];
        const completeList = [];
        const fireAudit = [];
        const fireComplete = [];

        const OutTimecompleteList = [];
        const OutTimefireAudit = [];
        const OutTimefireComplete = [];

        this.screenService.post_GetDeclareRate().subscribe((res) => {
            if (res.data != null) {
                res.data.forEach(e => {
                    switch (e.flowPathType) {
                        case '1':
                            fireAudit.push(e.applyNumber);
                            CityList.push(e.cityName);
                            OutTimefireAudit.push(e.outTimeNumber);
                            break;
                        case '2':
                            fireComplete.push(e.applyNumber);
                            OutTimefireComplete.push(e.outTimeNumber);
                            break;
                        case '3':
                            completeList.push(e.applyNumber);
                            OutTimecompleteList.push(e.outTimeNumber);
                            break;
                    }

                });
                this.CityList.forEach(e => {
                    if (CityList.indexOf(e) === -1) {
                        CityList.push(e);
                        fireAudit.push(0);
                        fireComplete.push(0);
                        completeList.push(0);
                        OutTimefireAudit.push(0);
                        OutTimefireComplete.push(0);
                        OutTimecompleteList.push(0);
                    }
                });
                this.OverTimeBar1(CityList, fireAudit);
                this.OverTimeBar2(CityList, fireComplete);
                this.OverTimeBar3(CityList, completeList);

                this.Bar2(CityList, OutTimefireAudit);
                this.Bar3(CityList, OutTimefireComplete);
                this.Bar4(CityList, OutTimecompleteList);
            }
        });
    }
    // 各事项申报数量占比
    Post_GetApplyRate() {
        let Year1 = 0;
        let Year2 = 0;
        let Year3 = 0;
        let Month1 = 0;
        let Month2 = 0;
        let Month3 = 0;

        this.screenService.post_GetApplyRate().subscribe((res: any) => {

            res.data.forEach(e => {
                switch (e.flowPathType) {
                    case 1:
                        Year1 = e.numYear * 100;
                        Month1 = e.numMonth * 100;
                        break;

                    case 2:
                        Year2 = e.numYear * 100;
                        Month2 = e.numMonth * 100;
                        break;
                    case 3:
                        Year3 = e.numYear * 100;
                        Month3 = e.numMonth * 100;
                        break;
                }
            });
            Year1 = this.Floor(Year1);
            Year2 = this.Floor(Year2);
            Year3 = this.Floor(Year3);
            Month1 = this.Floor(Month1);
            Month2 = this.Floor(Month2);
            Month3 = this.Floor(Month3);
            this.Pie1(Year1, Year2, Year3);
            this.Pie2(Month1, Month2, Month3);
        });
    }
    // 一次性通过率
    GetATimeByStatistics() {
        const CityList = [];

        const fireAuditList = [];
        const fireCompleteList = [];
        const completeList = [];
        this.screenService.post_GetATimeByStatistics().subscribe((res) => {
            if (res.data != null) {
                res.data.forEach(e => {
                    switch (e.flowPathType) {
                        case 1:
                            fireAuditList.push(e.throughRate);
                            CityList.push(e.cityName);
                            break;
                        case 2:
                            fireCompleteList.push(e.throughRate);
                            break;
                        case 3:
                            completeList.push(e.throughRate);
                            break;
                    }
                });
            }
            this.CityList.forEach(e => {
                if (CityList.indexOf(e) === -1) {
                    CityList.push(e);
                    fireAuditList.push(0);
                    fireCompleteList.push(0);
                    completeList.push(0);
                }
            });
            this.Line2(CityList, fireAuditList, fireCompleteList, completeList);
        });
    }
    // 累计办理情况
    ScreenYearApplyData: any = [];
    ScreenYearApplyNumBer = 0;
    GetScreenYearApplyNumber() {
        let model: any = {
            page: 1,
            sorting: "cityName",
            skipCount: 0,
            maxResultCount: 4
        };
        model.page = this.ScreenYearApplyPage;
        this.screenService.post_GetScreenYearApplyNumber(model).subscribe(res => {
            this.ScreenYearApplyData = res.data;
            if (res.total <= 4) {
                if (res.total % 4 === 0) {
                    this.ScreenTimeoutNumBer = res.total / 4;
                } else {
                    this.ScreenTimeoutNumBer = Math.ceil(res.total / 4);
                }
            } else {
                this.ScreenTimeoutNumBer = 0;
            }
        });
    }
    ScreenYearApplyPage = 1;
    ScreenYearApplyChangePage() {
        if (this.ScreenTimeoutPage <= this.ScreenTimeoutNumBer) {
            this.ScreenYearApplyPage = this.ScreenYearApplyPage + 1;
            this.GetScreenYearApplyNumber();
        } else {
            this.ScreenYearApplyPage = 1;
            this.GetScreenYearApplyNumber();
        }
    }
    // 申请 办结
    ApplyStatistics1: any = 0; // 设计审查
    ApplyStatistics2: any = 0; // 消防竣工验收
    ApplyStatistics3: any = 0; // 竣工验收备查
    statisticsNumberCount: any = 0;
    fireCompleteNumberCount: any = 0;
    completeNumberCount: any = 0;
    GetApplyStatistics() {
        this.screenService.post_GetApplyStatistics().subscribe((res: any) => {
            res.data.forEach(e => {
                switch (e.flowPathType) {
                    case 1:
                        this.statisticsNumberCount = e.applyNumber;
                        this.ApplyStatistics1 = e.rate;
                        break;
                    case 2:
                        this.fireCompleteNumberCount = e.applyNumber;
                        this.ApplyStatistics2 = e.rate;
                        break;
                    case 3:
                        this.completeNumberCount = e.applyNumber;
                        this.ApplyStatistics3 = e.rate;
                        break;
                }
            });
        });
    }
    // 超时办理列表
    ScreenTimeoutList: any = [];
    ScreenTimeoutTotal = 0;
    GetScreenTimeoutList() {
        let model: any = {
            page: 1,
            sorting: "projectName",
            skipCount: 0,
            maxResultCount: 4
        };
        model.page = this.ScreenTimeoutPage;
        this.screenService.post_GetScreenTimeoutList(model).subscribe(res => {
            this.ScreenTimeoutList = res.data;
            if (res.total <= 4) {
                if (res.total % 4 === 0) {
                    this.ScreenTimeoutNumBer = res.total / 4;
                } else {
                    this.ScreenTimeoutNumBer = Math.ceil(res.total / 4);
                }
            } else {
                this.ScreenTimeoutNumBer = 0;
            }

        });
    }
    ScreenTimeoutNumBer = 0; // 翻页次数
    ScreenTimeoutPage = 1;
    ScreenTimeoutChangePage() {
        if (this.ScreenTimeoutPage <= this.ScreenTimeoutNumBer) {
            this.ScreenTimeoutPage = this.ScreenTimeoutPage + 1;
            this.GetScreenTimeoutList();
        } else {
            this.ScreenTimeoutPage = 1;
            this.GetScreenTimeoutList();
        }
    }
    FireData1: any;
    FireData2: any;
    FireData3: any;
    // 地图右边框数据(消防设计审查申报数量统计)
    MapList: any = [];
    fireAuditList = [];//消防设计
    fireCompleteList = [];//消防竣工验收
    completeList = [];//竣工验收备
    rankingTop3List = [];
    CityList = ['南宁市', '崇左市', '北海市', '柳州市', '河池市', '桂林市', '贺州市', '梧州市', '玉林市', '钦州市', '百色市', '来宾市', '贵港市', '防城港市']
    GetFireDataList() {
        this.rankingData = [];
        let CityName = [];
        this.MapList = [];
        this.rankingTop3List = [];
        this.screenService.post_GetFireDataList().subscribe((res: any) => {
            res.data.forEach(e => {
                CityName.push(e.cityName);
                this.MapList.push({
                    name: e.cityName,
                    value: e.completeNumber,
                    aTimeByCountNumber: e.aTimeByNumber,
                    avgCompleteTimeCountNumber: e.avgCompleteTimeNumber,
                    timeoutCountNumber: e.timeoutNumber
                });
            });
            this.CityList.forEach(e => {
                if (CityName.indexOf(e) === -1) {
                    this.MapList.push({
                        name: e,
                        value: 0,
                        aTimeByCountNumber: 0,
                        avgCompleteTimeCountNumber: 0,
                        timeoutCountNumber: 0
                    });
                }
            });

            this.rankingTop3List = this.MapList;
            for (let i = 3; i < this.rankingTop3List.length; i++) {
                this.rankingData.push(this.rankingTop3List[i]);
            }
            for (let i = 0; i < this.rankingData.length - 1; i++) {
                for (let j = 0; j < this.rankingData.length - 1 - i; j++) {
                    if (this.rankingData[j].completeCountNumber > this.rankingData[j + 1].completeCountNumber) {
                        var temp = this.rankingData[j];
                        this.rankingData[j] = this.rankingData[j + 1];
                        this.rankingData[j + 1] = temp;
                    }
                }
            }
            this.EchartsMap();

        });
    }
    post_GetFireDataSumList() {
        this.GetThrough = [];
        this.screenService.post_GetFireDataSumList().subscribe((res: any) => {
            res.data.forEach(e => {
                switch (e.flowPathType) {
                    case 1:
                        this.FireData1 = e;
                        break;
                    case 2:
                        this.FireData2 = e;
                        break;
                    case 3:
                        this.FireData3 = e;
                        break;
                }
            });
            let a = JSON.stringify(this.FireData1.completeNumber + this.FireData2.completeNumber + this.FireData3.completeNumber);
            for (let i = 0; i < 8 - a.split("").length; i++) {
                this.GetThrough.push(0);
            }
            a.split("").forEach(e => {
                this.GetThrough.push(e);
            });
            // this.Pie1();
        });

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
    option2: any;
    Line2(city, fireAuditList, fireCompleteList, completeList) {

        this.option2 = {
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
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}%',
                    textStyle: {
                        color: '#fff'
                    },
                },
                max: '100',
                min: '0',
                splitLine: {
                    show: false
                },
                axisTick: {
                    alignWithLabel: true
                },
            },
            legend: {
                x: 'center',
                data: ['消防设计审查', '消防验收', '竣工验收备案'],
                padding: [40, 0, 0, 0],
                textStyle: {
                    color: '#fff'
                },
            },
            series: [
                {
                    name: '消防设计审查',
                    data: fireAuditList,//[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                    type: 'line',
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    },
                    areaStyle: {
                        normal: {
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
                        //  添加渐变颜色
                        color: 'rgba(23, 255, 243)'
                    },
                },
                {
                    name: '消防验收',
                    data: fireCompleteList,//[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                    type: 'line',
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    },
                    areaStyle: {
                        normal: {
                            //  添加渐变颜色
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgba(255,100,97, 0.3)'  //  0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(255,100,97, 0)' //  100% 处的颜色
                                }],
                                globalCoord: false,  //  缺省为 false
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        }
                    },
                    itemStyle: {
                        //  添加渐变颜色
                        color: 'rgba(255,100,97)'
                    },
                },
                {
                    name: '竣工验收备案',
                    data: completeList,//[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

                    type: 'line',
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    },
                    areaStyle: {
                        normal: {
                            //  添加渐变颜色
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgba(235,100,251, 0.3)'  //  0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(235,100,251, 0)' //  100% 处的颜色
                                }],
                                globalCoord: false,  //  缺省为 false
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        }
                    },
                    itemStyle: {
                        //  添加渐变颜色
                        color: '#eb64fb'


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
    Pie1(num1, num2, num3) {
        this.pie1 = {
            title: {
                text: '本年',
                textStyle: {
                    color: '#f2f2f2',
                    fontSize: 20
                },
                subtextStyle: {
                    fontSize: 30,
                    color: ['#ff9d19']
                },
                x: '65%',
                y: 'center',
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['消防设计审查', '消防验收', '竣工验收备案'],
                textStyle: {
                    color: '#fff'
                },
                padding: [50, 0, 0, 0]
            },
            series: [

                {
                    name: '占比',
                    type: 'pie',
                    radius: [30, 50],
                    center: ['75%', '50%'],
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        {
                            value: num1, name: '消防设计审查', itemStyle: {
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
                            value: num2, name: '消防验收', itemStyle: {
                                normal: {
                                    color: '#01B4FF',
                                    shadowColor: '#01B4FF',
                                    borderWidth: 2,
                                    borderColor: '#01B4FF',
                                    shadowBlur: 10
                                }
                            }
                        },
                        {
                            value: num3, name: '竣工验收备案', itemStyle: {
                                normal: {
                                    color: '#0EF9B3',
                                    shadowColor: '#0EF9B3',
                                    borderWidth: 2,
                                    borderColor: '#0EF9B3',
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
    Pie2(num1, num2, num3) {

        this.pie2 = {
            title: {
                text: '本月',
                textStyle: {
                    color: '#f2f2f2',
                    fontSize: 20
                },
                subtextStyle: {
                    fontSize: 30,
                    color: ['#ff9d19']
                },
                x: '65%',
                y: 'center',
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['消防设计审查', '消防验收', '竣工验收备案'],
                textStyle: {
                    color: '#fff'
                },
                padding: [50, 0, 0, 0]
            },
            series: [

                {
                    name: '占比',
                    type: 'pie',
                    radius: [30, 50],
                    center: ['75%', '50%'],
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                    },

                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        {
                            value: num1, name: '消防设计审查', itemStyle: {
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
                            value: num2, name: '消防验收', itemStyle: {
                                normal: {
                                    color: '#01B4FF',
                                    shadowColor: '#01B4FF',
                                    borderWidth: 2,
                                    borderColor: '#01B4FF',
                                    shadowBlur: 10
                                }
                            }
                        },
                        ,
                        {
                            value: num3, name: '竣工验收备案', itemStyle: {
                                normal: {
                                    color: '#0EF9B3',
                                    shadowColor: '#0EF9B3',
                                    borderWidth: 2,
                                    borderColor: '#0EF9B3',
                                    shadowBlur: 10
                                }
                            }
                        }

                    ]
                }
            ]
        };
    }
    map: any;
    myChart: any;
    EchartsMap() {

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
                        let retStr = `
                        <div style="background-image:url('./assets/images/big2/img_bg_tk.png');background-size: 100% 100%;height: 210px;
                        width: 265px;position:absolute;top:-120px;left:-20px">
                        <span style='font-size: 18px;margin:50px 0 5px 60px; display: block;color:#fff'>
                            `+ params.data.name + `</span>
                        <span style='color:#F6FF00;margin-left:60px;margin-bottom:5px;display: block;'>申报数：`+ params.data.value + `</span>
                        <span style='color:#F6FF00;margin-left:60px;margin-bottom:5px;display: block;'>一次性通过数：`+ params.data.aTimeByCountNumber + `</span> 
                        <span style='color:#F6FF00;margin-left:60px;margin-bottom:5px;display: block;'> 超时数：`+ params.data.timeoutCountNumber + `</span>
                        <span style='color:#F6FF00;margin-left:60px;display: block;'> 平均办理时长：`+ params.data.avgCompleteTimeCountNumber + `天</span>
                    </div>
                        `
                        // let retStr = `<div style="background-image:url('./assets/images/big2/img_bg_tk.png');background-size: 100% 100%;height:180px;width:250px;position:absolute;top:-100px">
                        //     <span style='font-size: 18px;margin-left:50px;margin-top: 40px; display: block;'> 一次性通过率：`+ params.data.passrate + ` </span>
                        //     <span style='color:#F6FF00;display: block;margin-left:50px;'>`+ params.data.name + `</span>
                        //     <span style='color:#F6FF00;display: block;margin-left:50px;'>排名：第`+ params.data.ranking + `</span>
                        //     <span style='color:#F6FF00;display: block;margin-left:50px;'>验收总数：`+ params.data.acceptTotal + `项</span>
                        //     <span style='color:#F6FF00;display: block;margin-left:50px;'> 一次性通过总数：` + params.data.passrateTotal + `项</span>
                        // </div>`;
                        //  let retStr = '区县:';
                        // retStr += params.data.name + '<br />排名:'; //position:absolute
                        // retStr += params.data.ranking  +  '<br />通过率:';
                        // retStr += params.data.passrate  +  '<br />验收总数:';
                        // retStr += params.data.acceptTotal  +  '<br />一次性通过总数:';
                        // retStr += params.data.passrateTotal ;
                        return retStr;
                    },
                    show: true,
                    // position:[-50,0,0,0]
                },
                series: [
                    {
                        type: 'map',
                        mapType: '广西壮族自治区',
                        zoom: 1.2,
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
    Floor(num) {
        return Math.floor(num * 100) / 100;
    }
}
