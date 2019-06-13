import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { HomeServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-index-header',
  templateUrl: './index-header.component.html',
  styleUrls: ['./index-header.less']
})
export class IndexHeaderComponent implements OnInit {
  record: any = {};
  i: any;
  constructor(private _homeServiceProxy: HomeServiceProxy, private location: PlatformLocation, private router: Router) { }
  currentIndex = 0;
  active
  navList = [
    {
      path: 'index',
      name: '首页',
      activeName: "antiveIndex"
    },
    {
      path: 'handling-guid',
      name: '办事指南',
      activeName: "antivehandling"
    },
    {
      path: 'announcement-information',
      name: '公告信息',
      activeName: "antiveinformation"
    },
    {
      path: 'form-download',
      name: '表格下载',
      activeName: "antiveform"
    },
    {
      path: 'laws-and-regulations',
      name: '法律法规',
      activeName: "antivelaws"
    },
    {
      path: '/account/login',
      name: '登录',
      activeName: "antivelogin"
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
  handleList=[
    
  ]
  
  /**
   * 获取表格列表
   */
  getTableList() {
    this._homeServiceProxy.homeTableDownloadList(null).subscribe(data => {

    })
  }

  /**
   * 获取办事指南列表
   */
  getHandleList() {
    this._homeServiceProxy.homeNoticeList(null).subscribe(data => {

    })
  }

  /**
   * 获取法律法规列表
   */
  getLawList() {
    this._homeServiceProxy.homeRegulationList(null).subscribe(data => {

    })
  }
  ngOnInit(): void {
    var pathArr = this.location.pathname.split('/');
    console.log(pathArr)
  }


  /**
   * 跳转进表单列表页
   */
  goFromList() {

  }
  gotoMenu(item) {
    console.log(item)
    this.router.navigate(item.path);
  }

}
