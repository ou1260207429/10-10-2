import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent ,STPage} from '@delon/abc';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserRightService } from '../userright.service';
import { Router } from '@angular/router';
import { timeTrans } from 'infrastructure/regular-expression';
import { NzMessageService } from 'ng-zorro-antd';
import { publicPageConfig, pageOnChange, FlowPathTypeEnum } from 'infrastructure/expression';

@Component({
  selector: 'app-userright-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.less']
})
export class UserrightUserlistComponent implements OnInit {
  hiddenFliter = false;
  params={

  }
  submodel = {

  }//添加用户模型
  editsubmodel = {

  }//编辑用户模型

  fliterForm: FormGroup;
  getdomainuser = [];
  postmodel = {
    eName:'',
    organizationsName:'',
    page: '1',
    pageSize: '10',
  };
  total;
  formResultData;
//锁定用户相关
 isAddProducttyepe=false
 isAddProducttyepe1=false
 isAddProducttyepe2=false
 rangeTime=[];
 lockmodel={
  ID:'',
  LockBeginTime:null,
  LockEndTime:null
 }
//锁定用户相关
//重置密码
Password='';
Password2='';
restpasswordmoedl={
  id:'',
  newPassword:'',
  confirmPassword:'',
};
pageConfig: STPage = {
  front: false,
  show: true,
};
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {
      title: '操作',
      width:'280px',
      buttons: [
        {
          text: '查看',
          type: 'modal',
          click: (record: any, modal: any) => {
            this.tolook(record);
            this.refresh();

          },
        },
        {
          text: '编辑',
          type: 'modal',
          click: (record: any, modal: any) => {
            this.toedit(record);
            this.refresh();
            this.st.reload();


          },

        },
        {
          text: '重置密码',
          type: 'modal',
          click: (record: any, modal: any) => {
            this.restpasswordmoedl.id=record.id;
            this.isAddProducttyepe2=true;
          },

        },
        {
          text: '锁定',
          type: 'modal',
          click: (record: any, modal: any) => {
            this.isAddProducttyepe=true
            this.lockmodel.ID=record.id
          },
          iif: record => record.isLocked  === false,
        },
        {
          text: '解锁',
          type: 'modal',
          click: (record: any, modal: any) => {
            this.isAddProducttyepe1=true
            this.lockmodel.ID=record.id
            this.refresh();
          },
          iif: record => record.isLocked  === true,
        },
        {
          // icon: 'delete',
          text:'删除',
          type: 'del',
          click: (record, modal, comp) => {
            if (record.id) {
              console.log("有ID");
              comp.removeRow(record);
              record.OpeateType = 'delete';
              this.removeValue(record.id);
              this.st.reload();
            } else {
              console.log("没有ID");
              // comp.reload();
              // comp.removeRow(record);
              // record.OpeateType = 'delete';
              // this.getcontractinform()
            }
          },
        }
      ]
    },
    { title: '名称', index: 'eName',width:'80px' },
    { title: '登录账号', index: 'eId',width:'90px'  },
    {
      title: '是否删除', index: 'isDeleted', type: 'tag', tag: {
        true: { text: '是', color: 'red' },
        false: { text: '否', color: 'green' },
      },width:'90px'
    },
    {
      title: '锁定', index: 'isLocked', type: 'tag', tag: {
        true: { text: '是', color: 'red' },
        false: { text: '否', color: 'green' },
      },width:'80px'
    },
    { title: '组织机构', index: 'organizationsName',width:'250px'  },
    { title: '岗位', index: 'positionNames',width:'350px'  },
    { title: '角色名称', index: 'roleName',width:'150px' },
    {
      title: '性别', index: 'sex', type: 'tag', tag: {
        0: { text: '男', },
        1: { text: '女', },
      },width:'50px'
    },
    // { title: '注册时间',type:'date', index: 'registerTime',width:'180px'  },

  ];

  constructor(private http: _HttpClient,
    private modal: ModalHelper,
    private formBuilder: FormBuilder,
    private UserRightService: UserRightService,
    private router: Router,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.fliterForm = this.formBuilder.group({
      eName: [null],
      orgname:[null],
    });
    this.getList();
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }
  switchFilter() {
    this.hiddenFliter = !this.hiddenFliter;
  }
  refresh() {
    this.getList();
    this.st.reload();

  }
  getList() {
    this.UserRightService.GetUserDtoList(this.postmodel).subscribe(
      res => {
        this.getdomainuser = res;
        this.fz(this.getdomainuser);
        this.total=res.totalCount;

      },
    );

  }

  fz(i) {
    this.formResultData = i
  }

  resetForm(){
    this.fliterForm = this.formBuilder.group({
      eName: [null],
      orgname:[null],
    });
    this.postmodel.page='1';
    this.postmodel.pageSize='10';
    this.postmodel.eName=this.fliterForm.controls.eName.value;
    this.postmodel.organizationsName=this.fliterForm.controls.orgname.value;
    this.getList();
  }


  search() {
    this.postmodel.page='1';
    this.postmodel.pageSize='10';
    this.postmodel.eName=this.fliterForm.controls.eName.value;
    this.postmodel.organizationsName=this.fliterForm.controls.orgname.value;
    this.getList()
  }


  toadd(){
      this.router.navigate([`/app/userright/useradd`]);
  }
  toedit(record){
    this.router.navigate([`/app/userright/useredit` ,{record:record.id}]);
  }

  tolook(record){
    this.router.navigate([`/app/userright/userlook` ,{record:record.id}]);
  }
  lockuser(){

  }

  handleCancel(): void {

    this.isAddProducttyepe = false;
  }
  subProducttype(): void {
    this.lockmodel.LockBeginTime= timeTrans(Date.parse(this.rangeTime[0]) / 1000, 'yyyy-MM-dd', '-')+" 00:00:00";
    this.lockmodel.LockEndTime=timeTrans(Date.parse(this.rangeTime[1]) / 1000, 'yyyy-MM-dd', '-')+" 23:59:59";
    console.log(this.lockmodel)
    this.UserRightService.Lock(this.lockmodel).subscribe(
      res => {
        this.message.success(res.message);
        this.refresh();

      },
    );

    this.isAddProducttyepe = false;
  }
  handleCancel1(): void {

    this.isAddProducttyepe1 = false;
  }
  subProducttype1(): void {
    this.lockmodel.LockBeginTime='';
    this.lockmodel.LockEndTime='';
    console.log(this.lockmodel)
    this.UserRightService.Lock(this.lockmodel).subscribe(
      res => {
        this.message.success(res.message);
        this.refresh();
      },
    );

    this.isAddProducttyepe1 = false;
  }
  handleCancel2(): void {
    this.Password='';
    this.Password2='';
    this.isAddProducttyepe2 = false;
  }
  subProducttype2(): void {
    if(this.Password.length<8||this.Password2.length<8){
      this.message.error("密码长度错误！请输入8位以上密码！");
      return
    }
    if(this.Password==this.Password2){
      this.restpasswordmoedl.newPassword=this.Password;
      this.restpasswordmoedl.confirmPassword=this.Password2;

      this.UserRightService.ResetPassword(this.restpasswordmoedl).subscribe(
        res => {
          if(res.result==0){
            this.message.success(res.message);
            this.refresh();
          }else{
            this.message.error(res.message);
            this.refresh();
          }

        },
      );
      this.Password='';
      this.Password2='';
      this.isAddProducttyepe2 = false;
    }else{
      this.message.error("两次输入密码不一致");
      return
    }
  }
  removeValue(id){
    let model={
      id:id
    }
    this.UserRightService.Delete(model).subscribe(
      res => {
        this.message.success(res.message);
        this.refresh();
      },
    );
  }

  change(v) {
    if(this.postmodel.page==v.pi){
      return   //解决页面数据不能复制问题，因为change改变事件当点击的就会触发了所以当page不变的时候不执行方法
    }
    this.postmodel.page = v.pi;
    this.getList();
  }

}
