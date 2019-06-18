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
  downLoadList
  lawsList
  
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
    })
    /**
     * 查询法律法规
     */
    let params = this.pageSize
    params.group = "Regulation";

    this._homeServiceProxy.homeRegulationList(params).subscribe(data => {
      this.lawsList = data.data;
    })


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
