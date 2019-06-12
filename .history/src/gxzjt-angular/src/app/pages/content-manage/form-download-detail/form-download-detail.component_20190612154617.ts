import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegulationServiceProxy, RegulationDto } from '@shared/service-proxies/service-proxies';
import { PublicModel } from 'infrastructure/public-model';
import { timeTrans } from 'infrastructure/regular-expression';
import { NzMessageService } from 'ng-zorro-antd';
import { EventEmiter } from 'infrastructure/eventEmiter';

@Component({
  selector: 'app-form-download-detail',
  templateUrl: './form-download-detail.component.html',
  styleUrls: ['./form-download-detail.less']
})
export class FormDownloadDetailComponent implements OnInit {

  operate
  //0是新增  1是查看 2是编辑
  type
  regulationId
  //表单对象
  data: any;
  RegulationType: any
  constructor(private _eventEmiter: EventEmiter, private message: NzMessageService, private _regulationServiceProxy: RegulationServiceProxy, private _activatedRoute: ActivatedRoute) {
    this.regulationId = parseInt(this._activatedRoute.snapshot.paramMap.get('id'));
    this.operate = parseInt(this._activatedRoute.snapshot.paramMap.get('operate'));
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
   * 获取详情
   */
  getRegulationDetailsByIdAsync() {
    this._regulationServiceProxy.getRegulationDetailsByIdAsync(this.regulationId).subscribe((data: any) => {
      this.data = data
      this.data.regulationId = this.regulationId;
      // this.data.issueDate = timeTrans(Date.parse(this.data.issueDate) / 1000, 'yyyy-MM-dd HH:mm:ss', '-');
      this.data = {
        regulationId: data.id,
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
    } else {
      this.data.regulationId = this.regulationId;
    }
    this.data.issueDate = new Date(timeTrans(Date.parse(this.data.issueDate) / 1000, 'yyyy-MM-dd HH:mm:ss', '-'))
    console.log(this.data)

    const src = this.operate == 0 ? this._regulationServiceProxy.addRegulationAsync(this.data) : this._regulationServiceProxy.editRegulationAsync(this.data)
    src.subscribe(data => {
      const name = this.operate == 0 ? '新增成功' : '修改成功';
      this.message.success(name);
      this._eventEmiter.emit('init', []);
      this.goBack()
    })
  }