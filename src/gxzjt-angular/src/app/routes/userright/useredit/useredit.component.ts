import { Component, OnInit,  } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { UserRightService } from '../userright.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzFormatEmitEvent, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-userright-useredit',
  templateUrl: './useredit.component.html',
  styleUrls:['./useredit.component.less']
})
export class UserrightUsereditComponent implements OnInit {
  positionlist={
    data:[]
  };//存放获取的岗位列表
  rolelist={
    data:[]
  };//存放获取的角色列表
  submodel={
    eId:'',//登录账号
    eName:'',//名称
    organizationsId:[],//所属组织机构
    sex:null,//性别
    mobile:'',//手机号
    idCardNo:'',//身份证
    roleId:'',//角色id
    positionIds:[],//岗位编号集合
    userDataVisibilityIds:[]//用户可见数据集合
  };
  id;
  //可见数据域树相关
  defaultCheckedKeys1 = [];//控制树默认选择节点
  defaultSelectedKeys = [];

  //控制所属组织机构树默认节点
  defaultCheckedKeys2=[];
  orgtreefiter=[];
  nodes=[];

//   nodes=[ {
//     key: "39B6CADE-DC11-4BA4-972E-3818276C9CDF",
//     title: "大口九有限责任公司",
//     isLeaf: false,
//     children: [
//       {
//         "key": 3,
//         "title": "财务部",
//         "isLeaf": false,
//         "children": [
//           {
//             "key": 25,
//             "title": "财务一组",
//             "isLeaf": true,
//             "children": []
//           },
//           {
//             "key": 151,
//             "title": "财务二组",
//             "isLeaf": true,
//             "children": []
//           }
//         ]
//       },
//     ]
//   }
// ]

  Password2;//确认密码
  constructor(private http: _HttpClient,
     private modal: ModalHelper,
     private router: Router,
     private _activatedRoute: ActivatedRoute,
     private message: NzMessageService,
     private UserRightService: UserRightService,) {
      this.id=this._activatedRoute.snapshot.paramMap.get('record');
      this.getPosition();
      this.getRolelist();
      this.getTreeData();
      this.getuserdetail(this.id);
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
      },
    );
  }
  sub(){
    let myreg =/^(\d{11})$/;  //手机号码正则
    let reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/; //
    if(this.submodel.eId==''||this.submodel.eId==null){
      this.message.error("登录账号不能为空！");
      return
    }
    if(this.submodel.eName==''||this.submodel.eName==null){
      this.message.error("名称不能为空！");
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

    this.submodel.positionIds=this.uniq(this.submodel.positionIds);
    this.submodel.positionIds=this.trimNull(this.submodel.positionIds);
    this.UserRightService.Edit(this.submodel).subscribe(
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
    console.log("可见数据域"+event.keys);
    this.submodel.userDataVisibilityIds=event.keys;
  }
  nzEventorg(event: NzFormatEmitEvent): void {
    console.log("所属组织机构"+event.keys);
    this.orgtreefiter=event.keys;
    this.submodel.organizationsId=event.keys;
  }
  getuserdetail(id){
    let model={
      id:id
    }

    this.UserRightService.Details(model).subscribe(
      res => {
        this.submodel = res.data;
        this.submodel.sex=res.data.sex+'';
        this.defaultCheckedKeys2=res.data.userDataVisibilityIds;
        this.defaultCheckedKeys1.push(res.data.organizationsId);
        this.orgtreefiter.push(res.data.organizationsId);
      },
    );
  }

  uniq(array){
    array.sort();
    var temp=[array[0]];
    for(var i = 1; i < array.length; i++){
        if( array[i] !== temp[temp.length-1]){
            temp.push(array[i]);
        }
    }
    return temp;
  }
  trimNull(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == "" || typeof(array[i]) == "undefined") {
            array.splice(i, 1);
            i = i - 1;
        }
    }
    return array;
}
}


