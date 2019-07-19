import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WorkMattersService } from '../../work-matters/work-matters.service';
import { timeTrans } from 'infrastructure/regular-expression';
@Component({
  selector: 'app-work-matters-all-done',
  templateUrl: './all-done.component.html',
  styleUrls:['./all-done.component.less']
})
export class WorkMattersAllDoneComponent implements OnInit {
  rangeTime;
  fliterForm: FormGroup;
  cityarray =[] ;
  selectedcity;//存市
  countyarray;//存县数组
  param={
    cityName:'',
    area:'',
    startApplyTime:'',
    endApplyTime:'',
    proName:'',
    proType:'',
    timetype:'',
    buildname:'',
  }
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {
      title: '操作',
      width:'200px',
      buttons: [
        {
          text: '详情',

          click: (item: any) => {
            // this.watchItem(item);
          }
        },
        // {
        //   text: '受理凭证', iif: record => record.acceptAttachmentUrl!=null,click: (record: any) => {
        //     if(record.acceptAttachmentUrl){
        //       window.open(record.acceptAttachmentUrl)
        //     }else{
        //       this.message.error('暂无受理凭证');
        //     }
        //   }
        // },
        // {
        //   text: '意见书', iif: record => record.opinionAttachmentUrl!=null,click: (record: any) => {
        //     if(record.opinionAttachmentUrl){
        //       window.open(record.opinionAttachmentUrl)
        //     }else{
        //       this.message.error('暂无意见书');
        //     }
        //   }
        // },
      ]
    },
    { title: '地市', index: '' ,width:'120px' },
    { title: '区域', index: '' ,width:'120px' },
    { title: '工程名称', index: '' },
    { title: '工程编号', index: '' },
    { title: '建设单位', index: '' },
    { title: '工程类型', index: '',width:'120px'  },
    { title: '节点审核人', index: '',width:'120px'  },
    { title: '申报时间', type: 'date', index: '',width:'120px'  },
    { title: '完成时间', type: 'date', index: '' ,width:'120px'  },
  ];

  constructor(private http: _HttpClient,
     private modal: ModalHelper,
     private formBuilder: FormBuilder,
     private WorkMattersService:WorkMattersService,
     ) {
       this.getCityList();
      }

  ngOnInit() {
    this.fliterForm = this.formBuilder.group({
      city: [null],
      count: [null],
      proNo: [null],
      proName: [null],
      proType: [null],
      buildname:[null],
      timetype:[null],
      dateRange: [this.rangeTime],

    });
   }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
  resetForm(): void {
    this.fliterForm = this.formBuilder.group({
      city: [null],
      count: [null],
      proNo: [null],
      proName: [null],
      proType: [null],
      buildname:[null],
      timetype:[null],
      dateRange: [this.rangeTime],

    });
    // this.getList();
  }
  getCityList() {
    this.WorkMattersService.GetAreaDropdown().subscribe(
      res => {

        this.cityarray=JSON.parse(res.result).Children
      },
    );

  }

  search() {
    if(this.fliterForm.controls.city.value){
      this.param.cityName = this.fliterForm.controls.city.value;
    }
    if(this.fliterForm.controls.count.value){
      this.param.area = this.fliterForm.controls.count.value;
    }
    if(this.fliterForm.controls.proName.value){
      this.param.proName=this.fliterForm.controls.proName.value;
    }
    if(this.fliterForm.controls.proType.value){
      this.param.proType=this.fliterForm.controls.proType.value;
    }

    if(this.fliterForm.controls.buildname.value){
      this.param.buildname=this.fliterForm.controls.buildname.value;
    }
    if(this.fliterForm.controls.timetype.value){
      this.param.timetype=this.fliterForm.controls.timetype.value;
    }
    // this.param.flowPathType = Number(this.fliterForm.controls.proType.value);
    //   if (this.param.flowPathType == 0) {
    //     this.param.flowPathType = -1;
    //   }

    if(this.fliterForm.controls.dateRange.value.length!=0){

      this.param.startApplyTime=timeTrans(Date.parse(this.fliterForm.controls.dateRange.value[0]) / 1000, 'yyyy-MM-dd', '-')+" 00:00:00";
      this.param.endApplyTime =timeTrans(Date.parse(this.fliterForm.controls.dateRange.value[1]) / 1000, 'yyyy-MM-dd', '-')+" 23:59:59";
    }else{
      this.param.startApplyTime='';
      this.param.endApplyTime='';
    }
console.log(this.param)
  }

  resetTime() {
    var startTime = new Date();
    startTime.setDate(startTime.getDate() - 30)
    this.rangeTime = [startTime, new Date()];
  }
  cityChange(e) {
    this.fliterForm = this.formBuilder.group({
      city: [e],
      count: [null],
      proNo: this.fliterForm.controls.proNo.value,
      proName: this.fliterForm.controls.proName.value,
      proType:this.fliterForm.controls.proType.value,
      dateRange: this.fliterForm.controls.dateRange.value,
      timetype:this.fliterForm.controls.timetype.value,
      buildname:this.fliterForm.controls.buildname.value,

    });
    this.countyarray = []
    this.cityarray.forEach(element => {
      if (element.Name == e) {
        this.countyarray = element.Children
      }

    });

  }

}
