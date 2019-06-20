import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ArchitectureTypeEnum, OptionsEnum, RefractoryEnum, AppId, PANGBO_SERVICES_URL } from 'infrastructure/expression';
import { objDeleteType, genID, createguid, checkArrayString } from 'infrastructure/regular-expression';
import { PublicModel } from 'infrastructure/public-model';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { PublicServices } from 'services/public.services';
import { ExamineFormDto, ProjectAttachment } from '@shared/service-proxies/service-proxies';

/**
 * 消防验收的表单模块的办理或者结果
 */
@Component({
  selector: 'app-fire-acceptance-assembly-handle',
  templateUrl: './fire-acceptance-assembly-handle.component.html',
  styles: []
})
export class FireAcceptanceAssemblyHandleComponent implements OnInit {

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

  //判断上传的焦点
  uoloadIndex: number = -1;

  @Input() examineFormDto:ExamineFormDto

  constructor(private message: NzMessageService, public _publicServices: PublicServices, public publicModel: PublicModel, ) { }

  ngOnInit() {
    //向父组件发送数据   把表单对象传过去
    this.childOuter.emit(this.f);
    this.data.attachment = this.data.attachment ? this.data.attachment : []
  }

  beforeUpload = (file: any): boolean => {
    if(this.examineFormDto){
      this.examineFormDto.attachment = this.examineFormDto.attachment?this.examineFormDto.attachment:[]
      console.log(this.examineFormDto.attachment);
    }
 
    const name = file.name;
    const projectAttachment = new ProjectAttachment();
    projectAttachment['name'] = file.name;
    projectAttachment.attachmentName = file.name;
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
      // this.examineFormDto.attachment[index].fileNo = data.data[0].id 
      this.examineFormDto.attachment[index].fileUrl =PANGBO_SERVICES_URL+data.data[0].localUrl 
    }) 
    return false;
  };

  removeFile = (file: UploadFile): boolean => {
    return true;
  }

}
