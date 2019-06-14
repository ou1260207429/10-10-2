import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-handling-guid-list-detail',
  templateUrl: './handling-guid-list-detail.component.html',
  styles: []
})
export class HandlingGuidListDetailComponent implements OnInit {
  type: any;
  constructor(private _activatedRoute: ActivatedRoute,private _homeServiceProxy: HomeServiceProxy) {
    this.type = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));

  }

  ngOnInit() {
  }

}
