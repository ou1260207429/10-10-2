import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { PoliciesAndRegulationsServices } from './../../../../services/policies-and-regulations.services';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegulationServiceProxy, RegulationDto } from '@shared/service-proxies/service-proxies';
@Component({
  selector: 'app-policies-and-regulations-details',
  templateUrl: './policies-and-regulations-details.component.html',
  styleUrls: ['./policies-and-regulations-details.component.less']
})
export class PoliciesAndRegulationsDetailsComponent implements OnInit {

  //0是新增  1是查看 2是编辑
  type
  regulationId
  // title: null
  // issueOrg: ""
  // regulationTypeId: ""
  // curNodeName: ""
  // creationTime: ""

  // regulationCode: "string"
  // regulationType: "string"
  // issueDate: "2019-06-11T10:50:10.649Z"
  // content: "string"
  // attachmentList: [
  //   {
  //     attachmentId: 0,
  //     relationID: 0,
  //     attachmentName: "string",
  //     category: 0,
  //     fileUrl: "string"
  //   }
  // ]

  //表单对象
  data:RegulationDto;
  constructor(private _regulationServiceProxy:RegulationServiceProxy,private _activatedRoute: ActivatedRoute, private _policiesAndRegulationsServices: PoliciesAndRegulationsServices) {
    this.regulationId = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
    this.type = this._activatedRoute.snapshot.paramMap.get("type");
  }
  ngOnInit() {
    this.init()
  }
  init() {
    if(this.type == 0){

    }else{
      this.getRegulationDetailsByIdAsync()
    }

    // this.modaleForm = null;
    // this._policiesAndRegulationsServices.get_PoliciesAndRegulations({ regulationId: this.regulationId }).subscribe(data => {
    //   this.title = data.result.data[0].title;
    //   this.issueOrg = data.result.data[0].issueOrg;

    //   this.regulationTypeId = data.result.data[0].regulationTypeId;

    //   this.curNodeName = data.result.data[0].curNodeName;

    //   this.creationTime = data.result.data[0].creationTime;
    // })
  }
  goBack(){
    history.go(-1);
  }

  getRegulationDetailsByIdAsync(){
    this._regulationServiceProxy.getRegulationDetailsByIdAsync(this.regulationId).subscribe((data:any)=>{
      this.data = data;
      console.log(this.data);
    })
  }

  editRegulationAsync(){
    // this._regulationServiceProxy.editRegulationAsync().subscribe(data=>{

    // })
  }
}
