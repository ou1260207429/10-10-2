import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { PoliciesAndRegulationsServices } from './../../../../services/policies-and-regulations.services';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-policies-and-regulations-details',
  templateUrl: './policies-and-regulations-details.component.html',
  styleUrls: ['./policies-and-regulations-details.component.less']
})
export class PoliciesAndRegulationsDetailsComponent implements OnInit {
  id
  title: null
  issueOrg: ""
  regulationTypeId: ""
  curNodeName: ""
  creationTime: ""
 operate



  constructor(private _activatedRoute: ActivatedRoute, private _policiesAndRegulationsServices: PoliciesAndRegulationsServices) {
    this.id = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
    this.operate = this._activatedRoute.snapshot.paramMap.get("queryParams")
  }
  ngOnInit() {
    this.init()
  }
  init() {
    // this.modaleForm = null;
    this._policiesAndRegulationsServices.get_PoliciesAndRegulations({ regulationId: this.id }).subscribe(data => {
      this.title = data.result.data[0].title;
      this.issueOrg = data.result.data[0].issueOrg;

      this.regulationTypeId = data.result.data[0].regulationTypeId;
  
      this.curNodeName = data.result.data[0].curNodeName;
  
      this.creationTime = data.result.data[0].creationTime;
    })
  

  }
}
