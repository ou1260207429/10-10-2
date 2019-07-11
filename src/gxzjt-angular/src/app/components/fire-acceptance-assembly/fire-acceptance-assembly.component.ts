import { HomeServiceProxy } from './../../../shared/service-proxies/service-proxies';
import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ArchitectureTypeEnum, OptionsEnum, RefractoryEnum, AppId, URL_CONFIG, zzdjEnum4, zzdjEnum3, zzdjEnum2, zzdjEnum1, zzdjEnum } from 'infrastructure/expression';
import { objDeleteType, genID, createguid, classTreeChildrenArray, checkArrayString, newClassTreeChildrenArray, updateEngineeringNo } from 'infrastructure/regular-expression';
import { PublicModel } from 'infrastructure/public-model';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { PublicServices } from 'services/public.services';
import { DepFlags } from '@angular/compiler/src/core';
import lodash from 'lodash'
import { SelectorOrgComponent } from '@shared/components/selector/selector-org';

/**
 * 消防验收的表单模块
 */
@Component({
  selector: 'app-fire-acceptance-assembly',
  templateUrl: './fire-acceptance-assembly.component.html',

})
export class FireAcceptanceAssemblyComponent implements OnInit {

  //判断是新增或者办理  0是新增 1是办理
  @Input() type: number = 0

  @Input() data: any

  @Input() errorData = {
    projectCategoryId: false,
    specialEngineering: false,
    fireFightingFacilities: false
  }
  //市县区
  position// = OptionsEnum

  //结构类型
  typeSelect = ArchitectureTypeEnum

  //耐火结构
  refractoryEnum = RefractoryEnum

  //获取表单对象
  @ViewChild('f') f: FormGroup;

  //判断上传的焦点
  uoloadIndex: number = -1;

  //向父组件发送数据
  @Output() private childOuter = new EventEmitter();

  //从父组件获取使用行性质的select
  @Input() useNatureSelect: any


  //资质等级的列表
  zzdjEnum = zzdjEnum
  zzdjEnum1 = zzdjEnum1
  zzdjEnum2 = zzdjEnum2
  zzdjEnum3 = zzdjEnum3
  zzdjEnum4 = zzdjEnum4

  //审批单位
  engineeringList

  engineering
  
  constructor(private message: NzMessageService,public _publicServices: PublicServices, public _homeServiceProxy: HomeServiceProxy, public publicModel: PublicModel, ) { }

  ngOnInit() {
    //向父组件发送数据   把表单对象传过去
    this.childOuter.emit(this.f);
    this.getAreaDropdown();
    this.getOrganizationTree()
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
    this.data.engineeringCitycountyAndDistrict = v
    this.engineering = lodash.cloneDeep(v);   
    const result = updateEngineeringNo(this.engineeringList, this.engineering.length - 1,this.engineering, this.data.engineeringNo)
    this.data.engineeringNo = result.no  
    this.data.engineeringId = this.engineering 
  } 

  /**
   * 获取审批单位
   */
  getOrganizationTree() {
    this._publicServices.getOrganizationTree().subscribe((data: any) => {
      this.engineeringList = newClassTreeChildrenArray([JSON.parse(data.result)]);;
    })
  }
  

  /**
   * 选择市县区
   * @param v 
   */
  changeGetOrganizationTree(v) {
    
    //联动处理
    this.data.engineeringId = lodash.cloneDeep(v); 

    const list = this.publicModel.positionTreeArray(this.engineeringList, 'value', v, []) 
    this.data.engineeringNo = list[list.length - 1].id  
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
      status: 'uploading',
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
      this.data.fileList[this.uoloadIndex].array[index].url = URL_CONFIG.getInstance().REGISTER_URL + 'api/Attachment/Download?appId=' + AppId + '&id=' + data.data[0].id
      this.data.fileList[this.uoloadIndex].array[index].status = 'done'
      const fileList = lodash.cloneDeep(this.data.fileList);
      this.data.fileList = []
      this.data.fileList = fileList
    }, error => {
      this.message.error('上传失败，上传文件不能超过30M');
      const index = checkArrayString(this.data.fileList[this.uoloadIndex].array, 'tid', tid)
      this.data.fileList[this.uoloadIndex].array[index].status = 'error'
      const fileList = lodash.cloneDeep(this.data.fileList);
      this.data.fileList = []
      this.data.fileList = fileList
    })
    return false;
  };

  removeFile = (file: UploadFile): boolean => {
    return true;
  }

  handleChange(index) {
    this.uoloadIndex = index
  }




  onSelectOrgItem(res, item) {
    // console.log(res);
    // console.log(item);
    item.qualificationLevel = res.qualificationLevel;
    item.contacts = res.contact;
    item.contactsNumber = res.contactPhone;
    item.legalRepresentative = res.leader;

  }

  onSelectOrgTitle(res) {
    this.data.legalRepresentative = res.leader;
    this.data.legalRepresentativeNo = res.leaderPhone;



  }

}
