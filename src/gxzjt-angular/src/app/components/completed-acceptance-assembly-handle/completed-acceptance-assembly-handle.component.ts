import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ArchitectureTypeEnum, OptionsEnum, RefractoryEnum, AppId } from 'infrastructure/expression';
import { objDeleteType, genID, createguid, checkArrayString } from 'infrastructure/regular-expression';
import { PublicModel } from 'infrastructure/public-model';
import { UploadFile } from 'ng-zorro-antd';
import { PublicServices } from 'services/public.services';
import { ExamineFormDto, ProjectAttachment } from '@shared/service-proxies/service-proxies';
import { URLConfig } from "@shared/config/host";

/**
 * 消竣工验收的表单模块的办理或者结果
 */
@Component({
  selector: 'app-completed-acceptance-assembly-handle',
  templateUrl: './completed-acceptance-assembly-handle.component.html',

})
export class CompletedAcceptanceAssemblyHandleComponent implements OnInit {

  //0是受理凭证  1是合格  2是不合格
  @Input() type = 0

  //从父页面传来的数据
  @Input() data: any

  //市县区
  position = OptionsEnum

  //结构类型
  typeSelect = ArchitectureTypeEnum

  //耐火结构
  refractoryEnum = RefractoryEnum

  //获取表单对象
  @ViewChild('f') f: FormGroup;

  //向父组件发送数据
  @Output() private childOuter = new EventEmitter();


  @Input() examineFormDto: ExamineFormDto;


  constructor(public _publicServices: PublicServices, public publicModel: PublicModel, ) { }

  ngOnInit() {

    // console.log(this.data);

    //向父组件发送数据   把表单对象传过去
    this.childOuter.emit(this.f);

    if (this.examineFormDto) {
      this.examineFormDto.attachment = this.examineFormDto.attachment ? this.examineFormDto.attachment : []
    }

    if (!this.examineFormDto.content && !this.examineFormDto.opinion) {
      this.examineFormDto.content =
        `    经随机抽查，你单位`
        + this.data.address + this.examineFormDto.projectName
        + `工程(备案凭证文号：`
        + this.examineFormDto.acceptFileCode
        + `，工程备案号为`
        + this.examineFormDto.recordNumber + `),被确定为检查对象。`
        + this.data.descr + `\r\n`
        + `    我局按照建设工程消防验收评定标准进行了检查。经审查资料及现场检查测试，综合评定该工程为不合格。主要存在下列问题：\r\n`
        + `    `
        // + `    1. ×××（存在问题），不符合《××》第×条第×款（规范名称及条文号）的规定。；\r\n`
        // + `    2. 同上；\r\n`
        // + `    3. 同上。\r\n`
        // + `    你单位应当组织对上述问题进行整改，整改后向我单位申请复查。未经抽查合格，工程不得投入使用，已经使用的，应当自即日起停止使用。\r\n`
        // + `    如不服本通知书要求，可以在收到本意见书之日起六十日内向××市人民政府申请行政复议或者三个月内依法向××人民法院提起行政诉讼。\r\n`
        ;
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
    const name = file.name;
    const projectAttachment = new ProjectAttachment();
    projectAttachment.attachmentName = file.name;
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
      // this.examineFormDto.attachment[index].fileNo = data.data[0].id 
      this.examineFormDto.attachment[index].fileUrl = URLConfig.getInstance().REGISTER_URL + data.data[0].localUrl
    })
    return false;
  };

  removeFile = (file: UploadFile): boolean => {

    return true;
  }


}
