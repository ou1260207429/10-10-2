import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-sys-setting-log-edit',
  templateUrl: './log-edit.component.html',
})
export class SysSettingLogEditComponent implements OnInit {
  url = [{
    bh: '100001',
    czz: '张三',
    czrq: '2019-01-01',
    ip: '201.200.150.95',
    czjl: '编辑单位联系人windir',
  }];
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'bh' },
    { title: '操作者', index: 'czz' },
    { title: '操作日期', index: 'czrq' },
    { title: 'IP地址', index: 'ip' },
    { title: '操作记录', index: 'czjl' },
    {
      title: '',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() { }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

}
