import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServices } from 'services/user.services';

@Component({
  selector: 'app-userright-postwork',
  templateUrl: './postwork.component.html',
})
export class UserrightPostworkComponent implements OnInit {

  //0新增，1编辑，2查看
  operate = 0;
  url = `/user`;
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '编号岗位', index: 'no' },
    // { title: '调用次数', type: 'number', index: 'callNo' },
    // { title: '头像', type: 'img', width: '50px', index: 'avatar' },
    // { title: '时间', type: 'date', index: 'updatedAt' },
    {
      title: '操作',
      buttons: [
        {
          text: '查看', click: (item: any) => {
            this.addVisible = true;
            this.operate = 2
            this.addForm.reset(item);
          }
        },
        {
          text: '编辑', click: (item: any) => {
            this.title = "编辑用户角色"
            this.operate = 1
            this.addVisible = true;
            this.addForm.reset(item);
          }
        },
        {
          text: '删除', click: (item: any) => {

          }
        },
      ]
    }
  ];
  addVisible = false;//弹框显示
  // addForm: any = {//新增数据
  // }
  addForm: FormGroup;

  title = "新增用户角色"//弹框标题
  data: any;//表格数据
  pageSize = 50;
  isSearchForm = false;//加载条显示
  hiddenFliter = false;//查询条件显示

  constructor(private _userServices: UserServices, private fb: FormBuilder, private http: _HttpClient, private modal: ModalHelper) {
    this.addForm = this.fb.group({
      no: [null, [Validators.required]]
    });

    this.data = [
      {
        id: 1,
        no: "no",
      }
    ]
  }

  ngOnInit() {
    this.initTable()
  }

  /**
   * 获取表格数据
   */
  initTable() {
    let params = {

    }
    this._userServices.queryStation(params).subscribe(data => {
      this.data = data.data;
    })
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
    this.operate = 0
    this.addVisible = true;
  }
  save() {
    console.log(this.addForm)
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
      no: [null, [Validators.required]],
    });
  }

}
