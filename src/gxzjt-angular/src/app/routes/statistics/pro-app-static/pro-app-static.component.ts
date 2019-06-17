import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, XlsxService } from '@delon/abc';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-statistics-pro-app-static',
  templateUrl: './pro-app-static.component.html',
  styleUrls: ['./pro-app-static.component.less'],
})
export class StatisticsProAppStaticComponent implements OnInit {
  url = [{
    jgbh: '10000005',
    gcname: '西南大厦',
    jsdanw: '未来科技',
    lxr: '王哈哈',
    phone: '13333333',
    lc: '否',
    sh: '通过',
    czr: '操作人A',
    cztime: '2015-05-05'

  }];
  searchKey = '';
  selectedValuePro = "";
  fliterForm: FormGroup;
  hiddenFliter = false;

  isAddProducttyepe5 = false;
  submodel = {
    Name: "",
  };

  formData = {};


  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [

    {
      title: '操作',
      buttons: [
        { text: '详情', click: (item: any) => `/form/${item.id}` },
        { text: '受理凭证', click: (item: any) => `/form/${item.id}` },
        { text: '意见书', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    },
    { title: '竣工验收申报编号', index: 'jgbh' },
    { title: '工程名称', index: 'gcname' },
    { title: '建设单位', index: 'jsdanw' },
    { title: '联系人', index: 'lxr' },
    { title: '联系电话', index: 'phone' },
    { title: '流程是否超时', index: 'lc' },
    { title: '审核结果', index: 'sh' },
    { title: '操作人', index: 'czr' },
    { title: '操作时间', index: 'cztime' },
  ];

  constructor(private http: _HttpClient,
    private modal: ModalHelper,
    private formBuilder: FormBuilder,
    private xlsx: XlsxService) { }

  ngOnInit() {
    this.fliterForm = this.formBuilder.group({
      proNo: [null],
      proName: [null],
      proType: [null],
      dateRange: [[]],

    });
  }

  switchFilter() {
    this.hiddenFliter = !this.hiddenFliter;
  }

  refresh() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
  search() {

  }

  resetForm(): void {
    this.fliterForm.reset();
  }



  exportXlsx() {
    const expData = [this.columns.map(i => i.title)];

    expData.push(['1', '1', '1', '1',]);

    this.xlsx.export({
      sheets: [
        {
          data: expData,
          name: 'sheet name',
        },
      ],
    });
  }
  handleCancel5(): void {
    this.isAddProducttyepe5 = false;
  }
  subProducttype5(): void {
    this.isAddProducttyepe5 = false;
  }
  addview() {
    this.isAddProducttyepe5 = true;
  }
}
