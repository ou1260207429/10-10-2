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

  operate
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
  data: RegulationDto;
  RegulationType: any
  constructor(private _regulationServiceProxy: RegulationServiceProxy, private _activatedRoute: ActivatedRoute, private _policiesAndRegulationsServices: PoliciesAndRegulationsServices) {
    this.regulationId = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
    this.operate = parseInt(this._activatedRoute.snapshot.paramMap.get('operate'));
    console.log(this.operate);
    this.initType()
  }
  ngOnInit() {
    this.init()
  }
  init() {
    this.data = new RegulationDto();

    if (this.operate == 0) {
    } else {
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
  goBack() {
    history.go(-1);
  }
  /**
   * 获取类型
   */
  initType() {
    let params = {
      regulationId: this.regulationId
    }
    this._regulationServiceProxy.getDropdownTypeByEnumType("RegulationType").subscribe((data: any) => {
      this.RegulationType = data
      console.log(data);
    })
  }

  /**
   * 获取详情
   */
  getRegulationDetailsByIdAsync() {
    let params = {
      regulationId: this.regulationId
    }
    this._regulationServiceProxy.getRegulationDetailsByIdAsync(this.regulationId).subscribe((data: any) => {
      var res = {
        "regulationId": data.id,
        "regulationCode": data.regulationCode,
        "title": data.title,
        "issueOrg": data.issueOrg,
        "regulationType": data.regulationType,
        "issueDate": data.issueDate,
        "content": data.content,
        "guid": data.guid
      };
      this.data.init(res);
      console.log(this.data);
    });
  }

  /**
   * 提交
   */
  save() {
    if (this.operate == 0) {
      this.data.guid = this.createguid();
    }
    const src = this.operate == 0 ? this._regulationServiceProxy.addRegulationAsync(this.data) : this._regulationServiceProxy.editRegulationAsync(this.data)

    src.subscribe(data => {
      console.log(this.data)
      this.goBack()
    })
  }

  createguid() {
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    var chars = CHARS,
      uuid = [],
      i
    // rfc4122, version 4 form
    var r
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
      }
    }

    var ret = uuid.join('')
    console.log(ret);
    return ret
  }
}
