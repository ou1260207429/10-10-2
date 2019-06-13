import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-header',
  templateUrl: './index-header.component.html',
  styleUrls: ['./index-header.less']
})
export class IndexHeaderComponent implements OnInit {
  record: any = {};
  i: any;
  constructor(public http: _HttpClient, private router: Router, ) { }
  currentIndex = 0;
  navList = [
    {
      path: 'index',
      name: '首页',
      chil
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

  ngOnInit(): void { }

  close() { }


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
