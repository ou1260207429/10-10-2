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
        this.OverTimeBar1();
        this.OverTimeBar2();
        this.OverTimeBar3();
        this.Bar2();
        this.Bar3();
        this.Bar4();
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
        this.GetATimeByStatistics();
        this.GetScreenCityTimeoutStatistics();
        this.GetApplyStatistics();
        this.GetFireDataList();
        this.GetScreenYearApplyNumber();
        this.GetScreenTimeoutList();
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
            if (res != null) {
                // res.forEach(e => {
                //     CityList.push(e.cityName);
                //     completeList.push(e.completeNumber);
                //     fireAudit.push(e.fireAuditNumber);
                //     fireComplete.push(e.fireCompleteNumber);
                // });
                // this.OverTimeBar1(CityList, completeList);
                // this.OverTimeBar2(CityList, fireAudit);
                // this.OverTimeBar3(CityList, fireComplete);
            }
        });
    }
    // 一次性通过率
    GetATimeByStatistics() {
        const CityList = [];
        const flowPathTypeList = [];
        const throughRateList = [];
        this.screenService.post_GetATimeByStatistics().subscribe((res) => {
            console.log(res);
            if (res != null) {
                // res.forEach(e => {
                //     CityList.push(e.cityName);
                //     flowPathTypeList.push(e.flowPathType);
                //     throughRateList.push(e.throughRate);
                // });
            }

            // this.Line(CityList, flowPathTypeList, throughRateList);
            // this.Bar3(CityList, flowPathTypeList);
            // this.Bar4(CityList, fireComplete);
        });
    }
    // 超时统计
    GetScreenCityTimeoutStatistics() {
        let model: any = {
            dateTimeNow: new Date()
        };
        model.dateTimeNow = new Date();
        this.screenService.post_GetScreenCityTimeoutStatistics(model).subscribe((res) => {
            console.log(res);
        })
    }
    // 累计办理情况
    GetScreenYearApplyNumber() {
        let model: any = {
            dateTimeNow: new Date(),
            startDateTime: "2019-02-17T03:50:49.853Z",
            endDateTime: new Date(),
            completeStatus: 2,
            page: 1,
            sorting: "CityName",
            skipCount: 0,
            maxResultCount: 10
        };
        this.screenService.post_GetScreenYearApplyNumber(model).subscribe(res => {
            console.log(res);
        });
    }
    // 申请 办结
    GetApplyStatistics() {
        let model: any = {
            startTime: new Date(),
            endTime: new Date(),
        }
        this.screenService.post_GetApplyStatistics(model).subscribe(res => {
            console.log(res);
        });
    }
    // 超时办理
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
            console.log(res);
        });
    }
    // 消防统计数据
    GetFireDataList() {
        let model: any = {
            statisticsType: 0,
            dateTimeNow: new Date(),
            processedStatus: 0
        }
        this.screenService.post_GetFireDataList(model).subscribe(res => {
            console.log(res);

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
                data: ['南宁', '崇左', '北海', '柳州', '河池', '桂林', '贺州', '梧州', '玉林', '钦州', '白色', '来宾', '贵港'],
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
                    textStyle: {
                        color: '#fff'
                    },
                },
                max: 'dataMax',
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
                    data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330],
                    type: 'line',
                    // areaStyle: {
                    //     color: '#201756',
                    // },
                    itemStyle: {
                        color: '#9013fe',
                    }
                },
                {
                    data: [820, 932, 901, 901, 934, 1290, 1330, 934, 1290, 1330, 1320, 820, 932,],
                    type: 'line',
                    // areaStyle: {
                    //     color: '#201756',
                    // },
                    itemStyle: {
                        color: 'red',
                    }
                },
                {
                    data: [1320, 820, 932, 901, 934, 1290, 820, 932, 901, 934, 1290, 1330, , 1330],
                    type: 'line',
                    // areaStyle: {
                    //     color: '#201756',
                    // },
                    itemStyle: {
                        color: '#008000',
                    }
                },
            ]
        };
    }
    OverTimebar1: any;
    OverTimeBar1() { //city, data
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
                    data: ['南宁', '崇左', '北海', '柳州', '河池', '桂林', '贺州', '梧州', '玉林', '钦州', '白色', '来宾', '贵港'],
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
                    data: [5, 8, 5, 7, 10, 18, 6, 7, 9, 10, 13, 8, 3],
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
    OverTimeBar2() { //city, data
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
                    data: ['南宁', '崇左', '北海', '柳州', '河池', '桂林', '贺州', '梧州', '玉林', '钦州', '白色', '来宾', '贵港'],
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
                    data: [5, 8, 5, 7, 10, 18, 6, 7, 9, 10, 13, 8, 3],
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
    OverTimeBar3() { //city, data
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
                    data: ['南宁', '崇左', '北海', '柳州', '河池', '桂林', '贺州', '梧州', '玉林', '钦州', '白色', '来宾', '贵港'],
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
                    data: [5, 8, 5, 7, 10, 18, 6, 7, 9, 10, 13, 8, 3],
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
    Bar2() { //city, data
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
                    data: ['南宁', '崇左', '北海', '柳州', '河池', '桂林', '贺州', '梧州', '玉林', '钦州', '白色', '来宾', '贵港'],
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
                    data: [5, 8, 5, 7, 10, 18, 6, 7, 9, 10, 13, 8, 3],
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
    Bar3() { //city, data
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
                    data: ['南宁', '崇左', '北海', '柳州', '河池', '桂林', '贺州', '梧州', '玉林', '钦州', '白色', '来宾', '贵港'],
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
                    data: [5, 8, 5, 7, 10, 18, 6, 7, 9, 10, 13, 8, 3],
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
    Bar4() { //city, data
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
                    data: ['南宁', '崇左', '北海', '柳州', '河池', '桂林', '贺州', '梧州', '玉林', '钦州', '白色', '来宾', '贵港'],
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
                    data: [5, 8, 5, 7, 10, 18, 6, 7, 9, 10, 13, 8, 3],
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
            // title: {
            //     left: 'left',
            //     text: '消防设计审查数量',
            //     textStyle: {
            //         color: '#fff',
            //         fontSize: 14,
            //         fontWeight: '400',
            //     },
            //     padding: [50, 0, 0, 50]
            // },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            // legend: {
            //     x: 'right',
            //     orient: 'vertical',
            //     data: ['日数量', '月数量', '季度数量'],
            //     padding: [20, 50, 0, 0],
            //     textStyle: {
            //         color: '#fff'
            //     },
            // },
            series: [

                {
                    name: '数量',
                    type: 'pie',
                    radius: [30, 50],
                    data: [
                        { value: 1, name: '日数量', itemStyle: { color: '#24e236' } },
                        { value: 5, name: '月数量', itemStyle: { color: '#e5ee28' } },
                        { value: 20, name: '季度数量', itemStyle: { color: '#16c9cf' } },

                    ]
                }
            ]
        };
    }
    pie2: any;
    Pie2() {
        this.pie2 = {
            // title: {
            //     left: 'left',
            //     text: '消防竣工验收数量',
            //     textStyle: {
            //         color: '#fff',
            //         fontSize: 14,
            //         fontWeight: '400',
            //     },
            //     padding: [50, 0, 0, 50]
            // },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            // legend: {
            //     x: 'right',
            //     orient: 'vertical',
            //     data: ['日数量', '月数量', '季度数量'],
            //     padding: [20, 50, 0, 0],
            //     textStyle: {
            //         color: '#fff'
            //     },
            // },

            series: [

                {
                    name: '数量',
                    type: 'pie',
                    radius: [30, 50],
                    data: [
                        { value: 3, name: '日数量', itemStyle: { color: '#24d5e2' } },
                        { value: 15, name: '月数量', itemStyle: { color: '#2886ee' } },
                        { value: 8, name: '季度数量', itemStyle: { color: '#f8d830' } },

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
            //     data: ['南宁', '崇左', '北海', '柳州', '河池', '桂林', '贺州', '梧州', '玉林', '钦州', '白色', '来宾', '贵港'],
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
                        { value: 335, name: '白色' },
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
            //     data: ['南宁', '崇左', '北海', '柳州', '河池', '桂林', '贺州', '梧州', '玉林', '钦州', '白色', '来宾', '贵港'],
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
                        { value: 335, name: '白色' },
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
            //     data: ['南宁', '崇左', '北海', '柳州', '河池', '桂林', '贺州', '梧州', '玉林', '钦州', '白色', '来宾', '贵港'],
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
                        { value: 335, name: '白色' },
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

                // tooltip: {
                //     trigger: 'item',
                //     formatter: function (params, ticket, callback) {
                //         let retStr = '区县:';
                //         retStr += params.data.name + '<br />数量:';
                //         retStr += params.data.ele.value;
                //         return retStr;
                //     }
                // },
                series: [
                    {
                        type: 'map',
                        mapType: '广西壮族自治区',
                        zoom: 1.2,
                        itemStyle: {
                            normal: { label: { show: true } },
                            emphasis: { label: { show: true } }
                        },
                        label: {
                            normal: {
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },
                        data: [
                            { name: '南宁市', value: 154717.48 },
                            { name: '崇左市', value: 531686.1 },
                            { name: '北海市', value: 535477.48 },
                            { name: '柳州市', value: 511686.1 },
                            { name: '河池市', value: 325477.48 },
                            { name: '桂林市', value: 69686.1 },
                            { name: '贺州市', value: 155477.48 },
                            { name: '梧州市', value: 321686.1 },
                            { name: '玉林市', value: 259477.48 },
                            { name: '钦州市', value: 61686.1 },
                            { name: '百色市', value: 41686.1 },
                            { name: '来宾市', value: 11686.1 },
                            { name: '贵港市', value: 361686.1 },
                            { name: '防城港市', value: 761686.1 },
                        ]
                    }
                ]
            };
            this.myChart = this.echarts.init(document.getElementById('echarts'));
            this.myChart.setOption(this.map);
        });

    }
}
