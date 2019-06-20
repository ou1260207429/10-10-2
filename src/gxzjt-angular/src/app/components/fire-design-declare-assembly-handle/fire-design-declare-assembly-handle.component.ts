import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ArchitectureTypeEnum, OptionsEnum, RefractoryEnum, AppId } from 'infrastructure/expression';
import { objDeleteType, genID, createguid } from 'infrastructure/regular-expression';
import { PublicModel } from 'infrastructure/public-model';
import { UploadFile } from 'ng-zorro-antd';
import { PublicServices } from 'services/public.services';

/**
 * 消防设计的表单模块的办理或者结果
 */
@Component({
  selector: 'app-fire-design-declare-assembly-handle',
  templateUrl: './fire-design-declare-assembly-handle.component.html',
  styles: []
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

  //判断上传的焦点
  uoloadIndex: number = -1;



  fileList: UploadFile[] = [];

  constructor(public _publicServices: PublicServices, public publicModel: PublicModel, ) { }

  ngOnInit() {

    console.log(this.data);

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
  

  handleChange(index) {
    this.uoloadIndex = index
  }

  

   /**
    * 上传文件
    */
   uploadFiles(guid) {
    let params = {
      sourceId: guid,
      AppId: AppId,
      module: "table",
    }

    this.data.attachment.forEach((file: any) => {
      const formData = new FormData();
      formData.append('files', file);
      this._publicServices.newUpload(formData, params).subscribe(data => {
        console.log(data)
      })
    });
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.data.attachment = this.data.attachment?this.data.attachment:[]
    this.uploadFiles(createguid())
    this.data.attachment =this.data.attachment.concat(file);
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
