import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import * as BpmnModeler from "bpmn-js/dist/bpmn-modeler.production.min.js";
import { _HttpClient } from '@delon/theme';
import { FlowServices } from 'services/flow.services';

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
      name: '自定义表单卡',
    },
    {
      name: '查看路径',
    }
  ];

  selectedIndex = 0

  //路径的对象
  data

  workFlow_Instance_Id

  type: boolean = true;
  constructor(private _flowServices: FlowServices, private _activatedRoute: ActivatedRoute, private _ActivatedRoute: ActivatedRoute, ) {
    this.workFlow_Instance_Id = parseInt(this._activatedRoute.snapshot.paramMap.get('workFlow_Instance_Id'));
  }

  ngOnInit() {
    this.init()
  }

  init() {
    Promise.all([this.getWorkFlow_NodeRecordAndAuditorRecords()]).then((data: any) => {
      this.data = data[0].result
      this.type = false
    })
  }

  /**
   * 获取路径
   */
  getWorkFlow_NodeRecordAndAuditorRecords() {
    return this._flowServices.getWorkFlow_NodeRecordAndAuditorRecords(this.workFlow_Instance_Id).toPromise()
  }

}
