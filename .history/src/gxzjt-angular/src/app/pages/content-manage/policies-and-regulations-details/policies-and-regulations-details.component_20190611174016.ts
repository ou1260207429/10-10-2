import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { PoliciesAndRegulationsServices } from './../../../../services/policies-and-regulations.services';

@Component({
  selector: 'app-policies-and-regulations-details',
  templateUrl: './policies-and-regulations-details.component.html',
  styleUrls: ['./policies-and-regulations-details.component.less']
})
export class PoliciesAndRegulationsDetailsComponent implements OnInit {
  id
  modaleForm={
      id:1,
      title:999,
      issueOrg:"xxx",
      regulationTypeId:"标题名称",
      curNodeName:"222",
      creationTime:"2019-07-03"
  }



  
  constructor(private _activatedRoute: ActivatedRoute) {
    this.id = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
    console.log(this.id)
  }
  ngOnInit() {
  }

}
