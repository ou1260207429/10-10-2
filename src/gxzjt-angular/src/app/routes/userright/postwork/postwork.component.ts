import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServices } from 'services/user.services';

@Component({
  selector: 'app-userright-postwork',
  templateUrl: './postwork.component.html',
})
export class UserrightPostworkComponent implements OnInit {
  disabled=1;
  //0新增，1编辑，2查看
  operate = 0;
  url = `/user`;
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '类型编号', index: 'postId' },
    { title: '商户编号', index: 'merchantId' },
    { title: '应用程序编号', index: 'appId' },
    { title: '岗位名称', index: 'name' },
    { title: '启用', index: 'isEnabled' },
    { title: '排序号', index: 'sortId' },
    { title: '创建人', index: 'creatorId' },
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
            console.log( this.operate = 2)
          }
        },
        {
          text: '编辑', click: (item: any) => {
            this.title = "编辑用户角色"
            this.operate = 1
            this.addVisible = true;
            this.addForm.reset(item);
            this.editId = item.id
          }
        },
        {
          text: '删除', click: (item: any) => {
            this._userServices.deleteStation(item.id).subscribe(data => {
              this.data = data.data;
            })
          }
        },
      ]
    }
  ];
  searchForm: FormGroup
  name: ""//查询条件
  addVisible = false;//弹框显示
  // addForm: any = {//新增数据
  // }
  addForm: FormGroup;
  editId: any;
  title = "新增用户角色"//弹框标题
  data: any;//表格数据
  pageSize = 50;
  isSearchForm = false;//加载条显示
  hiddenFliter = false;//查询条件显示

  constructor(private _userServices: UserServices, private fb: FormBuilder) {
    this.addForm = this.fb.group({
      postId: [null, [Validators.required]],
      merchantId: [null, [Validators.required]],
      appId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      isEnabled: [null, [Validators.required]],
      sortId: [null, [Validators.required]],
      creatorId: [null, [Validators.required]],
    });
    this.searchForm = this.fb.group({
      name: [null],
    });

    this.data = [
      {
        id: 1,
        name: "岗位名称",
        postId: 0,
        isEnabled: 0,
        sortId: 0,
        creatorId: 0,
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

  add() {
    this.operate = 0
    this.addVisible = true;
  }
  save() {
    for (const i in this.addForm.controls) {
      this.addForm.controls[i].markAsDirty();
      this.addForm.controls[i].updateValueAndValidity();
    }
    let params = this.addForm.value

    if (this.addForm.valid) {
      if (this.operate == 0) {

        this._userServices.addStation(params).subscribe(data => {
          this.data = data.data;
        })
      } else if (this.operate == 1) {
        params.id = this.editId;
        console.log(params)

        this._userServices.editStation(params).subscribe(data => {
          this.data = data.data;
        })
      }

    }


  }
  handleCancel() {
    this.addVisible = false;
    this.addForm.reset();
  }

}
