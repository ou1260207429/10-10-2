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
  init(){
    this.pageSize.page = 1;
    this.pageSize.size = 10;
    /**
     * 
     *查询内容
     *  */
    this._homeServiceProxy.homeTableDownloadList(this.pageSize).subscribe(data => {
      this.data = data.data;
    })
  }

}