import { HomeServiceProxy } from './../../../shared/service-proxies/service-proxies';
import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ArchitectureTypeEnum, OptionsEnum, RefractoryEnum, AppId } from 'infrastructure/expression';
import { objDeleteType, genID, createguid, classTreeChildrenArray } from 'infrastructure/regular-expression';
import { PublicModel } from 'infrastructure/public-model';
import { UploadFile } from 'ng-zorro-antd';
import { PublicServices } from 'services/public.services';

/**
 * 消防设计的表单模块
 */
@Component({
  selector: 'app-fire-design-declare-assembly',
  templateUrl: './fire-design-declare-assembly.component.html',
  styles: []
})
export class FireDesignDeclareAssemblyComponent implements OnInit {

  //判断是新增或者办理  0是新增 1是办理
  @Input() type: number = 0

  @Input() data: any

  //市县区
  // position = OptionsEnum

  position

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

  constructor(public _homeServiceProxy:HomeServiceProxy,public _publicServices: PublicServices, public publicModel: PublicModel, ) { }

  ngOnInit() { 
    //向父组件发送数据   把表单对象传过去
    this.childOuter.emit(this.f);

    this.getAreaDropdown(); 
  }



  /**
   * 选择市县区
   * @param v 
   */
  changeCitycountyAndDistrict(v) {
    this.data.engineeringCitycountyAndDistrict = v;
  }

  /**
   * 获取市县区的接口
   */
  getAreaDropdown(){
    this._homeServiceProxy.getAreaDropdown().subscribe(data=>{  
      this.position = classTreeChildrenArray([JSON.parse(data)]);
    })
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
      this.data.fileList[this.uoloadIndex].array = this.data.fileList[this.uoloadIndex].array.concat(file); 
    })
    return false;
  };

  removeFile = (file: UploadFile): boolean => {
    this.data.fileList[this.uoloadIndex].array.forEach((item, index) => {
      if (item.uid == file.uid) {
        this.data.fileList[this.uoloadIndex].array.splice(index, 1);
      }
    });
    return true;
  }

  handleChange(index) {
    this.uoloadIndex = index
  }

}
