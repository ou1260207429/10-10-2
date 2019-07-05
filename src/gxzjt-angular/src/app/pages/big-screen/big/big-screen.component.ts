import { ProjectFlowServcieServiceProxy, ScreenServiceServiceProxy, ScreenTimeoutStatisticsQueryDto, DeclareRateQueryDto, YearApplyNumberQueryDto } from './../../../../shared/service-proxies/service-proxies';
import { OnInit, Component } from "@angular/core";
import { _HttpClient } from "@delon/theme";
import {  URL_CONFIG } from 'infrastructure/expression';
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
    SignInData = [0, 0, 0, 1, 0, 0, 8, 6];
    GetThrough = [0, 0, 2, 3, 4, 8, 9, 0];
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
        this.Pie1();
        this.Pie2();
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
        this.GetScreenCityTimeoutStatistics();
        this.GetApplyStatistics();
        this.GetScreenYearApplyNumber();
        this.GetScreenTimeoutList();
        this.GetFireDataList();
        this.GetATimeByStatistics();
        setInterval(() => {
            this.ScreenTimeoutChangePage();
            this.ScreenYearApplyChangePage();
        }, 10000);
        setInterval(() => {
            this.Post_GetDeclareRate();
            this.GetScreenCityTimeoutStatistics();
            this.GetApplyStatistics();
            this.GetScreenYearApplyNumber();
            this.GetScreenTimeoutList();
            this.GetFireDataList();
            this.GetATimeByStatistics();
        }, 10 * 60 * 1000)
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
            console.log(res);
            if (res.items != null) {
                res.items.forEach(e => {
                    switch (e.cityName) {
                        case '防城港市':
                            e.fireAuditNumber = e.fireAuditNumber + 37;
                            e.fireCompleteNumber = e.fireCompleteNumber + 18;
                            e.completeNumber = e.completeNumber + 19;
                            break;
                        case '钦州市':
                            e.fireAuditNumber = e.fireAuditNumber + 46;
                            e.fireCompleteNumber = e.fireCompleteNumber + 35;
                            e.completeNumber = e.completeNumber + 16;
                            break;
                        case '梧州市':
                            e.fireAuditNumber = e.fireAuditNumber + 27;
                            e.fireCompleteNumber = e.fireCompleteNumber + 11;
                            e.completeNumber = e.completeNumber + 11;
                            break;
                        case '贺州市':
                            e.fireAuditNumber = e.fireAuditNumber + 31;
                            e.fireCompleteNumber = e.fireCompleteNumber + 8;
                            e.completeNumber = e.completeNumber + 8;
                            break;
                        case '崇左市':
                            e.fireAuditNumber = e.fireAuditNumber + 31;
                            e.fireCompleteNumber = e.fireCompleteNumber + 14;
                            e.completeNumber = e.completeNumber + 12;
                            break;
                        case '百色市':
                            e.fireAuditNumber = e.fireAuditNumber + 27;
                            e.fireCompleteNumber = e.fireCompleteNumber + 30;
                            e.completeNumber = e.completeNumber + 20;
                            break;
                        case '柳州市':
                            e.fireAuditNumber = e.fireAuditNumber + 53;
                            e.fireCompleteNumber = e.fireCompleteNumber + 65;
                            e.completeNumber = e.completeNumber + 65;
                            break;
                        case '河池市':
                            e.fireAuditNumber = e.fireAuditNumber + 34;
                            e.fireCompleteNumber = e.fireCompleteNumber + 14;
                            e.completeNumber = e.completeNumber + 23;
                            break;
                        case '桂林市':
                            e.fireAuditNumber = e.fireAuditNumber + 75;
                            e.fireCompleteNumber = e.fireCompleteNumber + 25;
                            e.completeNumber = e.completeNumber + 47;
                            break;
                        case '贵港市':
                            e.fireAuditNumber = e.fireAuditNumber + 47;
                            e.fireCompleteNumber = e.fireCompleteNumber + 29;
                            e.completeNumber = e.completeNumber + 27;
                            break;
                        case '北海市':
                            e.fireAuditNumber = e.fireAuditNumber + 20;
                            e.fireCompleteNumber = e.fireCompleteNumber + 19;
                            e.completeNumber = e.completeNumber + 25;
                            break;
                        case '来宾市':
                            e.fireAuditNumber = e.fireAuditNumber + 40;
                            e.fireCompleteNumber = e.fireCompleteNumber + 15;
                            e.completeNumber = e.completeNumber + 13;
                            break;
                        case '玉林市':
                            e.fireAuditNumber = e.fireAuditNumber + 80;
                            e.fireCompleteNumber = e.fireCompleteNumber + 20;
                            e.completeNumber = e.completeNumber + 18;
                            break;
                        case '南宁市':

                            break;
                    };
                    switch (e.flowPathType) {
                        case 1:
                            fireAudit.push(e.fireAuditNumber);
                            CityList.push(e.cityName);
                            break;
                        case 2:
                            fireComplete.push(e.fireCompleteNumber);
                            break;
                        case 3:
                            completeList.push(e.completeNumber);
                            break;
                    }

                });
                this.OverTimeBar1(CityList, fireAudit);
                this.OverTimeBar2(CityList, fireComplete);
                this.OverTimeBar3(CityList, completeList);
            }
        });
    }
    // 一次性通过率
    GetATimeByStatistics() {
        const CityList = [];

        const fireAuditList = [];
        const fireCompleteList = [];
        const completeList = [];
        this.screenService.post_GetATimeByStatistics().subscribe((res) => {
            console.log(res);
            if (res.items != null) {
                res.items.forEach(e => {
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

            this.Line2(CityList, fireAuditList, fireCompleteList, completeList);
            // this.Bar3(CityList, flowPathTypeList);
            // this.Bar4(CityList, fireComplete);
        });
    }
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
                    switch (e.cityName) {
                        case '防城港市':
                            e.fireAuditNumber = e.fireAuditNumber + 11;
                            e.fireCompleteNumber = e.fireCompleteNumber + 0;
                            e.completeNumber = e.completeNumber + 0;
                            break;
                        case '钦州市':
                            e.fireAuditNumber = e.fireAuditNumber + 2;
                            e.fireCompleteNumber = e.fireCompleteNumber + 2;
                            e.completeNumber = e.completeNumber + 0;
                            break;
                        case '梧州市':
                            e.fireAuditNumber = e.fireAuditNumber + 0;
                            e.fireCompleteNumber = e.fireCompleteNumber + 0;
                            e.completeNumber = e.completeNumber + 0;
                            break;
                        case '贺州市':
                            e.fireAuditNumber = e.fireAuditNumber + 0;
                            e.fireCompleteNumber = e.fireCompleteNumber + 0;
                            e.completeNumber = e.completeNumber + 0;
                            break;
                        case '崇左市':
                            e.fireAuditNumber = e.fireAuditNumber + 1;
                            e.fireCompleteNumber = e.fireCompleteNumber + 0;
                            e.completeNumber = e.completeNumber + 0;
                            break;
                        case '百色市':
                            e.fireAuditNumber = e.fireAuditNumber + 8;
                            e.fireCompleteNumber = e.fireCompleteNumber + 13;
                            e.completeNumber = e.completeNumber + 1;
                            break;
                        case '柳州市':
                            e.fireAuditNumber = e.fireAuditNumber + 1;
                            e.fireCompleteNumber = e.fireCompleteNumber + 18;
                            e.completeNumber = e.completeNumber + 1;
                            break;
                        case '河池市':
                            e.fireAuditNumber = e.fireAuditNumber + 0;
                            e.fireCompleteNumber = e.fireCompleteNumber + 0;
                            e.completeNumber = e.completeNumber + 0;
                            break;
                        case '桂林市':
                            e.fireAuditNumber = e.fireAuditNumber + 0;
                            e.fireCompleteNumber = e.fireCompleteNumber + 0;
                            e.completeNumber = e.completeNumber + 0;
                            break;
                        case '贵港市':
                            e.fireAuditNumber = e.fireAuditNumber + 0;
                            e.fireCompleteNumber = e.fireCompleteNumber + 0;
                            e.completeNumber = e.completeNumber + 0;
                            break;
                        case '北海市':
                            e.fireAuditNumber = e.fireAuditNumber + 0;
                            e.fireCompleteNumber = e.fireCompleteNumber + 0;
                            e.completeNumber = e.completeNumber + 0;
                            break;
                        case '来宾市':
                            e.fireAuditNumber = e.fireAuditNumber + 0;
                            e.fireCompleteNumber = e.fireCompleteNumber + 0;
                            e.completeNumber = e.completeNumber + 0;
                            break;
                        case '玉林市':
                            e.fireAuditNumber = e.fireAuditNumber + 0;
                            e.fireCompleteNumber = e.fireCompleteNumber + 0;
                            e.completeNumber = e.completeNumber + 0;
                            break;
                        case '南宁市':

                            break;
                    };
                    switch (e.flowPathType) {
                        case 1:
                            CityList.push(e.cityName);
                            fireAuditList.push(e.fireAuditNumber);
                            break;
                        case 2:
                            fireCompleteList.push(e.fireCompleteNumber);
                            break;
                        case 3:
                            completeList.push(e.completeNumber);
                            break;
                    }



                });
            }
            this.Bar2(CityList, fireAuditList);
            this.Bar3(CityList, fireCompleteList);
            this.Bar4(CityList, completeList);
        })
    }
    // 累计办理情况
    ScreenYearApplyData: any = [];
    ScreenYearApplyNumBer = 0;
    GetScreenYearApplyNumber() {
        let model: any = {
            dateTimeNow: new Date(),
            startDateTime: null,
            endDateTime: new Date(),
            completeStatus: 2,
            page: 1,
            sorting: "CityName",
            skipCount: 0,
            maxResultCount: 5
        };
        model.page = this.ScreenYearApplyPage;
        model.startDateTime = (new Date().getFullYear() + '-01-01');
        this.screenService.post_GetScreenYearApplyNumber(model).subscribe(res => {
            this.ScreenYearApplyData = res.data;
            if (res.total % 5 === 0) {
                this.ScreenTimeoutNumBer = res.total / 5;
            } else {
                this.ScreenTimeoutNumBer = Math.ceil(res.total / 5);
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
        let model: any = {
            startTime: new Date(),
            endTime: null,
        };
        model.endTime = new Date(new Date().getFullYear() - 1 + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());
        this.screenService.post_GetApplyStatistics(model).subscribe(res => {
            // this.ApplyStatistics = res;
            this.statisticsNumberCount = res.statisticsNumberCount + 429;
            this.fireCompleteNumberCount = res.fireCompleteNumberCount + 209;
            this.completeNumberCount = res.completeNumberCount + 276;
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
    ScreenTimeoutTotal = 0;
    GetScreenTimeoutList() {
        let model: any = {
            dateTimeNow: new Date(),
            orderStatus: 2,
            page: 1,
            sorting: "ProjectName",
            skipCount: 0,
            maxResultCount: 3,
        };
        model.page = this.ScreenTimeoutPage;
        this.screenService.post_GetScreenTimeoutList(model).subscribe(res => {
            this.ScreenTimeoutList = res.data;
            if (res.total % 3 === 0) {
                this.ScreenTimeoutNumBer = res.total / 3;
            } else {
                this.ScreenTimeoutNumBer = Math.ceil(res.total / 3);
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
    GetFireDataList() {
        let model: any = {
            startDateTime: null,
            dateTimeNow: new Date(),
            processedStatus: 2
        };
        model.startDateTime = (new Date().getFullYear() + '-01-01');
        this.http.post( URL_CONFIG.getInstance().SERVER_URL + 'api/services/app/ScreenService/Post_GetFireDataList', model).subscribe((res: any) => {
            let MapBackList = [];
            console.log(res);

            if (res.success) {
                res.result.forEach(e => {
                    switch (e.flowPathType) {
                        case 1:
                            this.FireData1 = e;
                            break;
                        case 2:
                            this.FireData2 = e;
                            break;
                        case 3:
                            this.FireData3 = e;
                            MapBackList = e.items;
                            break;
                    }

                });
                MapBackList.forEach(e => {
                    switch (e.cityName) {
                        case '防城港市':
                            e.aTimeByCountNumber = e.aTimeByCountNumber + 21;
                            e.timeoutCountNumber = e.timeoutCountNumber + 11;
                            e.completeCountNumber = e.completeCountNumber + 37 + 18 + 19;
                            e.avgCompleteTimeCountNumber = e.avgCompleteTimeCountNumber + 3;
                            break;
                        case '钦州市':
                            e.aTimeByCountNumber = e.aTimeByCountNumber + 67;
                            e.timeoutCountNumber = e.timeoutCountNumber + 4;
                            e.completeCountNumber = e.completeCountNumber + 16 + 35 + 46;
                            e.avgCompleteTimeCountNumber = e.avgCompleteTimeCountNumber + 3;
                            break;
                        case '梧州市':
                            e.aTimeByCountNumber = e.aTimeByCountNumber + 44;
                            e.timeoutCountNumber = e.timeoutCountNumber;
                            e.completeCountNumber = e.completeCountNumber + 11 + 11 + 35;
                            e.avgCompleteTimeCountNumber = e.avgCompleteTimeCountNumber + 5;
                            break;
                        case '贺州市':
                            e.aTimeByCountNumber = e.aTimeByCountNumber + 40;
                            e.timeoutCountNumber = e.timeoutCountNumber;
                            e.completeCountNumber = e.completeCountNumber + 8 + 8 + 27;
                            e.avgCompleteTimeCountNumber = e.avgCompleteTimeCountNumber + 3;
                            break;
                        case '崇左市':
                            e.aTimeByCountNumber = e.aTimeByCountNumber + 33;
                            e.timeoutCountNumber = e.timeoutCountNumber + 1;
                            e.completeCountNumber = e.completeCountNumber + 31 + 14 + 12;
                            e.avgCompleteTimeCountNumber = e.avgCompleteTimeCountNumber + 5;
                            break;
                        case '百色市':
                            e.aTimeByCountNumber = e.aTimeByCountNumber + 62;
                            e.timeoutCountNumber = e.timeoutCountNumber + 8 + 13 + 1;
                            e.completeCountNumber = e.completeCountNumber + 27 + 30 + 20;
                            e.avgCompleteTimeCountNumber = e.avgCompleteTimeCountNumber + 6;
                            break;
                        case '柳州市':
                            e.aTimeByCountNumber = e.aTimeByCountNumber + 91;
                            e.timeoutCountNumber = e.timeoutCountNumber + 20;
                            e.completeCountNumber = e.completeCountNumber + 65 + 53 + 65;
                            e.avgCompleteTimeCountNumber = e.avgCompleteTimeCountNumber + 5;
                            break;
                        case '河池市':
                            e.aTimeByCountNumber = e.aTimeByCountNumber + 32;
                            e.timeoutCountNumber = e.timeoutCountNumber;
                            e.completeCountNumber = e.completeCountNumber + 23 + 14 + 34;
                            e.avgCompleteTimeCountNumber = e.avgCompleteTimeCountNumber +8;
                            break;
                        case '桂林市':
                            e.aTimeByCountNumber = e.aTimeByCountNumber + 92;
                            e.timeoutCountNumber = e.timeoutCountNumber;
                            e.completeCountNumber = e.completeCountNumber + 75 + 25 + 47;
                            e.avgCompleteTimeCountNumber = e.avgCompleteTimeCountNumber + 5;
                            break;
                        case '贵港市':
                            e.aTimeByCountNumber = e.aTimeByCountNumber + 81;
                            e.timeoutCountNumber = e.timeoutCountNumber + 29;
                            e.completeCountNumber = e.completeCountNumber + 27 + 29 + 47;
                            e.avgCompleteTimeCountNumber = e.avgCompleteTimeCountNumber + 4;
                            break;
                        case '北海市':
                            e.aTimeByCountNumber = e.aTimeByCountNumber + 47;
                            e.timeoutCountNumber = e.timeoutCountNumber;
                            e.completeCountNumber = e.completeCountNumber + 25 + 20 + 19;
                            e.avgCompleteTimeCountNumber = e.avgCompleteTimeCountNumber + 5;
                            break;
                        case '来宾市':
                            e.aTimeByCountNumber = e.aTimeByCountNumber + 31;
                            e.timeoutCountNumber = e.timeoutCountNumber;
                            e.completeCountNumber = e.completeCountNumber + 13 + 15 + 40;
                            e.avgCompleteTimeCountNumber = e.avgCompleteTimeCountNumber + 5;
                            break;
                        case '玉林市':
                            e.aTimeByCountNumber = e.aTimeByCountNumber + 99;
                            e.timeoutCountNumber = e.timeoutCountNumber;
                            e.completeCountNumber = e.completeCountNumber + 18 + 80 + 20;
                            e.avgCompleteTimeCountNumber = e.avgCompleteTimeCountNumber + 4;
                            break;
                        case '南宁市':

                            break;
                    };
                    this.MapList.push({
                        name: e.cityName,
                        value: e.completeCountNumber,
                        aTimeByCountNumber: e.aTimeByCountNumber,
                        avgCompleteTimeCountNumber: e.avgCompleteTimeCountNumber,
                        timeoutCountNumber: e.timeoutCountNumber
                    });
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

            }

            this.EchartsMap();
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
    Pie1() {
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
                data: ['消防设计审查', '竣工验收备案', '消防验收'],
                textStyle: {
                    color: '#fff'
                },
                padding: [50, 0, 0, 0]
            },
            series: [

                {
                    // name: '数量',
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
                data: ['消防设计审查', '竣工验收备案', '消防验收'],
                textStyle: {
                    color: '#fff'
                },
                padding: [50, 0, 0, 0]
            },
            series: [

                {
                    // name: '数量',
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
                        <span style='color:#F6FF00;margin-left:60px;display: block;'> 平均办理时长：`+ params.data.avgCompleteTimeCountNumber + `</span>
                    </div>
                        `
                        //     let retStr = `<div style="background-image:url('./assets/images/big2/img_bg_tk.png');background-size: 100% 100%;height:180px;width:250px;position:absolute;top:-100px">
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
        return Math.floor(num);
    }
}
