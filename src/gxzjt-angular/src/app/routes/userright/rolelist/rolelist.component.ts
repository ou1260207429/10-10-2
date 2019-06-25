import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STChange } from '@delon/abc';
import { UserServices } from 'services/user.services';
import { PublicModel } from 'infrastructure/public-model';
import { timeTrans } from 'infrastructure/regular-expression';
import { AppSessionService } from '@shared/session/app-session.service';
import { NzMessageService } from 'ng-zorro-antd';

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
    { title: '编号', index: 'id.value', type: 'checkbox' },
    // { title: '商户编号', index: 'merchantId' },
    // { title: '菜单编号', index: 'menuId' },
    { title: '角色名称', index: 'name' },
    // { title: '图标', index: 'icon' },
    { title: '启用', index: 'isEnabled' ,type: 'tag', tag: {
      true: { text: '是', color: 'red' },
      false: { text: '否', color: 'green' },
    } },
    { title: '排序号', index: 'sortId' },
    // { title: '创建时间', index: 'creationTime' },
    // { title: '创建人', index: 'creatorId' },
    // { title: '版本号', index: 'version' },
    {
      title: '操作',
      buttons: [
        {
          text: '查看', click: (item: any) => {
            this.title = "查看用户角色信息"
            this.addVisible = true;
            this.operate = 2
            this.filterData(item)
          }
        },
        {
          text: '编辑', click: (item: any) => {
            this.getRoleName();
            this.title = "编辑用户角色"
            this.operate = 1
            this.addVisible = true;
            this.filterData(item)
            this.editId = item.id

          }
        },
        {
          text: '删除', click: (item: any) => {
            this.deleteList = [item.id]
            this.deleteData()
          }
        },
      ]
    }
  ];
  addVisible = false;//弹框显示
  // addForm: any = {//新增数据
  // }
  addForm: any = {

  };
  searchForm: any = {
    page: 1,
    size: 10
  }
  editId: any;
  title = "新增用户角色"//弹框标题
  data: any;//表格数据
  pageSize = 50;
  isSearchForm = false;//加载条显示
  hiddenFliter = false;//查询条件显示
  deleteList: any[];
  roleList: any[]
  constructor(private message: NzMessageService, public _appSessionService: AppSessionService, private _publicModel: PublicModel, private _userServices: UserServices) {
  }

  ngOnInit() {
    this.initTable()
  }

  /**
   * 获取表格数据
   */
  initTable() {
    this.data = []
    this._userServices.queryRoles(this.searchForm).subscribe(data => {
      if (data.data) {
        data.data.forEach(element => {
          if (element.creationTime) {
            element.creationTime = timeTrans(Date.parse(element.creationTime) / 1000, 'yyyy-MM-dd', '-')
          }
        });
      }
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
    if (this.operate == 0) {
      let params = Object.assign({ merchantId: this._appSessionService.user.merchantId }, this.addForm)

      this._userServices.addRoles(params).subscribe(data => {
        if (data.result == 0) {
          this.message.success("新增成功");
          this.initTable();
          this.handleCancel();
        }else {
          this.message.error(data.message);
        }
      })
    } else if (this.operate == 1) {
      let params = Object.assign({id:this.editId}, this.addForm)
      this._userServices.editRoles(params).subscribe(data => {
        if (data.result == 0) {
          this.message.success("修改成功");
          this.initTable();
          this.handleCancel();
        }else {
          this.message.error(data.message);
        }
      })
    }
  }
  filterData(obj) {
    this.addForm = {
      id: obj.id,
      menuId: obj.menuIdd,
      //icon: obj.icon,
      name: obj.name,
        isEnabled: obj.isEnabled,
      //  sortId: obj.sortId,
      //version: obj.version,
    }
  }
  getRoleName() {
    this._userServices.getRolesName().subscribe(data => {
      if (data.result == 0) {
        this.roleList = data.data;
        console.log(data)
      }
    })
  }
  handleCancel() {
    this.addVisible = false;
    this.addForm = {};
  }
  deleteData() {
    this._publicModel.isDeleteModal(() => {
      this._userServices.deleteRoles({ ids: this.deleteList }).subscribe(data => {
        this.initTable();
      })
    });
  }
  changeDelete(e: STChange) {
    if (e.checkbox) {
      this.deleteList = [];
      e.checkbox.forEach(element => {
        this.deleteList.push(element.id)
      });
    }
  }
}
