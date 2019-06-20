import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ArchitectureTypeEnum, OptionsEnum, RefractoryEnum, AppId } from 'infrastructure/expression';
import { objDeleteType, genID, createguid } from 'infrastructure/regular-expression';
import { PublicModel } from 'infrastructure/public-model';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { PublicServices } from 'services/public.services';
import { ExamineFormDto } from '@shared/service-proxies/service-proxies';

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

  /**
    * 上传文件
    */
  uploadFiles(guid, file, then?: Function) {
    let params = {
      sourceId: guid,
      AppId: AppId,
      module: "table",
    }

    const formData = new FormData();
    formData.append('files', file);
    this._publicServices.newUpload(formData, params).subscribe(data => {
      console.log(data)
      if (then) then()
    })
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.uploadFiles(createguid(), file, () => {
      this.data.attachment = this.data.attachment.concat(file);
      console.log(this.data.attachment);
    })
    return false;
  };

  removeFile = (file: UploadFile): boolean => {
    this.data.attachment.forEach((item, index) => {
      if (item.uid == file.uid) {
        this.data.attachment.splice(index, 1);
      }
    });
    return true;
  }

}
