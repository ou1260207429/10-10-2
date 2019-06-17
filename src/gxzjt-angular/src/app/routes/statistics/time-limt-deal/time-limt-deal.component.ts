import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, XlsxService } from '@delon/abc';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StatisticsTimeLimtDealDetailComponent } from '../time-limt-deal-detail/time-limt-deal-detail.component';

@Component({
  selector: 'app-statistics-time-limt-deal',
  templateUrl: './time-limt-deal.component.html',
  styleUrls: ['./time-limt-deal.less']
})
export class StatisticsTimeLimtDealComponent implements OnInit {
  url = [{
    city: '南宁',
    area: '桂林',
    gcname: '西南工程1',
    gccode: 'xn0005',
    jsname: '王哈哈',
    gctype: '教育',
    dealperson: '王亮',
    arrtime: '2019-06/15',
    dealtime: '2019-06/17',
    cztime: '2015-05-05',
    cstime: '10',

  }];
  searchKey = '';
  selectedValuePro = "";
  fliterForm: FormGroup;
  hiddenFliter = false;
  formData = {};


  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [

    {
      title: '操作',
      buttons: [
        {
          text: '查看',
          type: 'modal',
          modal: {
            component: StatisticsTimeLimtDealDetailComponent,
            paramsName: 'record',
          },
          click: (record: any, modal: any) => {

          },
        },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    },
    { title: '地市', index: 'city' },
    { title: '区域', index: 'area' },
    { title: '工程名称', index: 'gcname' },
    { title: '工程编号', index: 'gccode' },
    { title: '建设单位', index: 'jsname' },
    { title: '工程类型', index: 'gctype' },
    { title: '当前处理人', index: 'dealperson' },
    { title: '流程到达时间', index: 'arrtime' },
    { title: '流程处理时间', index: 'dealtime' },
    { title: '超时时长', index: 'cstime' },
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

  addview() {

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
