import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-handling-guid-list-detail',
  templateUrl: './handling-guid-list-detail.component.html',
  styles: []
})
export class HandlingGuidListDetailComponent implements OnInit {
  type: any;
  constructor(private _activatedRoute: ActivatedRoute) {
    this.type = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));

  }

  ngOnInit() {
  }

}
