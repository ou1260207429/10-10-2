import { _HttpClient } from '@delon/theme';
import { Component, OnInit } from '@angular/core';
import { ProjectFlowServcieServiceProxy } from '@shared/service-proxies/service-proxies';

/**
 * 系统首页
 */
@Component({
  selector: 'app-system-home',
  templateUrl: './system-home.component.html',
  styleUrls: ['./system-home.component.less']
})
export class SystemHomeComponent implements OnInit {
  echarts = require('echarts');
  pagesize = 4;
  pageindex = 1;
  data: any = [{}];
  constructor(
    private http: _HttpClient,
    private service: ProjectFlowServcieServiceProxy
  ) { }

  ngOnInit() {
    this.EchartsMap();
    this.GetData();
    this.GetProjectFlowIndexTopCount();
    this.GetProjectsTimeout();
    this.GetProjectFlowDataStatisticsType1();
    this.GetProjectFlowDataStatisticsType2();
    this.GetProjectFlowDataStatisticsType3();
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
            // color: ['#469ffb', '#42a5fc', '#24cbff', '#5b54e6', '#5142cc', '#494bda', '#d0b210', '#6b249a', '#6728a1', '#6b2499',]
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
  GetData() {
    this.data = [];
    for (let i = 0; i < 7; i++) {
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

    }
  }
  // Top数据
  TopData: any;
  GetProjectFlowIndexTopCount() {
    let model: any = {
      processedStatus: 2,
      fireAuditStatus: 3,
      fireCompleteStatus: 2,
      completeStatus: 3,
      dateTimeNow: new Date(),
    }
    this.service.post_GetProjectFlowIndexTopCount(model).subscribe(res => {
      this.TopData = res;
    });
  }
  // 超时列表
  pageIndex = 1;
  pageSize = 7;
  TimeOutData: any;
  GetProjectsTimeout() {
    let model: any = {
      processedStatus: 2,
      dateTimeNow: new Date(),
      sorting: 'ProjectId',
      skipCount: 0,
      page: 0,
      maxResultCount: 0,
    };
    model.page = this.pageIndex;
    model.maxResultCount = this.pageSize;
    this.service.post_GetProjectsTimeout(model).subscribe(res => {
      this.TimeOutData = res.data;
    });
  }
  PageIndexChange(e){
    this.pageIndex  = e;
    this.GetProjectsTimeout();
  }
  fireAuditData;
  // 消防设计审查申报数量统计
  // currentMonthCount1:any;
  // currentWeekCount1:any;
  // comparedMonthRate1:any;
  // comparedWeekRate1:any;
  FlowData1:any;
  GetProjectFlowDataStatisticsType1() {
    let model: any = {
      stateDate: new Date(),
      statisticsType: 1
    }
    this.service.post_GetProjectFlowDataStatistics(model).subscribe(res => {
      const Xdata = [];
      const YData = [];
      this.FlowData1 = res;
      res.items.forEach(e => {
        Xdata.push(new Date(e.dayTime).getMonth() + 1 + '-' + new Date(e.dayTime).getDate());
        YData.push(e.dayCount);
      });
      this.Line1(Xdata, YData);
    });
  }
  // 消防竣工验收数量统计
  FlowData2:any;
  GetProjectFlowDataStatisticsType2() {
    let model: any = {
      stateDate: new Date(),
      statisticsType: 2
    }
    this.service.post_GetProjectFlowDataStatistics(model).subscribe(res => {
      const Xdata = [];
      const YData = [];
      this.FlowData2 = res;
      res.items.forEach(e => {
        Xdata.push(new Date(e.dayTime).getMonth() + 1 + '-' + new Date(e.dayTime).getDate());
        YData.push(e.dayCount);
      });
      this.Line2(Xdata, YData);
    });
  }
  // 竣工验收备案数量统计
  FlowData3:any;
  GetProjectFlowDataStatisticsType3() {
    let model: any = {
      stateDate: new Date(),
      statisticsType: 3
    }
    this.service.post_GetProjectFlowDataStatistics(model).subscribe(res => {
      const Xdata = [];
      const YData = [];
      this.FlowData3 = res;
      res.items.forEach(e => {
        Xdata.push(new Date(e.dayTime).getMonth() + 1 + '-' + new Date(e.dayTime).getDate());
        YData.push(e.dayCount);
      });
      this.Line3(Xdata, YData);
    });
  }
  option1: any;
  option2: any;
  option3: any;
  Line1(Xdata, YData) {
    this.option1 = {
      title: {
        text: '近一周消防设计审查申报统计',
        textStyle: {
          fontSize: 14,
        },
        padding: [10, 0, 0, 0]
    },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: Xdata
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: YData,
        type: 'line',
        label: {
          normal: {
            show: true,
            position: 'inside',
            color: '#000'
          }
        },
        areaStyle: {}
      }]
    };
  }
  Line2(Xdata, YData) {
    this.option2 = {
      title: {
        text: '近一周消防竣工验收申报统计',
        textStyle: {
          fontSize: 14,
        },
        padding: [10, 0, 0, 0]
    },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: Xdata
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: YData,
        type: 'line',
        label: {
          normal: {
            show: true,
            position: 'inside',
            color: '#000'
          }
        },
        areaStyle: {}
      }]
    };
  }
  Line3(Xdata, YData) {
    
    this.option3 = {
      title: {
        text: '近一周竣工验收备案申报统计',
        textStyle: {
          fontSize: 14,
        },
        padding: [10, 0, 0, 0]
    },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: Xdata
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: YData,
        type: 'line',
        label: {
          normal: {
            show: true,
            position: 'inside',
            color: '#000'
          }
        },
        areaStyle: {}
      }]
    };
  }
}
