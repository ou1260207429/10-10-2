import { HomeServiceProxy, PageSize } from './../../../shared/service-proxies/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-download-list',
  templateUrl: './form-download-list.component.html',
  styleUrls: ['./form-download-list.less']
})
export class FormDownloadListComponent implements OnInit {
  constructor(private _homeService: HomeServiceProxy) { }

  //列表
  downLoadList: any

  pageSize: PageSize = new PageSize();

  ngOnInit(): void {
    this.init();
  }

  close() { }

  init() {
    this.pageSize.page = 1;
    this.pageSize.size = 10;
    this._homeService.homeTableDownloadList(this.pageSize).subscribe(data => {
      this.downLoadList = data.data;
    })
  }

  /**
   * 跳转进表单列表页
   */
  goFromList(item) {
    this.router.navigate(item.path);
  }

}
