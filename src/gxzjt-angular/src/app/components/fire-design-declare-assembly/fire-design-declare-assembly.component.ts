import { HomeServiceProxy, ExamineFormDto } from './../../../shared/service-proxies/service-proxies';
import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';

import { ArchitectureTypeEnum, OptionsEnum, RefractoryEnum, AppId, zzdjEnum, zzdjEnum1, zzdjEnum2, zzdjEnum3, zzdjEnum4 } from 'infrastructure/expression';
import { objDeleteType, genID, createguid, classTreeChildrenArray, checkArrayString, newClassTreeChildrenArray, updateEngineeringNo } from 'infrastructure/regular-expression';
import { PublicModel } from 'infrastructure/public-model';
import { UploadFile, NzMessageService, UploadXHRArgs } from 'ng-zorro-antd';
import { PublicServices } from 'services/public.services';
import { EventEmiter } from 'infrastructure/eventEmiter';
import lodash from 'lodash';
import { URLConfig } from "@shared/config/host";
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

import { TokenService } from 'abp-ng2-module/dist/src/auth/token.service';

import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';


import { indexOfFileByName } from "@shared/utils/array";


/**
 * 消防设计的表单模块
 * 建设工程消防设计审查申报表
 */
@Component({
  selector: 'app-fire-design-declare-assembly',
  templateUrl: './fire-design-declare-assembly.component.html',

})
export class FireDesignDeclareAssemblyComponent implements OnInit {

  //判断是新增或者办理  0是新增 1是办理
  @Input() type: number = 0

  @Input() data: any;
  @Input() errorData = {
    projectCategoryId: false,
    specialEngineering: false,
    fireFightingFacilities: false
  }
  //市县区
  // position = OptionsEnum

  position: any;

  //结构类型
  typeSelect = ArchitectureTypeEnum;

  //耐火结构
  refractoryEnum = RefractoryEnum;

  //获取表单对象

  @ViewChild('f') f: FormGroup;
  //向父组件发送数据
  @Output() private childOuter = new EventEmitter();
  @Output() private printOuter = new EventEmitter();
  printData = { address: '', examination: '' };
  //判断上传的焦点
  uploadIndex: number = -1;

  //资质等级的列表
  zzdjEnum = zzdjEnum;
  zzdjEnum1 = zzdjEnum1;
  zzdjEnum2 = zzdjEnum2;
  zzdjEnum3 = zzdjEnum3;
  zzdjEnum4 = zzdjEnum4;

  //从父组件获取使用行性质的select
  @Input() useNatureSelect: any;

  //审批单位
  engineeringList: any;
  engineering: any;
  constructor(private message: NzMessageService,
    private eventEmiter: EventEmiter,
    public _homeServiceProxy: HomeServiceProxy,
    public _publicServices: PublicServices,
    public publicModel: PublicModel,
    private http: HttpClient,
    private _tokenService: TokenService,
    private fb: FormBuilder) {

  }



  ngOnInit() {

    //向父组件发送数据   把表单对象传过去
    this.childOuter.emit(this.f);
    this.getOrganizationTree();
    this.getAreaDropdown();




    if (this.type == 1) {
      setTimeout(() => {
        const a: any = this.f;
        this.f.controls.jsconstructionUnit.disable({ onlySelf: false, emitEvent: false })
        Object.keys(this.f.controls).forEach(function (key) {
          a.controls[key].disable({ onlySelf: false, emitEvent: false })
        });

      }, 500);
    }

  }
  ngAfterViewInit(): void {
    this.printOuter.emit(this.printData);
  }



  /**
   * 选择市县区
   * @param v 
   */
  changeCitycountyAndDistrict(v) {
    this.data.engineeringCitycountyAndDistrict = v;
    const t = lodash.cloneDeep(v)
    const list = this.publicModel.positionTreeArray(this.engineeringList, 'areaIds', t, [])
    this.data.engineeringNo = []
    if (list.length > 0) {
      list.forEach(item => {
        this.data.engineeringNo.push(item.value);

      });
      this.data.FlowTemplateSuffix = list[list.length - 1].FlowTemplateSuffix;
    }

  }
  /**
   * 获取工程地址中文
   */
  getAddress(data, value, arr, i, str, valueName) {
    if (i < data.length) {
      arr.forEach(element => {
        if (element[valueName] == value) {
          this.printData[str] += i < (data.length - 1) ? element.Name + '/' : element.Name;
          i = i + 1;
          this.getAddress(data, data[i], element.Children, i, str, valueName);
        }
      });
    }

  }
  /**
   * 获取市县区的接口
   */
  getAreaDropdown() {
    this._homeServiceProxy.getAreaDropdown().subscribe(data => {
      this.position = classTreeChildrenArray([JSON.parse(data)]);
      let addressData = this.data.engineeringCitycountyAndDistrict;
      if (addressData.length > 0) {
        this.getAddress(addressData, addressData[0], this.position, 0, 'address', 'AreaId');
      };
    })
  }

