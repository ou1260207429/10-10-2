import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-userright-userlist',
  templateUrl: './userlist.component.html',
})
export class UserrightUserlistComponent implements OnInit {
  hiddenFliter = false;
  resetForm(){

  };
  fliterForm: FormGroup;
  formResultData;




  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '编号列表', index: 'no' },
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
    private modal: ModalHelper,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    this.fliterForm = this.formBuilder.group({
      userName: [null],
    });
    this.getList();
   }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
  switchFilter() {
    this.hiddenFliter = !this.hiddenFliter;
  }
  refresh() {
    this.getList();
    this.st.reload();

  }
  getList(){

  }

  search(){
    
  }
  
}
