import { Component, OnInit,  } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { UserRightService } from '../userright.service';
import { Router } from '@angular/router';
import { NzFormatEmitEvent, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-userright-useradd',
  templateUrl: './useradd.component.html',
  styleUrls:['./useradd.component.less']
})
export class UserrightUseraddComponent implements OnInit {
  positionlist={
    data:[]
  };//存放获取的岗位列表
  rolelist={
    data:[]
  };//存放获取的角色列表
  submodel={
    eId:'',//登录账号
    eName:'',//名称
    password:'',//密码
    organizationsId:[],//所属组织机构
    sex:null,//性别
    mobile:'',//手机号
    idCardNo:'',//身份证
    roleId:'',//角色id
    positionIds:[],//岗位编号集合
    userDataVisibilityIds:[]//用户可见数据集合
  };
  //可见数据域树相关
  defaultCheckedKeys = [];//控制树默认选择节点
  defaultSelectedKeys = [];
  defaultExpandedKeys = ['0-0', '0-0-0', '0-0-1'];
  array;

  //控制所属组织机构树默认节点
  defaultCheckedKeys1=[];
  orgtreefiter=[];

  nodes=[];
  Password2;//确认密码
  constructor(private http: _HttpClient,
     private modal: ModalHelper,
     private router: Router,
     private message: NzMessageService,
     private UserRightService: UserRightService,) {

      this.getPosition();
      this.getRolelist();
      this.getTreeData();
     }

  ngOnInit() {
   }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  getOrg(){

  }
  getPosition(){
    this.UserRightService.Position().subscribe(
      res => {
        this.positionlist = res;
      },
    );
  }
  getRolelist(){
    this.UserRightService.Role().subscribe(
      res => {
        this.rolelist = res;
      },
    );
  }
  getTreeData(){
    this.UserRightService.GetTreeData().subscribe(
      res => {
        this.nodes = res.data;
        console.log(this,this.nodes)
      },
    );
  }
  sub(){
    let myreg =  /^(\d{11})$/;  //手机号码正则
    let reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/; //
    if(this.submodel.eId==''||this.submodel.eId==null){
      this.message.error("登录账号不能为空！");
      return
    }
    if(this.submodel.eName==''||this.submodel.eName==null){
      this.message.error("名称不能为空！");
      return
    }
    if(this.submodel.password.length<8||this.Password2.length<8){
      this.message.error("密码长度错误！请输入8位以上密码！");
      return
    }
    if(this.submodel.password!=this.Password2){
      this.message.error("两次输入密码不一致！");
      return
    }
    if(this.submodel.sex==''||this.submodel.sex==null){
      this.message.error("性别不能为空！");
      return
    }
    if (!myreg.test(this.submodel.mobile)) {
      this.message.error(`请输入有效的手机号码！`);
      return;
    }
    if (!reg.test(this.submodel.idCardNo)) {
      this.message.error(`请输入有效的身份证号码！`);
      return;
    }
    if(this.submodel.roleId==''||this.submodel.roleId==null){
      this.message.error("角色不能为空！");
      return
    }

    // if(this.submodel.userDataVisibilityIds.length==0){
    //   this.message.error("可见数据域不能为空！");
    //   return
    // }
    // if(this.submodel.organizationsId.length==0){
    //   this.message.error("所属组织机构不能为空！");
    //   return
    // }
    var arr = this.submodel.positionIds;
    var newArr = [];

      arr.forEach(function (e) {
      if(!newArr.includes(e)){
          newArr.push(e)
      }
     })
     this.submodel.positionIds=newArr;
      this.UserRightService.Add(this.submodel).subscribe(
      res => {
        if(res.result!=0){
          this.message.error(res.message);
          return
        }else{
          this.message.success(res.message)
          this.router.navigate([`/app/userright/userlist`]);
        }

      },
    );



  }
  ret(){

    this.router.navigate([`/app/userright/userlist`]);
  }
  nzEvent(event: NzFormatEmitEvent): void {
    this.submodel.userDataVisibilityIds=event.keys;
  }
  nzEventorg(event: NzFormatEmitEvent): void {
    console.log("所属组织机构"+event.keys);
    this.orgtreefiter=event.keys;
    this.submodel.organizationsId=event.keys;
  }
}
