import { HomeServiceProxy, PageSize } from './../../../shared/service-proxies/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-download-list',
  templateUrl: './form-download-list.component.html',
  styleUrls: ['./form-download-list.less']
})
export class FormDownloadListComponent implements OnInit {
  record: any = {};
  i: any;
  router: any;

  constructor(private _homeService: HomeServiceProxy) { }
  currentIndex = 0;

  //列表
  downLoadList: any

  pageSize: PageSize = new PageSize();
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
