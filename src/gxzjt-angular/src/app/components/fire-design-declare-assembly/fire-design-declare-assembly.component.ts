import { HomeServiceProxy, ExamineFormDto } from './../../../shared/service-proxies/service-proxies';
import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ArchitectureTypeEnum, OptionsEnum, RefractoryEnum, AppId, PANGBO_SERVICES_URL } from 'infrastructure/expression';
import { objDeleteType, genID, createguid, classTreeChildrenArray, checkArrayString } from 'infrastructure/regular-expression';
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
  @Input() errorData: any
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

  constructor(public _homeServiceProxy: HomeServiceProxy, public _publicServices: PublicServices, public publicModel: PublicModel, ) { }

  ngOnInit() {
    //向父组件发送数据   把表单对象传过去
    this.childOuter.emit(this.f);

    this.getAreaDropdown();

    console.log(this.errorData);
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
  getAreaDropdown() {
    this._homeServiceProxy.getAreaDropdown().subscribe(data => {
      this.position = classTreeChildrenArray([JSON.parse(data)]);
    })
  }
  /**
   * 
   * @param value 值
   * @param type 字段类型
   */
  changeValue(value, type) {
    if (!value && value == "") {
      this.errorData[type] = true
    } else {
      this.errorData[type] = false;
    }
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
    const tid = file.uid
    this.data.fileList[this.uoloadIndex].array.push({
      name: file.name,
      status: 'done',
      tid: file.uid,
    })

    let params = {
      sourceId: createguid(),
      AppId: AppId,
      module: "table",
    }
    const formData = new FormData();
    formData.append('files', file);
    this._publicServices.newUpload(formData, params).subscribe(data => {
      const index = checkArrayString(this.data.fileList[this.uoloadIndex].array, 'tid', tid)
      this.data.fileList[this.uoloadIndex].array[index].uid = data.data[0].id
      this.data.fileList[this.uoloadIndex].array[index].url = PANGBO_SERVICES_URL + data.data[0].localUrl
    })
    return false;
  };

  removeFile = (file: UploadFile): boolean => {
    return true;
  }

  handleChange(index) {
    this.uoloadIndex = index
  }

}
