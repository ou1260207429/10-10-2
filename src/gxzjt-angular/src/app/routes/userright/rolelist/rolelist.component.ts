import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { UserServices } from 'services/user.services';
import { PublicModel } from 'infrastructure/public-model';

@Component({
  selector: 'app-userright-rolelist',
  templateUrl: './rolelist.component.html',
})
export class UserrightRolelistComponent implements OnInit {

  //0新增，1编辑，2查看
  operate = 0;
  url = `/user`;
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '商户编号', index: 'merchantId' },
    { title: '菜单编号', index: 'menuId' },
    { title: '角色名称', index: 'name' },
    { title: '图标', index: 'icon' },
    { title: '启用', index: 'isEnabled' },
    { title: '排序号', index: 'sortId' },
    { title: '版本号', index: 'version' },
    { title: '创建时间', index: 'creationTime' },
    { title: '创建人', index: 'creatorId' },
    { title: '版本号', index: 'version' },
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
              this._userServices.deleteRoles(item.id).subscribe(data => {
                this.initTable();

              })
            });
          }
        },
      ]
    }
  ];
  addVisible = false;//弹框显示
  // addForm: any = {//新增数据
  // }
  addForm: any = {

  }; searchForm: any = {

  }
  editId: any;
  title = "新增用户角色"//弹框标题
  data: any;//表格数据
  pageSize = 50;
  isSearchForm = false;//加载条显示
  hiddenFliter = false;//查询条件显示

  constructor(private _publicModel: PublicModel, private _userServices: UserServices) {
    this.data = [
      {
        id: 1,
        name: "角色名称",
        isEnabled: true,
        version: 1,
        merchantId: 1,
        menuId: 1,
        icon: 1,
        sortId: 1,
      }
    ]


  }

  ngOnInit() {
    //  this.initTable()
     }

  /**
   * 获取表格数据
   */
  initTable() {
    let params = {

    }
    this._userServices.queryRoles(params).subscribe(data => {
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
    if (this.operate != 2) {
      let params = this.addForm.value
      if (this.operate == 0) {
        this._userServices.addRoles(params).subscribe(data => {
          this.data = data.data;
        })
      } else if (this.operate == 1) {
        params.id = this.editId;
        this._userServices.editRoles(params).subscribe(data => {
          this.data = data.data;
        })
      }
    } else {
      this.addVisible = false;
    }

  }
  handleCancel() {
    this.addVisible = false;
    //   this.addForm.reset()
  }


}
