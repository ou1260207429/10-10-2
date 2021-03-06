import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-default',
  templateUrl: './index-default.component.html',
  styleUrls: ['./index-default.component.less']
})
export class IndexDefaultComponent implements OnInit {

  constructor( private router: Router) {
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
 }


 /**
  * 跳转进表单列表页
  */
 goFromList() {

 }
 gotoMenu(item) {
   this.router.navigate(item.path);
 }

}
