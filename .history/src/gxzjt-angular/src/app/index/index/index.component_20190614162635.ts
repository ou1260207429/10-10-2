import { Component, OnInit } from '@angular/core';
import { HomeServiceProxy, PageSize } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-home-index',
  styleUrls: ['./index.component.less'],
  templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {
  pageSize: PageSize = new PageSize();
  constructor(private _homeServiceProxy: HomeServiceProxy) { }
  downLoadList: any
  lawsList: any
  handleList:any;
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
    /**
     * 查询办事指南列表
     */
    this._homeServiceProxy.homeNoticeList(this.pageSize).subscribe(data => {
      this.handleList = data.data;
      console.log(data)
    })
  }
}
