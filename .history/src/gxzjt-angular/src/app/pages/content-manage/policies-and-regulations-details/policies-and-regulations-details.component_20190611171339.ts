import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-policies-and-regulations-details',
  templateUrl: './policies-and-regulations-details.component.html',
  styleUrls: ['./policies-and-regulations-details.component.less']
})
export class PoliciesAndRegulationsDetailsComponent implements OnInit {
  id
  modaleForm={
      id:1,
      number:999,
      name:"xxx",
      titleName:"标题名称",
      curNodeName:"222",
      startDate:"2019-07-03",
      operator:"操作人",
      creationTime:"2019-082-21"
  }
  constructor(private _activatedRoute: ActivatedRoute) {
    this.id = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
  }
  ngOnInit() {
  }

}
