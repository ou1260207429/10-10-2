import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { UserRightService } from '../userright.service';
import { NzDropdownService, NzMenuItemDirective, NzFormatEmitEvent, NzMessageService } from 'ng-zorro-antd';
import { PublicModel } from 'infrastructure/public-model';

@Component({
  selector: 'app-userright-aareedit',
  templateUrl: './aareedit.component.html',
  styleUrls:['aareedit.component.less']
})
export class UserrightAareeditComponent implements OnInit {

  dropdown;
  nodes;
  orgarray;
  defaultCheckedKeys;//默认节点
  isAddProducttyepe1 = false;
  isAddProducttyepe2 = false;
  defaultCheckedKeysArea=[];//所属区域数组

  addAreaModel={
    code:'',
    name:'',
    parentId:'',
  }
  areaModel={
   ids:[]
  }
  editmodel={
    code:'',
    name:'',
    id:'',
  }

  constructor(private http: _HttpClient,
    private nzDropdownService: NzDropdownService,
    private modal: ModalHelper,
    private message: NzMessageService,
    private _publicModel: PublicModel,
    private UserRightService: UserRightService) { }

  ngOnInit() {
    this.getTreeData();
  }

  add() {
    this.isAddProducttyepe2 = true;
  }
  getTreeData() {
    this.UserRightService.AreaGetAreaTree().subscribe(
      res => {
        this.nodes = res.data;
        this.nodes.forEach(element => {
          if (element.key ==  this.addAreaModel.parentId) {
            this.orgarray = element.children;

          } else {
            element.children.forEach(city => {
              if (city.key ==  this.addAreaModel.parentId) {
                this.orgarray = city.children;

              } else {
                city.children.forEach(conuty => {
                  if (conuty.key ==  this.addAreaModel.parentId) {
                    this.orgarray = conuty.children;

                  } else {
                    conuty.children.forEach(xz => {
                      if (xz.key ==  this.addAreaModel.parentId) {
                        this.orgarray = null;
                      }

                    });

                  }
                });
              }

            });
          }
          let a=this.orgarray

        });
        this.isAddProducttyepe2 = false;
      },
    );
  }
  // 创建右键菜单和关闭右键菜单的代码
  contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  close(e: NzMenuItemDirective): void {
    this.dropdown.close();
  }

  nzEvent(event: NzFormatEmitEvent): void {
    //点击区域将数据放入编辑模型中
    this.editmodel.code=event.node.origin.code;
    this.editmodel.name=event.node.origin.title;
    this.editmodel.id=event.node.origin.key;
    //点击区域时将区域的keys赋值入添加区域模型中
    this.addAreaModel.parentId=event.keys[0];

    this.areaModel.ids[0]=event.keys[0]

    //循环遍历获取点击区域下子区域数据
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

    // if (this.orgarray==null||this.orgarray.length == 0) {
    //   this.message.warning("已无下级区域");
    // }
  // console.log(event.keys)
  }

  log(value: string[]): void {
    this.areaModel.ids=value
  }




  deleteData(){
    if(this.areaModel.ids.length==0){
      this.message.error("请先选择需要删除的选项!")
    }
    this._publicModel.isDeleteModal(() => {
      this.UserRightService.AreaDeleteArea(this.areaModel).subscribe(data => {
        this.getTreeData()
        this.message.success(data.message)
      })
    });
  }

  edit(){
    this.isAddProducttyepe1 = true;

  }

  handleCancel1(): void {

    this.isAddProducttyepe1 = false;
  }
  subProducttype1(): void {
    this.UserRightService.AreaUpdateArea(this.editmodel).subscribe(data => {
      this.getTreeData();
      this.message.success(data.message)
    })
    this.isAddProducttyepe1 = false;
  }
  handleCancel2(): void {
    this.isAddProducttyepe2 = false;
  }
  subProducttype2(): void {
    this.UserRightService.AreaAddArea(this.addAreaModel).subscribe(data => {
      if(data.message=="操作成功"){
        this.getTreeData();
        this.message.success("操作成功")
      }else{
        this.getTreeData();
        this.message.error(data.message)
      }

    })
    this.addAreaModel.code='';
    this.addAreaModel.name='';
    this.isAddProducttyepe2 = false;
  }
}
