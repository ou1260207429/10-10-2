import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-index',
  styleUrls: ['./index.component.less'],
  templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {
  record: any = {};
  i: any;
  router: any;

  constructor() { }
  currentIndex = 0;
  navList = [
    {
      path: 'app',
      name: '首页',
    },
    {
      path: 'handling-guid',
      name: '办事指南',
    },
    {
      path: 'announcement-information',
      name: '公告信息',
    },
    {
      path: 'form-download',
      name: '表格下载',
    },
    {
      path: 'laws-and-regulations',
      name: '法律法规',
    },
    {
      path: '/account/login',
      name: '登录',
    },
  ];
  downLoadList = [
    {
      path: '',
      name: '建设工程消防设计审查申请表',
      time: '2019-06-01  12:00',
    },
    {
      path: '',
      name: '建设工程消防设计审查申请表',
      time: '2019-05-28  10:00',
    },
    {
      path: '',
      name: '建设工程消防验收申请表',
      time: '2019-05-22  14:20',
    },
    {
      path: '',
      name: '建设工程竣工验收消防备案申请表',
      time: '2019-05-19  16:32',
    },
    {
      path: '',
      name: '建设工程竣工验收消防备案申请表',
      time: '2019-05-10  16:32',
    }
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
    // this.router.navigate(item.path);
  }
}
