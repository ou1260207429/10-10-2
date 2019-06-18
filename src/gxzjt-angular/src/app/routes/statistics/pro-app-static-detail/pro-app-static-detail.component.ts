import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-statistics-pro-app-static-detail',
  templateUrl: './pro-app-static-detail.component.html',
})
export class StatisticsProAppStaticDetailComponent implements OnInit {
  record: any = {};
  i: any;
  url = `/user`;

  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'no' },
    { title: '调用次数', type: 'number', index: 'callNo' },
    { title: '头像', type: 'img', width: '50px', index: 'avatar' },
    { title: '时间', type: 'date', index: 'updatedAt' },
    {
      title: '',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(private http: _HttpClient,
    private modal: NzModalRef, ) { }

  ngOnInit() {
    this.i = this.record;
    console.log(this.i);
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
  close() {
    this.modal.destroy();
  }
}
