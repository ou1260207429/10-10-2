import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserServices } from 'services/user.services';
import { PublicModel } from 'infrastructure/public-model';

@Component({
  selector: 'app-userright-postwork',
  templateUrl: './postwork.component.html',
})
export class UserrightPostworkComponent implements OnInit {
  disabled = 1;
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
            this.addForm = item;
          }
        },
        {
          text: '编辑', click: (item: any) => {
            this.title = "编辑用户角色"
            this.operate = 1
            this.addVisible = true;
            this.addForm = item;
            this.editId = item.id
          }
        },
        {
          text: '删除', click: (item: any) => {
            this._publicModel.isDeleteModal(() => {
              this._userServices.deleteStation(item.id).subscribe(data => {
                this.initTable();

              })
            });
          }
        },
      ]
    }
  ];
  name: ""//查询条件
  addVisible = false;//弹框显示
  // addForm: any = {//新增数据
  // }
  addForm: any = {

  };
  editId: any;
  title = "新增用户角色"//弹框标题
  data: any;//表格数据
  pageSize = 50;
  isSearchForm = false;//加载条显示
  hiddenFliter = false;//查询条件显示
  searchForm: any = {

  }
  constructor(private _publicModel: PublicModel, private _userServices: UserServices) {

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
    // this.addForm.reset();
  }

}
