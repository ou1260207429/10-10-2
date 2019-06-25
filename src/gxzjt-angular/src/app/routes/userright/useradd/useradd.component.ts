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
    EId:'',//登录账号
    EName:'',//名称
    Password:'',//密码
    OrganizationsId:'',//所属组织机构
    Sex:null,//性别
    Mobile:'',//手机号
    IdCardNo:'',//身份证
    PositionIds:[],//岗位编号集合
    UserDataVisibilityIds:[]//用户可见数据集合
  };
  nodes=[
    {
      "key": 2,
      "title": "大口九有限责任公司",
      "isLeaf": false,
      "children": [
        {
          "key": 3,
          "title": "财务部",
          "isLeaf": false,
          "children": [
            {
              "key": 25,
              "title": "财务一组",
              "isLeaf": true,
              "children": []
            },
            {
              "key": 151,
              "title": "财务二组",
              "isLeaf": true,
              "children": []
            }
          ]
        },
        {
          "key": 4,
          "title": "工程部",
          "isLeaf": false,
          "children": [
            {
              "key": 23,
              "title": "工程一部",
              "isLeaf": false,
              "children": [
                {
                  "key": 24,
                  "title": "工程一部子一部",
                  "isLeaf": true,
                  "children": []
                }
              ]
            },
            {
              "key": 223,
              "title": "12",
              "isLeaf": true,
              "children": []
            }
          ]
        },
        {
          "key": 130,
          "title": "巡查部",
          "isLeaf": false,
          "children": [
            {
              "key": 154,
              "title": "测试1",
              "isLeaf": false,
              "children": [
                {
                  "key": 239,
                  "title": "34",
                  "isLeaf": false,
                  "children": [
                    {
                      "key": 240,
                      "title": "fg",
                      "isLeaf": true,
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "key": 132,
          "title": "纪检部",
          "isLeaf": false,
          "children": [
            {
              "key": 212,
              "title": "22",
              "isLeaf": true,
              "children": []
            },
            {
              "key": 238,
              "title": "eee",
              "isLeaf": true,
              "children": []
            }
          ]
        },
        {
          "key": 138,
          "title": "督查2",
          "isLeaf": false,
          "children": [
            {
              "key": 243,
              "title": "er",
              "isLeaf": true,
              "children": []
            }
          ]
        },
        {
          "key": 214,
          "title": "测试部门",
          "isLeaf": false,
          "children": [
            {
              "key": 215,
              "title": "测试1",
              "isLeaf": true,
              "children": []
            },
            {
              "key": 219,
              "title": "12322",
              "isLeaf": true,
              "children": []
            },
            {
              "key": 220,
              "title": "42534543",
              "isLeaf": true,
              "children": []
            },
            {
              "key": 221,
              "title": "123123",
              "isLeaf": true,
              "children": []
            }
          ]
        }
      ]
    }
  ]

  constructor(private http: _HttpClient,
     private modal: ModalHelper,
     private router: Router,
     private message: NzMessageService,
     private UserRightService: UserRightService,) {

      this.getPosition();
      this.getRolelist();
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
  sub(){
    this.UserRightService.Add(this.submodel).subscribe(
      res => {
        this.message.success(res.message);
      },
    );
    this.router.navigate([`/app/userright/userlist`]);
  }
  ret(){
    this.router.navigate([`/app/userright/userlist`]);
  }
  nzEvent(event: NzFormatEmitEvent): void {
    console.log("可见数据域"+event.keys);
    this.submodel.UserDataVisibilityIds=event.keys;
  }
  nzEventorg(event: NzFormatEmitEvent): void {
    console.log("所属组织机构"+event.keys);
    this.submodel.OrganizationsId=event.keys[0];
  }
}
