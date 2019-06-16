import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sys-setting-log-manage',
  templateUrl: './log-manage.component.html',
})
export class SysSettingLogManageComponent implements OnInit {
  url = [{
    time: '2017-05-05',
    IP: '220.22.21.20',
    area: '西南',
    logintype: 'PC登录',
  }];
  hiddenFliter = false;
  fliterForm: FormGroup;

  //监听新增单位
  isAddProducttyepe5 = false;
  //添加新增模型
  submodel = {
    Name: '',
  }

  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {
      title: '操作',
      buttons: [
        {
          text: '删除', click: (item: any) => {

          }
        },
        {
          text: '编辑', click: (item: any) => {

          }
        },
      ]
    },
    { title: '时间', index: 'time' },
    { title: 'IP', index: 'IP' },
    { title: '地区', index: 'area' },
    { title: '登录方式', index: 'logintype' },

    {
      title: '',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(private http: _HttpClient,
    private modal: ModalHelper,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.fliterForm = this.formBuilder.group({
      proNo: [null],
      proName: [null],
      proType: [null],
      dateRange: [[]],

    });
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  switchFilter() {
    this.hiddenFliter = !this.hiddenFliter;
  }
  search() {

  }

  resetForm(): void {
    this.fliterForm.reset();
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
