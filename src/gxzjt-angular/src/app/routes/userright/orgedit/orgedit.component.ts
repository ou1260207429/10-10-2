import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { UserRightService } from '../userright.service';
import { NzDropdownService, NzMenuItemDirective, NzFormatEmitEvent, NzMessageService } from 'ng-zorro-antd';
import { PublicModel } from 'infrastructure/public-model';

@Component({
  selector: 'app-userright-orgedit',
  templateUrl: './orgedit.component.html',
  styleUrls: ['./orgedit.component.less']
})
export class UserrightOrgeditComponent implements OnInit {
  dropdown;
  nodes;
  Areanodes;
  orgarray;
  orgdetail;//获取组织详情
  isAddProducttyepe1 = false;//编辑
  isAddProducttyepe2 = false;//添加
  parentorgname;

  defaultCheckedKeysArea=["450300"];//所属区域数组
  defaultCheckedKeys2=null;
  defaultCheckedKeys3=[];//添加默认节点

  defaultCheckedKeys=[];
  addOrgModel={
    name:'',
    parentId:'',
    AreaIds:[],//所属区域id数组
    typenumberPrefix:''
  }
  editOrgModel={
    id:'',
    name:'',
    AreaIds:[],
    typenumberPrefix:'',
    parentId:'',
  }

  deletearray=[];//删除数组

  constructor(private http: _HttpClient,
    private nzDropdownService: NzDropdownService,
    private modal: ModalHelper,
    private message: NzMessageService,
    private _publicModel: PublicModel,
    private UserRightService: UserRightService) { }

  ngOnInit() {
    this.getTreeData();
    this.getAreaTreeData();

  }

  add() {
    this.isAddProducttyepe2 = true;
  }
  getTreeData() {
    this.UserRightService.GetTreeData().subscribe(
      res => {
        this.nodes = res.data;
    this.nodes.forEach(element => {
      if (element.key == this.editOrgModel.id) {
        this.orgarray = element.children;

      } else {
        element.children.forEach(city => {
          if (city.key == this.editOrgModel.id) {
            this.orgarray = city.children;

          } else {
            city.children.forEach(conuty => {
              if (conuty.key == this.editOrgModel.id) {
                this.orgarray = conuty.children;

              } else {
                conuty.children.forEach(xz => {
                  if (xz.key == this.editOrgModel.id) {
                    this.orgarray = null;
                  }

                });

              }
            });
          }

        });
      }

    });
      },
    );
  }
  // 创建右键菜单和关闭右键菜单的代码
  contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
    // console.log(event);
    // console.log(template);
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  close(e: NzMenuItemDirective): void {
    this.dropdown.close();
  }

  nzEvent(event: NzFormatEmitEvent): void {

     this.addOrgModel.parentId=event.keys[0];//点击获取ID作为添加父ID
     //根据点击的ID获取详细
     let getdetailmodel={
       id:this.addOrgModel.parentId+''
     }
     this.getorgdetail(getdetailmodel);

     //点击获取编辑模型数据作为ID
     this.editOrgModel.id=event.keys[0];
     this.editOrgModel.name=event.node.title;
     if(event.node.parentNode){
      this.editOrgModel.parentId=event.node.parentNode.key;

     }

    //  this.editOrgModel.orgChargeUid=e

     this.parentorgname=event.node.title;

    this.nodes.forEach(element => {
      if (element.key == event.keys[0]) {
        this.orgarray = element.children;

      } else {
        element.children.forEach(city => {
          if (city.key == event.keys[0]) {
            this.orgarray = city.children;

          } else {
            city.children.forEach(conuty => {
              if (conuty.key == event.keys[0]) {
                this.orgarray = conuty.children;

              } else {
                conuty.children.forEach(xz => {
                  if (xz.key == event.keys[0]) {
                    this.orgarray = null;
                  }

                });

              }
            });
          }

        });
      }

    });

  }
  //获取组织详情
  getorgdetail(id){
    if(id.id!=null&&id.id!=''){
      this.UserRightService.GetOrgDetail(id).subscribe(
        res => {
          this.orgdetail = res.data;
          if(res.data!=null && res.data.areaIds && res.data.areaIds!=null && res.data.areaIds!=''){
            this.defaultCheckedKeys2= res.data.areaIds;
            this.editOrgModel.AreaIds=res.data.areaIds;
          }else{
            this.defaultCheckedKeys2=[];
            this.editOrgModel.AreaIds=[];
          }

        },
      );
    }


  }


  log(value: string[]): void {
    this.deletearray=value;
  }


  addData() {
    this._publicModel.isAddModal(() => {
      // this._userServices.deleteRoles({ ids: this.deleteList }).subscribe(data => {
      //   this.initTable();
      // })
    });
  }
  deleteData(){
    if(this.deletearray.length==0){
      this.message.error("请先选择需要删除的数据！");
      return
    }
    this._publicModel.isDeleteModal(() => {
      this.UserRightService.OrganizationsDelete({ids: this.deletearray }).subscribe(data => {
       if(data.result==0){
        this.getTreeData();
        this.message.success("删除成功");

      }else{
        this.message.error(data.message);
        return
      }
      })
    });
  }

  edit(){
    // this.defaultCheckedKeys2=["450200", "450300"] 进入编辑页面加载所属区域
    this.isAddProducttyepe1 = true;
  }

  handleCancel1(): void {

    this.isAddProducttyepe1 = false;
  }
  subProducttype1(): void {
    this.UserRightService.OrgaUpdate(this.editOrgModel).subscribe(data => {
      if(data.result==0){
        this.message.success("操作成功")
        this.getTreeData();
        this.getAreaTreeData();
        this.isAddProducttyepe1 = false;
      }else{
        this.message.error(data.message)
        return
      }

     })


  }
  // nzEventor(event: NzFormatEmitEvent): void {
  //   // console.log(event)
  // }

  getAreaTreeData() {
    this.UserRightService.AreaGetAreaTree().subscribe(
      res => {
        this.Areanodes = res.data;
      },
    );
  }

  nzAreaEvent(event: NzFormatEmitEvent): void {
     this.addOrgModel.AreaIds=event.keys;//点击获取区域ID放入添加模型

     this.editOrgModel.AreaIds=event.keys;//点击获取区域ID放入编辑模型


  }
  handleCancel2(): void {
    this.addOrgModel={
      name:'',
      parentId:'',
      AreaIds:[],//所属区域id数组
      typenumberPrefix:'',
    }
    this.defaultCheckedKeys3=[];
    this.isAddProducttyepe2 = false;
  }
  subProducttype2(): void {
    this.UserRightService.OrgaAdd(this.addOrgModel).subscribe(data => {
      if(data.result==0){
        this.getTreeData();
        this.getAreaTreeData();
        this.message.success("操作成功")
        this.addOrgModel={
          name:'',
          parentId:'',
          AreaIds:[],//所属区域id数组
          typenumberPrefix:'',
        }
        this.defaultCheckedKeys3=[];
        this.isAddProducttyepe2 = false;

      }else{
        this.message.error(data.message)


        return
      }

    })
    this.getTreeData();
    this.getAreaTreeData();


  }

}
