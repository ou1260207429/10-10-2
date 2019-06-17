import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import * as BpmnModeler from "bpmn-js/dist/bpmn-modeler.production.min.js";
import { _HttpClient } from '@delon/theme';
import { FlowServices, WorkFlow } from 'services/flow.services';
import { AdoptEnum } from 'infrastructure/expression';
import { UploadFile } from 'ng-zorro-antd';
import { AcceptServiceServiceProxy, AcceptApplyFormDto, ApplyServiceServiceProxy, FlowFormQueryDto } from '@shared/service-proxies/service-proxies';

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



  uploading = false;
  fileList: UploadFile[] = [];

  textData = { projectNumber: "", opinion: "", projectName: "" }

  //路径的ID 
  flowNo

  //判断类型 消防设计1   消防验收2   消防竣工3 
  flowPathType

  //获取表单详情的ID 
  flowId


  //提交表单的对象
  formDto: AcceptApplyFormDto = new AcceptApplyFormDto();

  //表单json对象
  formJson

  constructor(private _applyService: ApplyServiceServiceProxy, private _acceptServiceServiceProxy: AcceptServiceServiceProxy, private _flowServices: FlowServices, private _activatedRoute: ActivatedRoute, private _ActivatedRoute: ActivatedRoute, ) {
    this.flowNo = this._activatedRoute.snapshot.paramMap.get('flowNo')
    this.flowId = this._activatedRoute.snapshot.paramMap.get('flowId')
    this.flowPathType = this._activatedRoute.snapshot.paramMap.get('flowPathType')
    console.log(this.flowPathType);

  }

  ngOnInit() {
    this.type = false
    this.init()
  }

  init() {
    Promise.all([this.getWorkFlow_NodeRecordAndAuditorRecords(), this.getAcceptApplyForm()]).then((data: any) => {
      this.data = data[0].result
      this.formDto = data[1]
      const flowFormQueryDto = new FlowFormQueryDto();
      flowFormQueryDto.flowType = this.flowPathType
      flowFormQueryDto.projectId = this.formDto.projectId;
      flowFormQueryDto.flowId = this.flowId

      //获取表单JSON数据
      this._applyService.post_GetFlowFormData(flowFormQueryDto).subscribe(data => {
        this.formJson = JSON.parse(data.formJson);
        console.log(JSON.parse(data.formJson))
        this.type = false
      })
    })


  }

  /**
   * 获取路径
   */
  getWorkFlow_NodeRecordAndAuditorRecords() {
    return this._flowServices.getWorkFlow_NodeRecordAndAuditorRecords(this.flowNo).toPromise()
  }

  /**
   * 获取表单
   */
  getAcceptApplyForm() {
    return this._acceptServiceServiceProxy.getAcceptApplyForm(this.flowId).toPromise()
  }



  /**
   * 上传文件之前的钩子
   */
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  /**
   * 点击提交
   */
  save() {


    // this._flowServices.tenant_NodeToNextNodeByPass().subscribe(data => { 

    // })
    // this.formDto.flowId = this.flowId
    // this._acceptServiceServiceProxy.acceptApply(this.formDto).subscribe(data => {

    // })
  };
}
