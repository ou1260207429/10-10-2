import { Component, OnInit } from '@angular/core';
import { HomeServiceProxy, PageSize } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-home-index',
  styleUrls: ['./index.component.less'],
  templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {
  record: any = {};
  i: any;
  router: any;
  pageSize: PageSize = new PageSize();
  constructor(private _homeServiceProxy: HomeServiceProxy) { }
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
  downLoadList
  lawsList
  // downLoadList = [
  //   {
  //     path: '',
  //     attachmentName: '建设工程消防设计审查申请表',
  //     creationTime: '2019-06-01  12:00',
  //   },
  //   {
  //     path: '',
  //     attachmentName: '建设工程消防设计审查申请表',
  //     creationTime: '2019-05-28  10:00',
  //   },
  //   {
  //     path: '',
  //     attachmentName: '建设工程消防验收申请表',
  //     creationTime: '2019-05-22  14:20',
  //   },
  //   {
  //     path: '',
  //     attachmentName: '建设工程竣工验收消防备案申请表',
  //     creationTime: '2019-05-19  16:32',
  //   },
  //   {
  //     path: '',
  //     attachmentName: '建设工程竣工验收消防备案申请表',
  //     creationTime: '2019-05-10  16:32',
  //   }
  // ];
  // lawsList = [
    {
      path: '',
      title: '中华人民共和国消防法',
    },
    {
      path: '',
      title: '《建设工程消防监督管理规定》',
    },
    {
      path: '',
      title: '《消防监督检查规定》',
    },
  ];
  handleList = [

  ]
  ngOnInit(): void {
    this.pageSize.page = 1;
    this.pageSize.size = 10;
    /**
     * 
     *查询表格列表
     *  */
    this._homeServiceProxy.homeTableDownloadList(this.pageSize).subscribe(data => {
      this.downLoadList = data.data;
      console.log(data)
    })
    /**
     * 查询法律法规
     */
    let params = this.pageSize
    params.group = "Regulation";

    // this._homeServiceProxy.homeRegulationList(params).subscribe(data => {
    //   this.lawsList = data.data;
    //   console.log(this.lawsList);
    // })


  }

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

  /**
   * 跳转进表单列表页
   */
  goFromList() {
    // this.router.navigate(item.path);
  }
}
