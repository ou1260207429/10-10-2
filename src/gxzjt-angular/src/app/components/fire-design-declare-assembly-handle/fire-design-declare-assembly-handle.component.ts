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
import { dateTrans } from 'infrastructure/regular-expression';
/**
 * 消防设计的表单模块的办理或者结果
 */
@Component({
  selector: 'app-fire-design-declare-assembly-handle',
  templateUrl: './fire-design-declare-assembly-handle.component.html',

})
export class FireDesignDeclareAssemblyHandleComponent implements OnInit {

  //0是受理凭证  1是合格  2是不合格
  @Input() type = 0

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


  @Input() examineFormDto: ExamineFormDto;


  constructor(private message: NzMessageService, public _publicServices: PublicServices, public publicModel: PublicModel, ) {

  }

  ngOnInit() {

    //向父组件发送数据   把表单对象传过去
    this.childOuter.emit(this.f);

    if (!this.examineFormDto.content && !this.examineFormDto.opinion) {


      var dateStr = dateTrans(this.examineFormDto.acceptTime, '年', '月', '日');
      // var dateStr = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + "日";

      // var descr = this.data.descr;
      // if (descr && descr.substring(descr.length - 1, descr.length) == "。") {
      //   descr = descr.substring(0, descr.length - 1);
      // }


      this.examineFormDto.content =
        `    你单位申请的` + this.data.projectName + `建设工程（受理凭证：` + this.data.acceptFileCode + `，`
        + dateStr + `收）消防设计文件收悉。该工程位于` + this.data.address + `。`
        + this.data.descr + `。设计单位为` + this.examineFormDto.designOrg.companyName
        + `，设计资质为建设工程` + this.examineFormDto.designOrg.qualifications
        + `。按照图纸审查机构（` + this.examineFormDto.drawingOrg.companyName
        + `）对该工程设计图纸的技术审查结论，我局提出以下意见：\r\n`
        + `    `
        // + `    一、同意该工程消防设计，请按照审查批准的消防设计文件进行施工。\r\n`
        // + `    二、建设单位应当依法选用具有规定资质等级的施工、监理等单位，并查验其合法身份证明和资质等级证明文件。\r\n`
        // + `    三、提供图纸审查的技术服务机构和人员对出具的技术审查意见负责。\r\n`
        // + `    四、经此次审查的建设工程消防设计图纸如需变更，应当重新报送我单位审查。该工程竣工后，应当向我单位申报消防验收，验收合格后方可投入使用。\r\n`
        ;
        
        this.examineFormDto.content=this.examineFormDto.content.replace(/。+/g, '。');
    }


  }



  /**
   * 选择市县区
   * @param v 
   */
  changeCitycountyAndDistrict(v) {
    this.data.engineeringCitycountyAndDistrict = v;
  }

  /**
   * 添加数组
   * @param arr 数组
   */
  addArray(arr) {
    arr.push(objDeleteType(arr[0]))
  }

  /**
   * 删除数组
   */
  deleteArray(arr, index) {
    this.publicModel.engineeringDeleteArray(arr, index)
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
      // var file = item.file;
      var list = this.examineFormDto.attachment;

      // var file = (list.length - 1 >= 0 ? list[list.length - 1] : list[0]) as any;
      var file = indexOfFileByName(list, item.file.name);

      if (!file) {
        return;
      }

      file.uid = data.data[0].id;
      file.name = file.name;
      file.status = 'done';
      file.tid = file.uid;
      file.url = URLConfig.getInstance().REGISTER_URL + 'api/Attachment/Download?appId=' + AppId + '&id=' + data.data[0].id;
      file.fileUrl = URLConfig.getInstance().REGISTER_URL + 'api/Attachment/Download?appId=' + AppId + '&id=' + data.data[0].id;


    }, error => {
      this.message.error('上传失败，多次尝试无效请联系系统客服（请注意文件不能超过200M）');

      item.onError!('上传失败，多次尝试无效请联系系统客服（请注意文件不能超过200M）', item.file!);


    });


  }




}
