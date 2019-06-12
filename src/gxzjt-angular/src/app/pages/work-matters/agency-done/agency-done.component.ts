import { FlowServices } from './../../../../services/flow.services';
import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, XlsxService } from '@delon/abc';


import { _HttpClient, ModalHelper } from '@delon/theme';


import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';

import { PublicFormComponent } from '../public/public-form.component'

/**
 * 待办流程
 */
@Component({
  selector: 'app-agency-done',
  templateUrl: '../public/public-form.html',
  styles: [],
})
export class AgencyDoneComponent extends PublicFormComponent implements OnInit {

  url = `/user`;
  searchKey = '';




  formData = {};



  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [

    { title: '部门', index: 'pro_type' },
    { title: '流程流水号', index: 'pro_no' },

    { title: '工程名称', index: 'pro_name' },

    { title: '建设单位', index: 'org' },
    {
      title: '工程类型', index: 'node',
      sort: {
        compare: (a, b) => a.node > b.node ? 1 : 0,
      },
      filter: {
        menus: [
          { text: '初审', value: 0 },
          { text: '复审', value: 1 },
          { text: '审核完毕', value: 2 },
        ],
        fn: (filter: any, record: any) =>
          record.node >= filter.value[0] && record.node <= filter.value[1],
        multiple: false,
      }
    },
    { title: '当前处理人', index: 'person' },

    { title: '申报时间', type: 'date', index: 'repo_time' },
    { title: '流程超时', index: 'timeout' },
    {
      title: '操作',
      buttons: [
        { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(private http: _HttpClient,
    private modal: ModalHelper,
    private xlsx: XlsxService) {
    super();
  }

  ngOnInit() {

  }



  refresh() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
  search() {

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



}
