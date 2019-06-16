import { Component, OnInit } from '@angular/core';
import { HomeServiceProxy, PageSize } from '@shared/service-proxies/service-proxies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-index',
  styleUrls: ['./index.component.less'],
  templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {
  pageSize: PageSize = new PageSize();
  constructor(private _homeServiceProxy: HomeServiceProxy, private _router: Router) { }
  downLoadList: any
  lawsList: any

  handleList = [
    {
      type: 'Audit',
      name: '建设工程消防设计审核指南',
      src: "../../../assets/images/index/办事指南_03.jpg",
    },
    {
      type: 'Acceptance',
      src: "../../../assets/images/index/办事指南详情_10.jpg",
      name: '建设工程消防验收指南',
    },
    {
      type: 'Record',
      name: '建设工程竣工验收消防备案指南',
      src: "../../../assets/images/index/办事指南详情_18.jpg",
    }
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
    /**
     * 查询办事指南列表
     */
    this._homeServiceProxy.homeNoticeList(this.pageSize).subscribe(data => {
      this.handleList = data.data;
    })
  }

  /**
   * @param typeList //列表类型
   * @param type //列表详情类型
   * @param name //列表详情名称
   */
  getNoticeDetail(typeList, type, name) {
    this._router.navigate([`/app/handling-guid/detail`, { type: type, name: name }]);
  }

}