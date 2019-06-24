import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-userright-postwork',
  templateUrl: './postwork.component.html',
})
export class UserrightPostworkComponent implements OnInit {
  url = `/user`;
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '编号岗位', index: 'no' },
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


  addVisible = true;
  addForm: FormGroup
  title = "新增角色"
  searchForm = {
    name: ""
  }
  searchHolder = "";
  searchKey = "";

  rangeTime: any;

  formResultData: any;

  pageSize = 50;


  isSearchForm = false;

  useSelect = false;
  isShowAdd = true;
  nzPlaceHolder = []


  //过滤菜单
  resetSearchFliterForm(): void {
    this.fliterForm.reset();
  }

  hiddenFliter = false;
  fliterForm: FormGroup;
  formBuilder;



  constructor(private fb: FormBuilder, private http: _HttpClient, private modal: ModalHelper) {
    this.formBuilder = new FormBuilder();
    this.fliterForm = this.formBuilder.group({
      pro_no: [null],
      pro_name: [null],
      org_name: [null],
      date_range: [[]],

    });
    this.addForm = this.fb.group({
      name: [null, [Validators.required]],
    });
    this.searchHolder = "标题名称";
    this.resetTime();



  }

  ngOnInit() { }

  /**
   * 获取表格数据
   */
  initTable() {
    let params = {

    }
    // this._userServices.queryStation(params).subscribe(data => {
    // })
  }
  switchFilter() {
    this.hiddenFliter = !this.hiddenFliter;
  }

  resetTime() {
    // var startTime = new Date();
    // startTime.setDate(startTime.getDate() - 1)
    // this.rangeTime = [startTime, new Date()];
  }
  add() {
    this.addVisible = true;
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
  save() {
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    if (this.addForm.valid) {


    }


  }
  handleCancel() {
    this.addVisible = false;
    this.addForm = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

}