  /**
   * 获取审批单位
   */
  getOrganizationTree() {
    this._publicServices.getOrganizationTree().subscribe((data: any) => {
      this.engineeringList = newClassTreeChildrenArray([JSON.parse(data.result)]);
      let engineeringNo = this.data.engineeringNo;
      if (engineeringNo.length > 0) {
        this.getAddress(engineeringNo, engineeringNo[0], this.engineeringList, 0, 'examination', 'ID');
      };
    })
  }

  /**
   * 选择市县区
   * @param v 
   */
  changeGetOrganizationTree(v) {
    //联动处理
    // this.data.engineeringId = lodash.cloneDeep(v); 
    // const list = this.publicModel.positionTreeArray(this.engineeringList, 'value', v, []) 
    // this.data.engineeringNo = list[list.length - 1].id  
    if (v.length > 0) {
      var lastId = v[v.length - 1];
      this.data.FlowTemplateSuffix = this.publicModel.findFlowTemplateSuffix(this.engineeringList, lastId);
    }
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

  addArrayStr(arr) {
    arr.push("");
  }
  /**
   * 删除数组
   */
  deleteArray(arr, index) {
    this.publicModel.engineeringDeleteArray(arr, index)
  }

  customReq = (item: UploadXHRArgs) => {

    var filePost = item.file as any;
    let params = {
      sourceId: createguid(),
      AppId: AppId,
      module: "table",
    };

    var formData = new FormData();
    formData.append('files', filePost);



    return this._publicServices.newUpload(formData, params).subscribe(data => {


      item.onSuccess!({}, item.file!, event);

      var file = null;
      for (var i = this.data.fileList.length - 1; i >= 0; --i) {
        var list = this.data.fileList[i].array;
        file = indexOfFileByName(list, item.file.name);
        if (file) {
          break;
        }
      }

      if (file == null) {
        item.onError!('无法找到文件', item.file!);
        return;
      }

      file.uid = data.data[0].id;
      file.name = file.name;
      file.status = 'done';
      file.tid = file.uid;
      file.url = URLConfig.getInstance().REGISTER_URL + 'api/Attachment/Download?appId=' + AppId + '&id=' + data.data[0].id;
      file.hadUpLoad = 1;
      // item.onSuccess!(data, item.file!, HttpEventType.Response);


    }, error => {
      this.message.error('上传失败，多次尝试无效请联系系统客服（请注意文件不能超过200M）');

      item.onError!('上传失败，多次尝试无效请联系系统客服（请注意文件不能超过200M）', item.file!);

      // this.data.fileList[index].pop();
    },


    )

  }



  beforeUpload = (file: any): boolean => {

    let params = {
      sourceId: createguid(),
      AppId: AppId,
      module: "table",
    };

    var formData = new FormData();
    formData.append('files', file);
    this._publicServices.newUpload(formData, params).subscribe(data => {

      const tid = file.uid
      this.data.fileList[this.uploadIndex].array.push({
        name: file.name,
        status: 'uploading',
        tid: file.uid,
      });
      var index = checkArrayString(this.data.fileList[this.uploadIndex].array, 'tid', tid);
      this.data.fileList[this.uploadIndex].array[index].uid = data.data[0].id;
      this.data.fileList[this.uploadIndex].array[index].url = URLConfig.getInstance().REGISTER_URL + 'api/Attachment/Download?appId=' + AppId + '&id=' + data.data[0].id;
      this.data.fileList[this.uploadIndex].array[index].status = 'done';

    }, error => {
      this.message.error('上传失败:' + error);


      // this.data.fileList = []
      // var index = checkArrayString(this.data.fileList[this.uoloadIndex].array, 'tid', tid);
      // this.data.fileList[this.uoloadIndex].array[index].status = 'error';
      // var fileList = lodash.cloneDeep(this.data.fileList);
      // this.data.fileList = [];
      // this.data.fileList = fileList;
    })
    return false;
  };

  removeFile = (file: UploadFile): boolean => {
    if (file.hadUpLoad && file.hadUpLoad == 1) {
      let params = {
        id: file.uid,
        AppId: AppId,
      };
      this._publicServices.delete(params).subscribe(data => {
        this.message.success(data.message)
      }, err => {
        this.message.error(err.message)
      });
    };
    return true
  }

  handleChange(index) {
    this.uploadIndex = index;
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.data.planEndTime) {
      return false;
    }
    // return startValue.getTime() > this.data.planEndTime.getTime();
    if (this.data.planEndTime instanceof Date) {
      return startValue.getTime() <= this.data.planStartTime.getTime();
    }else{
      return startValue.getTime() <= new Date(this.data.planEndTime).getTime();
    }
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.data.planStartTime) {
      return false;
    }
    if (this.data.planStartTime instanceof Date) {
      return endValue.getTime() <= this.data.planStartTime.getTime();
    }else{
      return endValue.getTime() <= new Date(this.data.planStartTime).getTime();
    }
  
  };


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
