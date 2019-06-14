import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-index-header',
  templateUrl: './index-header.component.html',
  styleUrls: ['./index-header.less']
})
export class IndexHeaderComponent implements OnInit {
  constructor(private location: PlatformLocation, private router: Router) {
    this.router.navigate([`/app/index/indexComponent`]);
   }
  active
  navList = [
    {
      path: 'index',
      name: '首页',
      activeName: "antiveIndex",
      acitve:"nowIndex"
    },
    {
      path: 'handling-guid',
      name: '办事指南',
      activeName: "antivehandling",
      acitve:"nowhandling"
    },
    {
      path: 'announcement-information',
      name: '公告信息',
      activeName: "antiveinformation",
      acitve:"nowinformation"
    },
    {
      path: 'form-download',
      name: '表格下载',
      activeName: "antiveform",
      acitve:"nowform"
    },
    {
      path: 'laws-and-regulations',
      name: '法律法规',
      activeName: "antivelaws",
      acitve:"nowlaws"
    },
    {
      path: '/account/login',
      name: '登录',
      activeName: "antivelogin",
      acitve:"nowlogin"
    },

  ];

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
