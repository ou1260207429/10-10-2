import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, XlsxService, STPage } from '@delon/abc';


import { _HttpClient } from '@delon/theme';


import { ProjectFlowServcieServiceProxy, FireAuditCompleteQueryDto, DraftQueryDto } from '@shared/service-proxies/service-proxies'


import { Router } from '@angular/router';
import * as moment from 'moment';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { FlowServices } from 'services/flow.services';
import { publicPageConfig, pageOnChange, FlowPathTypeEnum } from 'infrastructure/expression';
import { AppConsts } from '@shared/AppConsts';
import { PublicModel } from 'infrastructure/public-model';
import { PublicFormComponent } from '../public/public-form.component';
import { EventEmiter } from 'infrastructure/eventEmiter';
/**
 *  草稿箱
 */
@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',

})
export class DraftsComponent extends PublicFormComponent implements OnInit {


  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {
      title: '操作',
      buttons: [
        {
          text: '编辑', click: (record) => {


            let url = `addFireDesignDeclareComponent`;
            if (record.projectTypeStatu != 0) {
              url = record.projectTypeStatu == 1 ? `addFireAcceptanceComponent` : `addCompletedAcceptanceComponent`
            }
            const headerUrl = `/app/engineering-management/`
            console.log(headerUrl + url + `/2/${record.projectId}`);
            this.router.navigate([headerUrl + url + `/2/${record.projectId}/null`]);
          }
        },
      ]
    },
    { title: '项目编号', index: 'projectId' },
    { title: '工程名称', index: 'projectName' },
    { title: '建设单位', index: 'constructOrgName' },
    { title: '流程类型', index: 'projectTypeStatu',format: (item: any) => `${item.projectTypeStatu?item.projectTypeStatu:404}`,type: 'tag', tag: {
      404:{text:'设计审查',color: '' },
      0: { text: '设计审查', color: '' },
      1:{ text: '消防验收',color: '' },
      2:{ text: '竣工备案',color: '' },
    }},
  ];

  searchParam = new DraftQueryDto();

  pageConfig: STPage = publicPageConfig;

  //类型
  flowPathTypeEnum = FlowPathTypeEnum

  //时间
  rangeTime
  constructor(private _projectFlowServcieService: ProjectFlowServcieServiceProxy,
    private _flowServices: FlowServices,
    private _publicModel: PublicModel,
    private router: Router,
    private _eventEmiter: EventEmiter,
    private http: _HttpClient,
    private xlsx: XlsxService) {
    super();

  }

  ngOnInit() {
    this.init()

    const _slef = this;
    this._eventEmiter.on('draftsComponentInit',()=>{
      _slef.init();
    });


  }

  init() {
    this.searchParam.page = 1;
    this.searchParam.maxResultCount = AppConsts.grid.defaultPageSize;
    this.searchParam.sorting = 'ProjectId';
    this.getList();
  }
  reststart(){
    this.resetTime();
    this.searchParam.page = 1;
    this.searchParam.maxResultCount = AppConsts.grid.defaultPageSize;
    this.searchParam.sorting = 'ProjectId';
    this.searchParam.number='';
    this.searchParam.projectName='';
    // this.searchParam.applyTimeStart = moment(this.rangeTime[0]);
    // this.searchParam.applyTimeEnd =moment(this.rangeTime[1]);
    this.getList();

  }

  /**
   * 获取所有列表
   * @param TemplateInfoListByClassIdEntity 参数
   */
  getList() {


    this._projectFlowServcieService.post_GetDrafts(this.searchParam).subscribe(data => {
      this.formResultData = data
    })

  }

  /**
   * 点击查询
   */
  query() {
    this.searchParam.page = 1;
    // this.searchParam.applyTimeStart = moment(this.rangeTime[0])
    // this.searchParam.applyTimeEnd =moment(this.rangeTime[1])
    this.getList();
  }


  change(v) {
    pageOnChange(v, this.searchParam, () => {
      this.getList();
    })
  }

  /**
  * 导出
  */
  exportXlsx() {
    this._publicModel.exportXlsx(this.columns, this.formResultData.data);
  }

  okRangeTime(v) {
    console.log(v);
    // const applyTimeStart:any = timeTrans(Date.parse(v[0]) / 1000, 'yyyy-MM-dd', '-')
    // const applyTimeEnd:any = timeTrans(Date.parse(v[1]) / 1000, 'yyyy-MM-dd', '-')
    // this.searchParam.applyTimeStart = applyTimeStart;
    // this.searchParam.applyTimeEnd = applyTimeEnd;
    // console.log(applyTimeEnd);
  }

  resetTime() {
    var startTime = new Date();
    startTime.setDate(startTime.getDate() - 30)
    this.rangeTime = [startTime, new Date()];
  }
}
