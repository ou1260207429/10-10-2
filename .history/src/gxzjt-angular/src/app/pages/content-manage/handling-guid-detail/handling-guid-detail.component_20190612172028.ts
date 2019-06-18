import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { RegulationServiceProxy, RegulationDto, NoticeServiceProxy } from '@shared/service-proxies/service-proxies';
import { timeTrans } from 'infrastructure/regular-expression';
import { NzMessageService } from 'ng-zorro-antd';
import { EventEmiter } from 'infrastructure/eventEmiter';
@Component({
  selector: 'app-handling-guid-detail',
  templateUrl: './handling-guid-detail.component.html',
  styles: []
})
export class HandlingGuidDetailComponent implements OnInit {

  operate
  //0是新增  1是查看 2是编辑
  type
  regulationId

  //表单对象
  data: any;
  RegulationType: any
  constructor(private _eventEmiter: EventEmiter, private message: NzMessageService, private _noticeServiceProxy: NoticeServiceProxy,private _regulationServiceProxy:RegulationServiceProxy, private _activatedRoute: ActivatedRoute) {
    this.regulationId = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
    this.operate = parseInt(this._activatedRoute.snapshot.paramMap.get('operate'));
    this.initType()
  }
  ngOnInit() {
    this.init()
  }
  init() {
    this.data = new RegulationDto();

    if (this.operate == 0) {
    } else {
      this.getRegulationDetailsByIdAsync()
    }

  }
  goBack() {
    history.go(-1);
  }
  /**
   * 获取类型
   */
  initType() {
    let params = {
      regulationId: this.regulationId
    }
    this._regulationServiceProxy.getDropdownTypeByEnumType("NoticeType").subscribe((data: any) => {
      this.RegulationType = data
    })
  }

  /**
   * 获取详情
   */
  getRegulationDetailsByIdAsync() {
    this._noticeServiceProxy.noticeDetailsByIdAsync(this.regulationId).subscribe((data: any) => {
      this.data = data
      this.data.regulationId = this.regulationId;
     // this.data.issueDate = timeTrans(Date.parse(this.data.issueDate) / 1000, 'yyyy-MM-dd HH:mm:ss', '-');
      this.data = {
        regulationId:data.id,
        content: data.content,
        guid: data.guid,
        issueDate: timeTrans(Date.parse(this.data.issueDate) / 1000, 'yyyy-MM-dd HH:mm:ss', '-'),
        issueOrg: data.issueOrg,
        regulationCode: data.regulationCode,
        regulationType: data.regulationType,
        title: data.title,
      }
      // this.deleteSum(this.data, ['contentUrl', 'creationTime', 'id', 'lastUpdateUserName', 'visitCount','lastUpdateTime','lastUpdateUserCode']);
      console.log(this.data)
    })
  }

  /**
   * 删除对象多余的属性
   * @param data 对象
   * @param arr 删除的属性数组
   */
  deleteSum(data: any, arr: Array<any>) {
    arr.forEach(item => {
      delete data[item]
    })
  }

  /**
   * 提交
   */
  save() {
    if (this.operate == 0) {
      this.data.guid = this.createguid();
    } else {
      this.data.regulationId = this.regulationId;
    }
    this.data.issueDate = new Date(timeTrans(Date.parse(this.data.issueDate) / 1000, 'yyyy-MM-dd HH:mm:ss', '-'))
    console.log(this.data)

    const src = this.operate == 0 ? this._noticeServiceProxy.addNoticeAsync(this.data) : this._noticeServiceProxy.editNoticeAsync(this.data)
    src.subscribe(data => {
      const name = this.operate == 0 ? '新增成功' : '修改成功';
      this.message.success(name);
      this._eventEmiter.emit('init', []);
      this.goBack()
    })
  }

  createguid() {
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    var chars = CHARS,
      uuid = [],
      i
    // rfc4122, version 4 form
    var r
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
      }
    }

    var ret = uuid.join('')
    console.log(ret);
    return ret
  }
}
