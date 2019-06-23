import { HomeServiceProxy } from './../../../shared/service-proxies/service-proxies';
import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ArchitectureTypeEnum, OptionsEnum, RefractoryEnum, AppId, PANGBO_SERVICES_URL } from 'infrastructure/expression';
import { objDeleteType, genID, createguid, classTreeChildrenArray, checkArrayString } from 'infrastructure/regular-expression';
import { PublicModel } from 'infrastructure/public-model';
import { UploadFile } from 'ng-zorro-antd';
import { PublicServices } from 'services/public.services';

/**
 * 竣工验收的表单模块
 */
@Component({
  selector: 'app-completed-acceptance-assembly',
  templateUrl: './completed-acceptance-assembly.component.html',
  styles: []
})
export class CompletedAcceptanceAssemblyComponent implements OnInit {

  //判断是新增或者办理  0是新增 1是办理
  @Input() type: number = 0

  @Input() data: any

  //市县区
  position// = OptionsEnum

  //结构类型
  typeSelect = ArchitectureTypeEnum

  //耐火结构
  refractoryEnum = RefractoryEnum

  //获取表单对象
  @ViewChild('f') f: FormGroup;

  //向父组件发送数据
  @Output() private childOuter = new EventEmitter();

  //抽取号
  decimationnumber

  //判断上传的焦点
  uoloadIndex: number = -1; 

  @Input() errorData = {
    projectCategoryId: false,
    specialEngineering: false,
    fireFightingFacilities: false
  }
  constructor(public _publicServices: PublicServices, public _homeServiceProxy: HomeServiceProxy, public publicModel: PublicModel, ) {
    this.decimationnumber = [];
    for (let index = 1; index < 101; index++) {
      this.decimationnumber.push({ label: index, value: index })
    }
  }

  ngOnInit() {
    //向父组件发送数据   把表单对象传过去
    this.childOuter.emit(this.f);
    this.getAreaDropdown();

    setTimeout(() => {
      console.log(this.data);
    }, 2000)

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
