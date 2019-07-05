import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ArchitectureTypeEnum, OptionsEnum, RefractoryEnum, AppId, URL_CONFIG } from 'infrastructure/expression';
import { objDeleteType, genID, createguid, checkArrayString } from 'infrastructure/regular-expression';
import { PublicModel } from 'infrastructure/public-model';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { PublicServices } from 'services/public.services';
import { ExamineFormDto, ProjectAttachment } from '@shared/service-proxies/service-proxies';
import lodash from 'lodash'
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


  @Input() examineFormDto: ExamineFormDto


  constructor(private message: NzMessageService, public _publicServices: PublicServices, public publicModel: PublicModel, ) {

  }

  ngOnInit() {

    setTimeout(() => {
      console.log(this.examineFormDto)
      console.log(this.data)
    }, 3000)

    //向父组件发送数据   把表单对象传过去
    this.childOuter.emit(this.f);



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
      console.log(this.examineFormDto.attachment);
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

      this.examineFormDto.attachment[index]['url'] = URL_CONFIG.getInstance().REGISTER_URL + 'api/Attachment/Download?appId=' + AppId + '&id=' + data.data[0].id
      this.examineFormDto.attachment[index]['status'] = 'done'

      this.examineFormDto.attachment[index].fileUrl = URL_CONFIG.getInstance().REGISTER_URL + 'api/Attachment/Download?appId=' + AppId + '&id=' + data.data[0].id
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
    return true;
  }


}
