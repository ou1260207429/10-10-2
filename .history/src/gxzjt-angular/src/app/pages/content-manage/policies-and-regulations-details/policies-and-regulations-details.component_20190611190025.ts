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
  regulationId
  title: null
  issueOrg: ""
  regulationTypeId: ""
  curNodeName: ""
  creationTime: ""
 operate

 "regulationId": 0,
  "regulationCode": "string",
  "title": "string",
  "issueOrg": "string",
  "regulationType": "string",
  "issueDate": "2019-06-11T10:50:10.649Z",
  "content": "string",
  "attachmentList": [
    {
      "attachmentId": 0,
      "relationID": 0,
      "attachmentName": "string",
      "category": 0,
      "fileUrl": "string"
    }
  ]

  constructor(private _activatedRoute: ActivatedRoute, private _policiesAndRegulationsServices: PoliciesAndRegulationsServices) {
    this.regulationId = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
    this.operate = this._activatedRoute.snapshot.paramMap.get("operate");
    console.log(this.operate)
  }
  ngOnInit() {
    this.init()
  }
  init() {
    // this.modaleForm = null;
    this._policiesAndRegulationsServices.get_PoliciesAndRegulations({ regulationId: this.regulationId }).subscribe(data => {
      this.title = data.result.data[0].title;
      this.issueOrg = data.result.data[0].issueOrg;

      this.regulationTypeId = data.result.data[0].regulationTypeId;
  
      this.curNodeName = data.result.data[0].curNodeName;
  
      this.creationTime = data.result.data[0].creationTime;
    })
  

  }
}
