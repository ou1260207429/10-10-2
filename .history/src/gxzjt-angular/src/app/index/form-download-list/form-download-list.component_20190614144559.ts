import { Component, OnInit } from '@angular/core';
import { PageSize, HomeServiceProxy } from '@shared/service-proxies/service-proxies';

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

  init() {
    this.pageSize.page = 1;
    this.pageSize.size = 10;
    this._homeService.homeTableDownloadList(this.pageSize).subscribe(data => {
      this.downLoadList = data.data;
    })
  }
}
