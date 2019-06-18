import { _HttpClient } from '@delon/theme';
import { Component, OnInit } from '@angular/core';

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
  ) { }

  ngOnInit() {
    this.EchartsMap();
    this.GetData();
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
            color: ['#469ffb', '#42a5fc', '#24cbff', '#5b54e6', '#5142cc', '#494bda', '#d0b210', '#6b249a', '#6728a1', '#6b2499',]
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
}
