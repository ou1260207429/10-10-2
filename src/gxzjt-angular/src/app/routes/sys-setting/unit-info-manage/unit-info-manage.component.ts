import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SysSettingUnitInfoEditComponent } from '../unit-info-edit/unit-info-edit.component';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-sys-setting-unit-info-manage',
  templateUrl: './unit-info-manage.component.html',
  styleUrls: ['./unit-info-manage.component.less'],
})
export class SysSettingUnitInfoManageComponent implements OnInit {
  url = [{
    unitID: 1,
    unitname: '西南校场',
    unitstatu: '公用',
    fr: '张三',
    lxr: '联系人1',
    lxfs: '13333333',
    czr: '操作人A',
  }];
  hiddenFliter = false;
  fliterForm: FormGroup;

  //监听新增单位
  isAddProducttyepe5 = false;
  //添加新增模型
  submodel = {
    Name: '',
  }

  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {
      title: '操作',
      buttons: [
        {
          // icon: 'delete',
          text: '删除',
          type: 'del',
          click: (record, modal, comp) => {
            console.log("record--------" + record);
            console.log("modal--------" + modal);
            console.log("comp--------" + comp);
            if (record.Id) {
              console.log("有ID");
              comp.removeRow(record);
              record.OpeateType = 'delete';
              this.removeValue(record.Id);
              this.st.reload();
            } else {
              console.log("没有ID");
              // comp.reload();
              comp.removeRow(record);
              // record.OpeateType = 'delete';
              // this.getcontractinform()
            }
          },
        },
        {
          text: '编辑', type: 'modal',
          modal: {
            component: SysSettingUnitInfoEditComponent,
            paramsName: 'record',

          },
          click: (record: any, modal: any) => {
            // this.getList();
            // this.message.success('编辑成功');
            console.log(record);
            // this.modal.orgId=record.OrgId
            // this.getnewdata();
            // this.st.reload();
          },
        },
      ]
    },
    { title: '单位ID', index: 'unitID' },
    { title: '单位名称', index: 'unitname' },
    { title: '单位性质', index: 'unitstatu' },
    { title: '法人代表', index: 'fr' },
    { title: '联系人', index: 'lxr' },
    { title: '联系方式', index: 'lxfs' },
    { title: '操作人', index: 'czr' },
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
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.fliterForm = this.formBuilder.group({
      proNo: [null],
      proName: [null],
      proType: [null],
      dateRange: [[]],

    });
  }
  removeValue(i) {
    // for (var a = 0; a < this.submitModel.Contacts.length; a++) {
    //   if (this.submitModel.Contacts[a].Id == i) {
    //     this.submitModel.Contacts.splice(a, 1);
    //     this.submitModel.Contacts.pop;
    //     this.HrManageService.DeleteContact({ contactId: i }).subscribe(res => {
    //       if (res.RV == 0) {
    //         this.message.success(`${res.Msg}`)
    //       } else {
    //         this.message.error(`${res.Msg}`)
    //       }
    //     });
    //     // this.submitModel.Contacts[a].OpeateType='delete';
    //   }
  }


  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  switchFilter() {
    this.hiddenFliter = !this.hiddenFliter;
  }
  search() {

  }

  resetForm(): void {
    this.fliterForm.reset();
  }

  handleCancel5(): void {
    this.isAddProducttyepe5 = false;
  }
  subProducttype5(): void {
    this.isAddProducttyepe5 = false;
  }
  addview() {
    this.isAddProducttyepe5 = true;
  }
}
