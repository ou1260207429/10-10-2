import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import * as BpmnModeler from "bpmn-js/dist/bpmn-modeler.production.min.js";
import { _HttpClient } from '@delon/theme';
import { FlowServices, WorkFlow } from 'services/flow.services';
import { AdoptEnum } from 'infrastructure/expression';
import { UploadFile } from 'ng-zorro-antd';

/**
 * 待办详情->办理页面
 */
@Component({
  selector: 'app-agency-done-details',
  templateUrl: './agency-done-details.component.html',
  styles: []
})
export class AgencyDoneDetailsComponent implements OnInit {

  tabs = [
    {
      name: '表单卡',
    },
    {
      name: '查看路径',
    }
  ];

  selectedIndex = 0

  //路径的对象
  data

  workFlow_Instance_Id

  workFlow: WorkFlow = {
    workFlow_TemplateInfoId: '',
    workFlow_InstanceId: '',
    workFlow_NodeAuditorRecordId: '',
  }

  type: boolean = true;

  //通过和不通过
  adoptEnum = AdoptEnum

  test = {

  }

  //测试
  checkOptionsOne = {
    isAllChecked: false,
    data: [
      { label: '润健股份有限公司——润健创研院大楼', value: 'Apple', checked: false },
      { label: '润健股份有限公司——润健创研院大楼', value: 'Pear', checked: false },
    ]
  }
  checkOptionsTwo = {
    isAllChecked: false,
    data: [
      { label: '润健股份有限公司——润健创研院大楼', value: 'Apple', checked: false },
      { label: '润健股份有限公司——润健创研院大楼', value: 'Pear', checked: false },
    ]
  };
  checkOptionsThree = {
    isAllChecked: false,
    data: [
      { label: '润健股份有限公司——润健创研院大楼', value: 'Apple', checked: false },
      { label: '润健股份有限公司——润健创研院大楼', value: 'Pear', checked: false },
    ]
  };
  checkOptionsFour = {
    isAllChecked: false,
    data: [
      { label: '润健股份有限公司——润健创研院大楼', value: 'Apple', checked: false },
      { label: '润健股份有限公司——润健创研院大楼', value: 'Pear', checked: false },
    ]
  };

  //同时提供的材料
  simultaneousMaterials = {
    a1Checkbox: false,
    a2Input: '',
    a2Checkbox: false,
    a5Input: '',
    a3Checkbox: false,
    a4Checkbox: false,
    a5Checkbox: false,
    complete: '',
    notGrant: '',
  }

  uploading = false;
  fileList: UploadFile[] = [];

  textData = { projectNumber: "", opinion: "", projectName: "" }
  constructor(private _flowServices: FlowServices, private _activatedRoute: ActivatedRoute, private _ActivatedRoute: ActivatedRoute, ) {
    // console.log(this._activatedRoute.snapshot.paramMap.get('workFlow_TemplateInfoId'))
    // console.log(this._activatedRoute.snapshot.paramMap.get('workFlow_InstanceId'))
    // console.log(this._activatedRoute.snapshot.paramMap.get('workFlow_NodeAuditorRecordId'))
    this.workFlow.workFlow_TemplateInfoId = this._activatedRoute.snapshot.paramMap.get('workFlow_TemplateInfoId')
    this.workFlow.workFlow_InstanceId = this._activatedRoute.snapshot.paramMap.get('workFlow_InstanceId')
    this.workFlow.workFlow_NodeAuditorRecordId = this._activatedRoute.snapshot.paramMap.get('workFlow_NodeAuditorRecordId')
  }

  ngOnInit() {
    this.type = false
    // this.init()
  }

  init() {
    Promise.all([this.gXZJT_StartWorkFlowInstanceAsync()]).then((data: any) => {
      this.data = data[0].result
      this.type = false
    })


  }

  /**
   * 获取路径
   */
  // getWorkFlow_NodeRecordAndAuditorRecords() {
  //   return this._flowServices.getWorkFlow_NodeRecordAndAuditorRecords(this.workFlow_Instance_Id).toPromise()
  // }

  /**
   * 获取详情
   */

  gXZJT_StartWorkFlowInstanceAsync() {
    return this._flowServices.tenant_GetWorkFlowInstanceFrowTemplateInfoById(this.workFlow).toPromise()
  }

  /**
   * 上传文件之前的钩子
   */
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };
  save() { };
}
