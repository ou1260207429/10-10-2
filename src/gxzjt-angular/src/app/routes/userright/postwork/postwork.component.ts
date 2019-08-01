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
  selector: 'app-userright-postwork',
  templateUrl: './postwork.component.html',
})
export class UserrightPostworkComponent implements OnInit {
  //0新增，1编辑，2查看
  operate = 0;
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'id.value', type: 'checkbox' },
    { title: '岗位名称', index: 'name' },
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
        },
      ]
    }
  ];
  addVisible = false;//弹框显示
  data: any;//表格数据
  pageSize = 50;
  isSearchForm = false;//加载条显示
  hiddenFliter = false;//查询条件显示
  searchForm: any = {
    page: 1,
    size: 10
  }
  deleteList: any[];

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
    this.data = [];
    this._userServices.queryStation(this.searchForm).subscribe(data => {
      if (data.data) {
        data.data.forEach(element => {
          if (element.creationTime) {
            element.creationTime = timeTrans(element.creationTime);
          }
        });
      }
      this.data = data.data;
    })
  }
  switchFilter() {
    this.hiddenFliter = !this.hiddenFliter;
  }
  /**
   * 新增 查看 编辑
   * @param operate  0：新增  1：编辑  2：查看 
   */
  add(operate: number, item?: any) {
    let title = '新增岗位信息'
    if (operate != 0) {
      title = operate == 1 ? '编辑岗位信息' : '查看岗位信息'
    }
    this.ModelHelp.static(
      AddPostworkComponent,
      {
        operate: operate,
        title: title,
        editName: "岗位名称",
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
      let params = Object.assign({ merchantId: this._appSessionService.user.merchantId, appId: "9F947774-8CB4-4504-B441-2B9AAEEAF450" }, item)
      this._userServices.addStation(params).subscribe(data => {
        if (data.result == 0) {
          this.message.success("新增成功");
          this.initTable();
          this.handleCancel();
        } else {
          this.message.error(data.message);
        }
      })
    } else if (operate == 1) {
      this._userServices.editStation(item).subscribe(data => {
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
      merchantId: obj.merchantId,
      name: obj.name,
      appId: obj.appId,
      isEnabled: obj.isEnabled,
    }
    return item
  }
  handleCancel() {
    this.addVisible = false;
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
