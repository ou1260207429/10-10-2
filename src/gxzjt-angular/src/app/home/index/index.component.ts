import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-home-index',
  styleUrls: ['./index.component.less'],
  templateUrl: './index.component.html',
})
export class HomeIndexComponent implements OnInit {
  record: any = {};
  i: any;

  constructor(public http: _HttpClient) {}
  currentIndex = 0;
  navList = [
    {
      path: '/app',
      name: '首页',
    },
    {
      path: '/banshi',
      name: '办事指南',
    },
    {
      path: '/gonggao',
      name: '公告信息',
    },
    {
      path: '/table',
      name: '表格下载',
    },
    {
      path: '/falv',
      name: '法律法规',
    },
    {
      path: '/login',
      name: '登录',
    },
  ];
  downLoadList = [
    {
      path: '',
      name: '建设工程消防设计审查申请表',
      time: '2019-06-03 12:12',
    },
    {
      path: '',
      name: '建设工程消防设计审查申请表',
      time: '2019-06-03 12:12',
    },
    {
      path: '',
      name: '建设工程消防验收申请表',
      time: '2019-06-03 12:12',
    },
    {
      path: '',
      name: '建设工程竣工验收消防设备案申请表',
      time: '2019-06-03 12:12',
    },
    {
      path: '',
      name: '建设工程竣工验收消防设备案申请表',
      time: '2019-06-03 12:12',
    },
    {
      path: '',
      name: '建设工程竣工验收消防设备案申请表',
      time: '2019-06-03 12:12',
    },
    {
      path: '',
      name: '建设工程竣工验收消防设备案申请表',
      time: '2019-06-03 12:12',
    },
  ];
  lawList = [
    {
      path: '',
      name: '中华人民共和国消防法',
    },
    {
      path: '',
      name: '《建设工程消防监督管理规定》',
    },
    {
      path: '',
      name: '《消防监督检查规定》',
    },
  ];

  ngOnInit(): void {}

  close() {}
}
