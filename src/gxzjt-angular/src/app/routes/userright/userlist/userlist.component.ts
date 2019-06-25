import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserRightService } from '../userright.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userright-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.less']
})
export class UserrightUserlistComponent implements OnInit {
  hiddenFliter = false;
  submodel = {

  }//添加用户模型
  editsubmodel = {

  }//编辑用户模型

  fliterForm: FormGroup;
  getdomainuser = [];
  postmodel = {
    eName:'',
    page: 1,
    pageSize: 1000,
  };
  formResultData;
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {
      title: '操作',
      buttons: [
        {
          text: '查看',
          type: 'modal',
          click: (record: any, modal: any) => {
            this.tolook(record);

          },
        },
        {
          text: '编辑',
          type: 'modal',
          click: (record: any, modal: any) => {
            this.toedit(record);

          },
        },
        {
          // icon: 'delete',
          text:'删除',
          type: 'del',
          click: (record, modal, comp) => {
            console.log("record--------" + record);
            console.log("modal--------" + modal);
            console.log("comp--------" + comp);
            if (record.Id) {
              console.log("有ID");
              comp.removeRow(record);
              record.OpeateType = 'delete';
              // this.removeValue(record.Id);
              this.st.reload();
            } else {
              console.log("没有ID");
              // comp.reload();
              comp.removeRow(record);
              // record.OpeateType = 'delete';
              // this.getcontractinform()
            }
          },
        }
      ]
    },
    { title: '名称', index: 'eName' },
    { title: '登录账号', index: 'eId' },
    {
      title: '是否删除', index: 'isDeleted', type: 'tag', tag: {
        true: { text: '是', color: 'red' },
        false: { text: '否', color: 'green' },
      }
    },
    {
      title: '锁定', index: 'isLocked', type: 'tag', tag: {
        true: { text: '是', color: 'red' },
        false: { text: '否', color: 'green' },
      }
    },
    { title: '组织机构', index: 'organizationsName' },
    { title: '角色名称', index: 'roleName' },
    {
      title: '性别', index: 'sex', type: 'tag', tag: {
        0: { text: '男', },
        1: { text: '女', },
      }
    },
    {
      title: '',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(private http: _HttpClient,
    private modal: ModalHelper,
    private formBuilder: FormBuilder,
    private UserRightService: UserRightService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.fliterForm = this.formBuilder.group({
      eName: [null],
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

      },
    );

  }

  fz(i) {
    this.formResultData = i
  }

  resetForm(){
    this.fliterForm = this.formBuilder.group({
      eName: [null],
    });
    this.postmodel.eName=this.fliterForm.controls.eName.value;
    this.UserRightService.GetUserDtoList(this.postmodel).subscribe(
      res => {
        this.getdomainuser = res;
        this.fz(this.getdomainuser);

      },
    );
  }


  search() {
    this.postmodel.eName=this.fliterForm.controls.eName.value;
    this.UserRightService.GetUserDtoList(this.postmodel).subscribe(
      res => {
        this.getdomainuser = res;
        this.fz(this.getdomainuser);

      },
    );
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


}
