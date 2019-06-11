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
      title:"",
      issueOrg:"",
      regulationTypeId:"",
      curNodeName:"",
      creationTime:""
  }



  
  constructor(private _activatedRoute: ActivatedRoute,private _policiesAndRegulationsServices:PoliciesAndRegulationsServices) {
    this.id = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
    console.log(this.id)
  }
  ngOnInit() {
    this.init()
  }
init(){
  this.modaleForm=null;
  this._policiesAndRegulationsServices.get_PoliciesAndRegulations({regulationId:this.id}).subscribe(data => {
    this.modaleForm = data.result.data[0];
    console.log(this.modaleForm)
  })
}
}
