import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent, STChange } from '@delon/abc';
import { UserServices } from 'services/user.services';
import { PublicModel } from 'infrastructure/public-model';
import { timeTrans } from 'infrastructure/regular-expression';
import { AppSessionService } from '@shared/session/app-session.service';
import { NzMessageService } from 'ng-zorro-antd';

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
    { title: '编号', index: 'id.value', type: 'checkbox' },
    // { title: '类型编号', index: 'postId' },
    // { title: '商户编号', index: 'merchantId' },
    // { title: '应用程序编号', index: 'appId' },
    { title: '岗位名称', index: 'name' },
    { title: '启用', index: 'isEnabled' },
    { title: '排序号', index: 'sortId' },
    // { title: '创建人', index: 'creatorId' },
    // { title: '创建人', index: 'creatorId' },
    // { title: '调用次数', type: 'number', index: 'callNo' },
    // { title: '头像', type: 'img', width: '50px', index: 'avatar' },
    // { title: '时间', type: 'date', index: 'updatedAt' },
    {
      title: '操作',
      buttons: [
        {
          text: '查看', click: (item: any) => {
            this.title = "查看岗位信息"
            this.addVisible = true;
            this.operate = 2
            this.filterData(item)
          }
        },
        {
          text: '编辑', click: (item: any) => {
            this.operate = 1
            this.getWorkName();
            this.title = "编辑岗位信息"
            this.addVisible = true;
            this.editId = item.id
            this.filterData(item)

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
    page: 1,
    size: 10
  }
  workList: any[]
  deleteList: any[];
  constructor(private message: NzMessageService, public _appSessionService: AppSessionService, private _publicModel: PublicModel, private _userServices: UserServices) {
  }

  ngOnInit() {
    this.initTable()
  }

  /**
   * 获取表格数据
   */
  initTable() {
    this.data = [];
    this._userServices.queryStation(this.searchForm).subscribe(data => {
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
  getWorkName() {
    this._userServices.getStationName().subscribe(data => {
      if (data.result == 0) {
        this.workList = data.data;
      }
    })
  }
  add() {
    this.operate = 0
    this.addVisible = true;
  }
  save() {
    if (this.operate == 0) {
      let params = Object.assign({ merchantId: this._appSessionService.user.merchantId, appId: "9F947774-8CB4-4504-B441-2B9AAEEAF450" }, this.addForm)
      this._userServices.addStation(params).subscribe(data => {
        if (data.result == 0) {
          this.message.success("新增成功");
          this.initTable();
          this.handleCancel();
        }
      })
    } else if (this.operate == 1) {
      let params = Object.assign({}, this.addForm)
      params.id = this.editId;
      this._userServices.editStation(params).subscribe(data => {
        if (data.result == 0) {
          this.message.success("修改成功");
          this.initTable();
          this.handleCancel();
        }
      })
    }
  }
  filterData(obj) {
    console.log(obj)
    this.addForm = {
      id: obj.id,
     // postId: obj.postId,
      merchantId: obj.merchantId,
      name: obj.name,
      appId: obj.appId,
      isEnabled: obj.isEnabled,
    //  sortId: obj.sortId,
    }
  }
  handleCancel() {
    this.addVisible = false;
    this.addForm = {};
  }
  deleteData() {
    this._publicModel.isDeleteModal(() => {
      this._userServices.deleteStation({ ids: this.deleteList }).subscribe(data => {
        this.initTable();
      })
    });
  }
  changeDelete(e: STChange) {
    if (e.checkbox) {
      this.deleteList = []
      e.checkbox.forEach(element => {
        this.deleteList.push(element.id)
      });
    }
  }
}
