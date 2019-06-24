import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, XlsxService } from '@delon/abc';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StatisticsProAppStaticDetailComponent } from '../pro-app-static-detail/pro-app-static-detail.component';
import { StatisticsAcceptCredentialsComponent } from '../accept-credentials/accept-credentials.component';
import { StatisticsPositionPaperComponent } from '../position-paper/position-paper.component';
import { StatisticalServiceServiceProxy, ProjectApplyQueryDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-statistics-pro-app-static',
  templateUrl: './pro-app-static.component.html',
  styleUrls: ['./pro-app-static.component.less'],
})
export class StatisticsProAppStaticComponent implements OnInit {
  searchKey = '';
  selectedValuePro = "";
  fliterForm: FormGroup;
  hiddenFliter = false;
  formResultData = [];
  isAddProducttyepe5 = false;
  submodel = {
    Name: '',
  };
  rangeTime = [];

  formData = {};
  param = new ProjectApplyQueryDto();


  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [

    // {
    //   title: '操作',
    //   buttons: [
    //     {
    //       text: '查看',
    //       type: 'modal',
    //       modal: {
    //         component: StatisticsProAppStaticDetailComponent,
    //         paramsName: 'record',
    //       },
    //       click: (record: any, modal: any) => {

    //       },
    //     },
    //     {
    //       text: '受理凭证',
    //       type: 'link',
    //       // modal: {
    //       //   component: StatisticsAcceptCredentialsComponent,
    //       //   paramsName: 'record',
    //       // },
    //       click: (record: any, modal: any) => {
    //         window.open(record.acceptAttachmentFileUrl)
    //       },
    //     },
    //     {
    //       text: '意见书',
    //       type: 'link',
    //       // modal: {
    //       //   component: StatisticsPositionPaperComponent,
    //       //   paramsName: 'record',
    //       // },
    //       click: (record: any, modal: any) => {

    //         window.open(record.opinionFileUrl)
    //       },
    //     },
    //     // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
    //   ]
    // },
    { title: '竣工验收申报编号', index: 'recordNumber'},
    { title: '工程名称', index: 'projectName' },
    { title: '建设单位', index: 'companyName' },
    { title: '联系人', index: 'contactPerson' },
    { title: '联系电话', index: 'contactNumber' },
    { title: '审核结果', index: 'status',type: 'tag', tag: {
      0: { text: '未处理', color: '' },
      1: { text: '受理', color: 'green' },
      2:{ text: '不受理', color: 'red' },
      3:{ text: '不合格', color: 'red' },
      4:{ text: '合格', color: '' },
      5:{ text: '未抽中', color: '' },
    }},
    // { title: '操作人', index: '' },
    { title: '操作时间', index: 'acceptTime',type:'date' },
  ];

  constructor(private http: _HttpClient,
    private modal: ModalHelper,
    private statisticalServiceServiceProxy: StatisticalServiceServiceProxy,
    private formBuilder: FormBuilder,
    private xlsx: XlsxService) {

  }

  ngOnInit() {

    this.resetTime();
    this.fliterForm = this.formBuilder.group({
      proNo: [null],
      proName: [null],
      proType: [null],
      dateRange: [this.rangeTime],

    });
    this.getList();
  }

  switchFilter() {
    this.hiddenFliter = !this.hiddenFliter;
  }

  refresh() {
    this.getList();
    this.st.reload();
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
  search() {
    this.param.recordNumber=this.fliterForm.controls.proNo.value;
    this.param.projectName=this.fliterForm.controls.proName.value;
    this.param.status=this.fliterForm.controls.proType.value;
    if(this.param.status==null){
      this.param.status=-1;
    }
    this.param.startApplyTime = (this.fliterForm.controls.dateRange.value)[0];
    this.param.endApplyTime = (this.fliterForm.controls.dateRange.value)[1];

    this.statisticalServiceServiceProxy.post_GetProjectApplyList(this.param).subscribe((result: any) => {
      if(result.data){
         this.formResultData = result.data;
      }else{
        this.formResultData=[];
      }
      this.st.reload()
    }, err => {
      console.log(err);
      this.st.reload()

    });
  }

  resetForm(): void {
    this.fliterForm = this.formBuilder.group({
      proNo: [null],
      proName: [null],
      proType: [null],
      dateRange: [this.rangeTime],

    });
  }



  // exportXlsx() {
  //   const expData = [this.columns.map(i => i.title)];

  //   expData.push(['1', '1', '1', '1',]);

  //   this.xlsx.export({
  //     sheets: [
  //       {
  //         data: expData,
  //         name: 'sheet name',
  //       },
  //     ],
  //   });
  // }
  handleCancel5(): void {
    this.isAddProducttyepe5 = false;
  }
  subProducttype5(): void {
    this.isAddProducttyepe5 = false;
  }
  addview() {
    this.isAddProducttyepe5 = true;
  }
  getList() {


    this.param.init(

      {
        "recordNumber": "",
        "projectName": "",
        "status": -1,
        "startApplyTime": "",
        "endApplyTime": "",
        "page": 1,
        "sorting": "ProjectName",
        "skipCount": 0,
        "maxResultCount": 3000,
      });
      this.param.startApplyTime = (this.fliterForm.controls.dateRange.value)[0];
      this.param.endApplyTime = (this.fliterForm.controls.dateRange.value)[1];
    this.statisticalServiceServiceProxy.post_GetProjectApplyList(this.param).subscribe((result: any) => {
      this.formResultData = result.data;
    }, err => {
      console.log(err);

    });
  }
  resetTime() {
    var startTime = new Date();
    startTime.setDate(startTime.getDate() - 30)
    this.rangeTime = [startTime, new Date()];
  }
}
