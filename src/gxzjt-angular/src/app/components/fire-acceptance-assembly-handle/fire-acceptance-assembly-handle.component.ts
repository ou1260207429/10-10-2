import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ArchitectureTypeEnum, OptionsEnum, RefractoryEnum, AppId } from 'infrastructure/expression';
import { objDeleteType, genID, createguid, checkArrayString } from 'infrastructure/regular-expression';
import { PublicModel } from 'infrastructure/public-model';
import { UploadFile, NzMessageService, UploadXHRArgs } from 'ng-zorro-antd';
import { PublicServices } from 'services/public.services';
import { ExamineFormDto, ProjectAttachment } from '@shared/service-proxies/service-proxies';
import lodash from 'lodash';
import { URLConfig } from "@shared/config/host";
import { indexOfFileByName } from "@shared/utils/array";
import * as moment from 'moment';
import { dateTrans } from 'infrastructure/regular-expression';
/**
 * 消防验收的表单模块的办理或者结果
 */
@Component({
  selector: 'app-fire-acceptance-assembly-handle',
  templateUrl: './fire-acceptance-assembly-handle.component.html',

})
export class FireAcceptanceAssemblyHandleComponent implements OnInit {

  //0是受理凭证  1是合格  2是不合格
  @Input() type = 0;

  //从父页面传来的数据
  @Input() data: any;

  //市县区
  position = OptionsEnum;

  //结构类型
  typeSelect = ArchitectureTypeEnum;

  //耐火结构
  refractoryEnum = RefractoryEnum;

  //获取表单对象
  @ViewChild('f') f: FormGroup;

  //向父组件发送数据
  @Output() private childOuter = new EventEmitter();

  //判断上传的焦点
  uoloadIndex: number = -1;

  @Input() examineFormDto: ExamineFormDto;

  constructor(private message: NzMessageService, public _publicServices: PublicServices, public publicModel: PublicModel, ) { }

  ngOnInit() {
    //向父组件发送数据   把表单对象传过去
    this.childOuter.emit(this.f);
    this.data.attachment = this.data.attachment ? this.data.attachment : [];


    if (!this.examineFormDto.content && !this.examineFormDto.opinion) {
      var date = new Date();
      // var dateStr = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + "日";
      var dateStr = dateTrans(date, '年', '月', '日');

      var descr = this.examineFormDto.descr;
      if (descr && descr.substring(descr.length - 1, descr.length) == "。") {
        descr = descr.substring(0, descr.length - 1);
      }

      this.examineFormDto.content =
        `    你单位报来`
        + this.data.projectName + `建设工程消防验收资料收悉（受理凭证：`
        + this.examineFormDto.acceptFileCode + `）。该工程位于`
        + this.data.address + `，`
        + descr + `。`
        + dateStr + `,`
        + this.data.orgName + `组织你单位及设计、施工、监理、检测等单位有关人员对该工程进行了消防验收。`
        + `经对验收资料、消防设施技术检测报告进行审查，`
        + `对总平面布置和平面布置中涉及消防安全的防火间距、消防车道、消防水源，建设防火防烟分区和建设构造，`
        + `安全疏散和消防电梯，消防给水和自动灭火系统，防烟、排烟和通风系统的防火设计，`
        + `消防电源及其配电，火灾应急照明、应急广播和疏散指示标志，`
        + `火灾自动报警系统和消防控制室，建筑灭火器等项目情况和性能进行抽查，现提出以下意见： \n`
        + `    `
        // + `    一、综合评定该工程消防验收不合格。\n`
        // + `    二、问题1，×××（存在问题），不符合《××》第×条第×款（规范名称及条文号）的规定。\n`
        // + `    三、问题2，同上。\n`
        // + `    四、问题3，同上。\n`
        // + `    五、提供消防检测的技术服务机构和人员对出具的检测意见负责。\n`
        // + `    以上问题请建设、施工单位落实整改，整改完毕后再申请复验。\n`
        // + `    如不服本决定，可以在收到本意见书之日起六十日内向××市人民政府申请行政复议或者三个月内依法向××人民法院提起行政诉讼。\n;`
        ;
        this.examineFormDto.content=this.examineFormDto.content.replace(/。+/g, '。');
    }
  }

