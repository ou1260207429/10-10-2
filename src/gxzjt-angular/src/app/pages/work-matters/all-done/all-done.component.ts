import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-work-matters-all-done',
  templateUrl: './all-done.component.html',
  styleUrls:['./all-done.component.less']
})
export class WorkMattersAllDoneComponent implements OnInit {
  rangeTime;
  fliterForm: FormGroup;

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
     ) { }

  ngOnInit() {
    this.fliterForm = this.formBuilder.group({
      city: [null],
      count: [null],
      proNo: [null],
      proName: [null],
      proType: [null],
      dateRange: [this.rangeTime],

    });
   }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
  resetTime() {
    var startTime = new Date();
    startTime.setDate(startTime.getDate() - 30)
    this.rangeTime = [startTime, new Date()];
  }

}
