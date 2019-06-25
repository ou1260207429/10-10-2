import { LoginServiceProxy, PagedAndFilteredInputDto } from './../../../shared/service-proxies/service-proxies';
import { Component, OnInit } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { NzModalRef } from 'ng-zorro-antd';
import { checkChooseItemAttribute, checkArrayString } from 'infrastructure/regular-expression';

/**
 * 获取用户列表
 */
@Component({
  selector: 'app-initiation-process-add-auditor',
  templateUrl: './initiation-process-add-auditor.component.html',
  styles: []
})
export class InitiationProcessAddAuditorComponent implements OnInit {

  page = new PagedAndFilteredInputDto();
  data

  radioValue

  //从上个页面传来的title
  title

  //从上个页面传来的数据。用来做列表判断的反选
  auditors
  constructor(private _loginService: LoginServiceProxy, private subject: NzModalRef) { }

  ngOnInit() {
    this.init()
  }

  /**
   * 初始化
   */
  init() {
    this.page.page = 1;
    this.page.maxResultCount = AppConsts.grid.defaultPageSize;
    this.page.filterText = '';
    this.employeesByDataSoureId()
  }

  employeesByDataSoureId() {
    this._loginService.curMerchantUsers(this.page).subscribe(data => {
      if (this.auditors.length > 0&&!this.radioValue) {
        for (let index = 0; index < data.data.length; index++) { 
          if (data.data[index].id == this.auditors[0].eid) {
            this.radioValue = data.data[index]
            break;
          }
        }
      }
      this.data = data;
    })
  }

  /**
  * 点击分页
  */
  change(e) {
    this.page.page = e;
    this.employeesByDataSoureId();
  }

  /**
   * 点击查询
   */
  query() {
    this.page.page = 1;
    this.page.maxResultCount = AppConsts.grid.defaultPageSize;
    this.employeesByDataSoureId()
  }

  /**
  * 回车
  */
  onEnter(v) {
    if (v.which === 13) {
      this.query();
    }
  }

  /**
   * 保存或者关闭的按钮
   * @param opt true:保存    false:关闭
   */
  close(opt: boolean) {
    this.subject.destroy({
      opt: opt,
      auditors: this.radioValue,
    })
  }

}
