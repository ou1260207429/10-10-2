import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, STChange } from '@delon/abc';
import { UserServices } from 'services/user.services';
import { PublicModel } from 'infrastructure/public-model';
import { timeTrans } from 'infrastructure/regular-expression';
import { AppSessionService } from '@shared/session/app-session.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { AddPostworkComponent } from '@app/components/add-postwork/add-postwork.component';

@Component({
  selector: 'app-userright-rolelist',
  templateUrl: './rolelist.component.html',
})
export class UserrightRolelistComponent implements OnInit {

  //0新增，1编辑，2查看
  operate = 0;
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'id.value', type: 'checkbox' },
    { title: '角色名称', index: 'name' },
    {
      title: '启用', index: 'isEnabled', type: 'tag', tag: {
        true: { text: '是', color: 'red' },
        false: { text: '否', color: 'green' },
      }
    },
    { title: '排序号', index: 'sortId' },
    {
      title: '操作',
      buttons: [
        {
          text: '编辑', click: (item: any) => {
            this.filterData(item)
            this.add(1, this.filterData(item))

          }
        }
      ]
    }
  ];
  addVisible = false;//弹框显示
  searchForm: any = {
    page: 1,
    size: 10
  }
  data: any;//表格数据
  pageSize = 50;
  isSearchForm = false;//加载条显示
  hiddenFliter = false;//查询条件显示
  deleteList: any[];
  roleList: any[]
  constructor(private ModelHelp: ModalHelper, private message: NzMessageService, public _appSessionService: AppSessionService, private _publicModel: PublicModel, private _userServices: UserServices) {
  }

  ngOnInit() {
    this.initTable()
  }
  autoRefres() {
    this.searchForm = {
      page: 1,
      size: 10
    }
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

  add(operate: number, item?: any) {
    let title = '新增角色名称'
    if (operate != 0) {
      title = operate == 1 ? '编辑角色信息' : '查看角色信息'
    }
    this.ModelHelp.static(
      AddPostworkComponent,
      {
        operate: operate,
        title: title,
        editName: "角色名称",
        addForm: item,
      }
    ).subscribe((res: any) => {
      if (res.opt) {
        this.save(operate, item)
      }
    })
  }
  save(operate, item) {

    if (operate == 0) {
      let params = Object.assign({ merchantId: this._appSessionService.user.merchantId }, item)

      this._userServices.addRoles(params).subscribe(data => {
        if (data.result == 0) {
          this.message.success("新增成功");
          this.initTable();
          this.handleCancel();
        } else {
          this.message.error(data.message);
        }
      })
    } else if (operate == 1) {
      this._userServices.editRoles(item).subscribe(data => {
        if (data.result == 0) {
          this.message.success("修改成功");
          this.initTable();
          this.handleCancel();
        } else {
          this.message.error(data.message);
        }
      })
    }
  }
  filterData(obj) {
    let item = {
      id: obj.id,
      menuId: obj.menuIdd,
      name: obj.name,
      isEnabled: obj.isEnabled,
    }
    return item
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
