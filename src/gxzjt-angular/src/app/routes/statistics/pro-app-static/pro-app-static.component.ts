import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, XlsxService,STPage } from '@delon/abc';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StatisticalServiceServiceProxy, ProjectApplyQueryDto } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { timeTrans } from 'infrastructure/regular-expression';
import { StatisticsService } from '../statistics.service';
import { publicPageConfig, pageOnChange } from 'infrastructure/expression';
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

  formData = {};total;
  param = new ProjectApplyQueryDto();
  pageConfig: STPage = {
    front: false,
    show: true,
  };


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
    // { title: '竣工验收申报编号', index: 'acceptanceNumber'},
    { title: '工程名称', index: 'projectName',width:'150px'},
    { title: '建设单位', index: 'companyName',width:'150px'},
    { title: '联系人', index: 'contactPerson',width:'100px'  },
    { title: '联系电话', index: 'contactNumber',width:'120px'  },
    { title: '流程是否超时', index: 'isExpireTime',width:'120px',format:(item:any)=>`${item.isExpireTime==true?"是":"否"}`,type: 'tag', tag: {
      "是": { text: '是', color: 'red' },
      "否": { text: '否', color: '' },
    }},
    { title: '审核结果', index: 'status',width:'120px',format: (item: any) => `${item.status==0?"未处理":(item.status==1?"受理":(item.status==2?"不受理":(item.status==3?"不合格":(item.status==4?"合格":(item.status==5?"未抽中":"未处理")))))}`,type: 'tag', tag: {
      "未处理": { text: '未处理', color: '' },
      "受理": { text: '受理', color: 'green' },
      "不受理":{ text: '不受理', color: 'red' },
      "不合格":{ text: '不合格', color: 'red' },
      "合格":{ text: '合格', color: '' },
      "未抽中":{ text: '未抽中', color: '' },
    }},
    // { title: '操作人', index: '' },
    { title: '申报时间', index: 'acceptTime',width:'120px',type:'date' },
  ];

  constructor(private http: _HttpClient,
    private modal: ModalHelper,
    private statisticalServiceServiceProxy: StatisticalServiceServiceProxy,
    private StatisticsService:StatisticsService,
    private formBuilder: FormBuilder,
    private xlsx: XlsxService) {

  }

  ngOnInit() {
    this.param.page=1;
    this.param.maxResultCount=10;
    this.param.projectName =null
    this.param.recordNumber =null;
    this.param.status=-1;

    this.resetTime();
    this.fliterForm = this.formBuilder.group({
      proNo: [null],
      proName: [null],
      proType: [null],
      dateRange: [this.rangeTime],

    });
    // this.getList();
    this.search();
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
    this.param.page=1;
    this.param.recordNumber=this.fliterForm.controls.proNo.value;
    this.param.projectName=this.fliterForm.controls.proName.value;
    this.param.status=this.fliterForm.controls.proType.value;
    if(this.param.status==null){
      this.param.status=-1;
    }
    // this.param.startApplyTime = (this.fliterForm.controls.dateRange.value)[0];
    // this.param.endApplyTime = (this.fliterForm.controls.dateRange.value)[1];

    if(this.fliterForm.controls.dateRange.value.length!=0){
      // this.param.startApplyTime = moment((this.fliterForm.controls.dateRange.value)[0]).add(28800000);
      // this.param.endApplyTime =  moment((this.fliterForm.controls.dateRange.value)[1]).add(28800000);
      this.param.startApplyTime=timeTrans(Date.parse(this.fliterForm.controls.dateRange.value[0]) / 1000, 'yyyy-MM-dd', '-')+" 00:00:00";
      this.param.endApplyTime =timeTrans(Date.parse(this.fliterForm.controls.dateRange.value[1]) / 1000, 'yyyy-MM-dd', '-')+" 23:59:59";
    }else{
      this.param.startApplyTime='';
      this.param.endApplyTime='';
    }

    // this.statisticalServiceServiceProxy.post_GetProjectApplyList(this.param).subscribe((result: any) => {
    //   if(result.data){
    //      this.formResultData = result.data;
    //      this.total=result;
    //      console.log(this.total)
    //   }else{
    //     this.formResultData=[];
    //   }
    //   this.st.reload()
    // }, err => {
    //   console.log(err);
    //   this.st.reload()

    // });
    this.getList();

  }

  resetForm(): void {
    this.fliterForm = this.formBuilder.group({
      proNo: [null],
      proName: [null],
      proType: [null],
      dateRange: [this.rangeTime],

    });
    this.param.page=1;
    this.search();
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
    this.StatisticsService.GetProjectApplyList(this.param).subscribe(
      res => {
        if(res.result.data){
               this.formResultData =res.result.data;
               this.total=res.result.total;
               console.log(this.total)
            }else{
              this.formResultData=[];
            }
            this.st.reload()
          }, err => {
            console.log(err);
            this.st.reload()

      },
    );
  }
  resetTime() {
    var startTime = new Date();
    startTime.setDate(startTime.getDate() - 30)
    this.rangeTime = [startTime, new Date()];
  }
  change(v) {
    if(this.param.page==v.pi){
      return   //解决页面数据不能复制问题，因为change改变事件当点击的就会触发了所以当page不变的时候不执行方法
    }
    this.param.page = v.pi;
    this.getList();
  }
}
