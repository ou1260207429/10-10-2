import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeServiceProxy, PageSize } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-handling-guid-list-detail',
  templateUrl: './handling-guid-list-detail.component.html',
  styleUrls: ['./handling-guid-list-detail.component.less']
})
export class HandlingGuidListDetailComponent implements OnInit {
  type: any;
  name: any;
  data: any;
  pageSize: PageSize = new PageSize();

  constructor(private _activatedRoute: ActivatedRoute, private _homeServiceProxy: HomeServiceProxy) {
    this.type = this._activatedRoute.snapshot.paramMap.get('type');
    this.name = this._activatedRoute.snapshot.paramMap.get('name');
    console.log(this.type)
    console.log(this.name)

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

    this._homeServiceProxy.homeNoticeList(this.pageSize).subscribe(data => {
     // console.log(data)
      this.data = data.data;
    })
  }

}