  onChangeCheckDate(date: Date) {
    var dateStr = "。" + date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + "日,";
    this.examineFormDto.content = this.examineFormDto.content.replace(/。\d{4}年\d{1,2}月\d{1,2}日,?/g, dateStr);
  }

  beforeUpload = (file: any): boolean => {
    if (this.examineFormDto) {
      this.examineFormDto.attachment = this.examineFormDto.attachment ? this.examineFormDto.attachment : []

    }

    const name = file.name;
    const projectAttachment = new ProjectAttachment();
    projectAttachment['name'] = file.name;
    projectAttachment.attachmentName = file.name;
    projectAttachment['status'] = 'uploading'
    // projectAttachment.flieCode = tid; 
    this.examineFormDto.attachment.push(projectAttachment)

    let params = {
      sourceId: createguid(),
      AppId: AppId,
      module: "table",
    }
    const formData = new FormData();
    formData.append('files', file);
    this._publicServices.newUpload(formData, params).subscribe(data => {
      const index = checkArrayString(this.examineFormDto.attachment, 'attachmentName', name)

      this.examineFormDto.attachment[index]['url'] = URLConfig.getInstance().REGISTER_URL + 'api/Attachment/Download?appId=' + AppId + '&id=' + data.data[0].id
      this.examineFormDto.attachment[index]['status'] = 'done'

      this.examineFormDto.attachment[index].fileUrl = URLConfig.getInstance().REGISTER_URL + 'api/Attachment/Download?appId=' + AppId + '&id=' + data.data[0].id
      const fileList = lodash.cloneDeep(this.examineFormDto.attachment);

      this.examineFormDto.attachment = []
      this.examineFormDto.attachment = fileList
    }, error => {
      this.message.error('上传失败，上传文件不能超过30M');
      const index = checkArrayString(this.examineFormDto.attachment, 'attachmentName', name)
      this.examineFormDto.attachment[index]['status'] = 'error'
      const fileList = lodash.cloneDeep(this.examineFormDto.attachment);
      this.examineFormDto.attachment = []
      this.examineFormDto.attachment = fileList
    })
    return false;
  };

  removeFile = (file: UploadFile): boolean => {
    let params = {
      id: file.uid,
      AppId: AppId,
    };
    this._publicServices.delete(params).subscribe(data => {
      this.message.success(data.message)
    }, err => {
      this.message.error(err.message)
    });
    return true;
  }



  customReq = (item: UploadXHRArgs) => {

    var filePost = item.file as any;

    let params = {
      sourceId: createguid(),
      AppId: AppId,
      module: "table",
    }
    const formData = new FormData();
    formData.append('files', filePost);


    return this._publicServices.newUpload(formData, params).subscribe(data => {

      item.onSuccess!({}, item.file!, event);


      var list = this.examineFormDto.attachment;


      // var file = (list.length - 1 >= 0 ? list[list.length - 1] : list[0]) as any;
      var file = indexOfFileByName(list, item.file.name);

      file.uid = data.data[0].id;
      file.name = file.name;
      file.status = 'done';
      file.tid = file.uid;
      file.url = URLConfig.getInstance().REGISTER_URL + 'api/Attachment/Download?appId=' + AppId + '&id=' + data.data[0].id;
      file.fileUrl = URLConfig.getInstance().REGISTER_URL + 'api/Attachment/Download?appId=' + AppId + '&id=' + data.data[0].id;


    }, error => {
      this.message.error('上传失败，多次尝试无效请联系系统客服（请注意文件不能超过200M）');

      item.onError!('上传失败，多次尝试无效请联系系统客服（请注意文件不能超过200M）', item.file!);

    }

    );

  }
}
