import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeServiceProxy, PageSize } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-handling-guid-list-detail',
  templateUrl: './handling-guid-list-detail.component.html',
  styles: []
})
export class HandlingGuidListDetailComponent implements OnInit {
  type: any;
  data: any;
  pageSize: PageSize = new PageSize();

  constructor(private _activatedRoute: ActivatedRoute, private _homeServiceProxy: HomeServiceProxy) {
    this.type = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.init();
  }
  /**
   * 
   *查询内容
   *  */
  init() {
    this.pageSize.page = 1;
    this.pageSize.size = 10;
    this.pageSize.group = this.type;

    this._homeServiceProxy.homeNoticeDetailsById(this.pageSize).subscribe(data => {
      console.log(data)
      this.data = data.data;
    })
  }

}
