import { Component, OnInit } from '@angular/core';

/**
 * 流程页面
 */
@Component({
  selector: 'app-flow-module',
  templateUrl: './flow-module.component.html',
  styleUrls: ['./flow-module.component.less'],
})
export class FlowModuleComponent implements OnInit {


  /**
   * 路径的静态数据
   */
  data = [
    {
      auditingType: null,
      editWorkFlow_NodeAuditorRecordDtos: null,
      name: "开始",
    },
    {
      auditingType: "审批",
      editWorkFlow_NodeAuditorRecordDtos: [
        {
          applyEID: "admin",
          applyEName: "admin",
          applyType: null,
          creationTime: "2019-06-10T16:24:45.1796331",
          deptFullPath: "创新研发院>>行业+新技术研发部>>行业+新技术研发部",
          deptId: 6637,
          details: null,
          id: 10571,
          result: 1,
          workFlow_Instance_Id: 10342,
          workFlow_NodeRecord_Id: 10838
        }
      ],
      name: "1"
    },
    {
      auditingType: null,
      editWorkFlow_NodeAuditorRecordDtos: [
        {
          applyEID: "admin",
          applyEName: "admin",
          applyType: null,
          creationTime: "2019-06-10T16:24:45.2226205",
          deptFullPath: null,
          deptId: null,
          details: "待办已办",
          id: 10572,
          result: 1,
          workFlow_Instance_Id: 10342,
          workFlow_NodeRecord_Id: 10839
        }
      ]
    },
    {
      auditingType: null,
      editWorkFlow_NodeAuditorRecordDtos: null,
      name: "结束"
    }


  ]

  constructor() { }

  ngOnInit() {
  }

}
