import { HomeServiceProxy } from './../../../shared/service-proxies/service-proxies';
import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ArchitectureTypeEnum, OptionsEnum, RefractoryEnum, AppId, zzdjEnum4, zzdjEnum3, zzdjEnum2, zzdjEnum1, zzdjEnum } from 'infrastructure/expression';
import { objDeleteType, genID, createguid, classTreeChildrenArray, checkArrayString, newClassTreeChildrenArray, updateEngineeringNo } from 'infrastructure/regular-expression';
import { PublicModel } from 'infrastructure/public-model';
import { UploadFile, NzMessageService, UploadXHRArgs } from 'ng-zorro-antd';
import { PublicServices } from 'services/public.services';
import { DepFlags } from '@angular/compiler/src/core';
import lodash from 'lodash'
import { SelectorOrgComponent } from '@shared/components/selector/selector-org';
import { URLConfig } from "@shared/config/host";
import { indexOfFileByName } from "@shared/utils/array";

/**
 * 消防验收的表单模块
 */
@Component({
  selector: 'app-fire-acceptance-assembly',
  templateUrl: './fire-acceptance-assembly.component.html',

})
export class FireAcceptanceAssemblyComponent implements OnInit {
  //搜索
  //selectedValue:"体育场馆";
  selectArr: Array<{ label: string; value: string }> = [];

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
  uploadIndex: number = -1;

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

  constructor(private message: NzMessageService, public _publicServices: PublicServices, public _homeServiceProxy: HomeServiceProxy, public publicModel: PublicModel, ) { }
  
  ngOnInit() {
    //使用性质数据
  const selectChildren = [
    { label:"体育场馆",value:"体育场馆"},
    { label:"会堂", value:"会堂"},
    { label: "公共展览馆", value: "公共展览馆"},
    { label: "博物馆的展示厅", value: "博物馆的展示厅"},
    { label: "民用机场航站楼", value: "民用机场航站楼"},
    { label: "客运车站候车室", value: "客运车站候车室"},
    { label: "客运码头候船厅", value: "客运码头候船厅"},
    { label: "宾馆", value: "宾馆"},
    { label: "饭店", value:"饭店"},
    { label: "商场", value: "商场"},
    { label: "市场", value: "市场"},
    { label: "影剧院", value: "影剧院"},
    { label: "公共图书馆的阅览室", value: "公共图书馆的阅览室"},
    { label: "营业性室内健身场馆", value:"营业性室内健身场馆"},
    { label: "休闲场馆", value: "休闲场馆"},
    { label: "医院的门诊楼", value: "医院的门诊楼"},
    { label: "大学的教学楼", value:"大学的教学楼"},
    { label: "图书馆", value:"图书馆"},
    { label: "食堂", value: "食堂"},
    { label: "劳动密集型企业的生产加工车间", value: "劳动密集型企业的生产加工车间"},
    { label: "寺庙", value: "寺庙"},
    { label: "教堂", value: "教堂"},
    { label: "托儿所", value:"托儿所"},
    { label: "幼儿园的儿童用房", value:"幼儿园的儿童用房"},
    { label: "儿童游乐厅等室内儿童活动场所", value:"儿童游乐厅等室内儿童活动场所"},
    { label: "养老院", value:"养老院"},
    { label: "福利院", value:"福利院"},
    { label: "医院", value:"医院"},
    { label: "疗养院的病房楼", value:"疗养院的病房楼"},
    { label: "中小学校的教学楼", value:"中小学校的教学楼"},
    { label: "学校的集体宿舍", value:"学校的集体宿舍"},
    { label: "劳动密集型企业的员工集体宿舍", value:"劳动密集型企业的员工集体宿舍"},
    { label: "歌舞厅", value:"歌舞厅"},
    { label: "录像厅", value:"录像厅"},
    { label: "放映厅", value:"放映厅"},
    { label: "卡拉ＯＫ厅", value:"卡拉ＯＫ厅"},
    { label: "夜总会", value: "夜总会"},
    { label: "游艺厅",value:"游艺厅"},
    { label: "桑拿浴室",value:"桑拿浴室"},
    { label: "网吧", value:"网吧"},
    { label: "酒吧", value:"酒吧"},
    { label: "具有娱乐功能的□餐馆",value:"具有娱乐功能的□餐馆"},
    { label: "茶馆", value:"茶馆"},
    { label: "咖啡厅", value:"咖啡厅"},
    { label:  "国家机关办公楼",value: "国家机关办公楼"},
    { label: "电力调度楼", value:"电力调度楼"},
    { label:  "电信楼", value: "电信楼"},
    { label: "邮政楼",value:"邮政楼"},
    { label: "防灾指挥调度楼", value:"防灾指挥调度楼"},
    { label: "广播电视楼", value:"广播电视楼"},
    { label: "档案楼", value:"档案楼"},
    { label: "本条第一至七项规定以外的单体建筑面积大于四万平方米或者建筑高度超过五十米的公共建筑",value:"本条第一至七项规定以外的单体建筑面积大于四万平方米或者建筑高度超过五十米的公共建筑"},
    { label:"国家标准规定的一类高层住宅建筑",value:"国家标准规定的一类高层住宅建筑"},
    { label: "城市轨道交通",value:"城市轨道交通"},
    { label: "隧道工程",value:"隧道工程"},
    { label: "大型发电",value:"大型发电"},
    { label: "变配电工程",value:"变配电工程"},
    { label: "生产、储存、装卸易燃易爆危险物品的工厂",value:"生产、储存、装卸易燃易爆危险物品的工厂"},
    { label: "仓库",value:"仓库"},
    { label: "专用车站", value:"专用车站"},
    { label: "码头，易燃易爆气体和液体的的充装站", value:"码头，易燃易爆气体和液体的的充装站"},
    { label: "供应站", value:"供应站"},
    { label:"调压站",value:"调压站"}
  ];
  this.selectArr =selectChildren;
    

    //向父组件发送数据   把表单对象传过去
    this.childOuter.emit(this.f);
    this.getAreaDropdown();
    this.getOrganizationTree()

    if (this.type == 1) {
      setTimeout(() => {
        const a: any = this.f;
        this.f.controls.jsconstructionUnit.disable({ onlySelf: false, emitEvent: false })
        Object.keys(this.f.controls).forEach(function (key) {
          a.controls[key].disable({ onlySelf: false, emitEvent: false })
        });
      }, 500)
    }
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
    const t = lodash.cloneDeep(v)
    const list = this.publicModel.positionTreeArray(this.engineeringList, 'areaIds', t, [])
    this.data.engineeringNo = []
    if (list.length > 0) {
      list.forEach(item => {
        this.data.engineeringNo.push(item.value)
      })
    }
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

    // //联动处理
    // this.data.engineeringId = lodash.cloneDeep(v); 

    // const list = this.publicModel.positionTreeArray(this.engineeringList, 'value', v, []) 
    // this.data.engineeringNo = list[list.length - 1].id  
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
    this.data.fileList[this.uploadIndex].array.push({
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
      const index = checkArrayString(this.data.fileList[this.uploadIndex].array, 'tid', tid)
      this.data.fileList[this.uploadIndex].array[index].uid = data.data[0].id
      this.data.fileList[this.uploadIndex].array[index].url = URLConfig.getInstance().REGISTER_URL + 'api/Attachment/Download?appId=' + AppId + '&id=' + data.data[0].id
      this.data.fileList[this.uploadIndex].array[index].status = 'done'
      const fileList = lodash.cloneDeep(this.data.fileList);
      this.data.fileList = []
      this.data.fileList = fileList
    }, error => {
      this.message.error('上传失败，上传文件不能超过30M');
      const index = checkArrayString(this.data.fileList[this.uploadIndex].array, 'tid', tid)
      this.data.fileList[this.uploadIndex].array[index].status = 'error'
      const fileList = lodash.cloneDeep(this.data.fileList);
      this.data.fileList = []
      this.data.fileList = fileList
    })
    return false;
  };

  removeFile = (file: UploadFile): boolean => {
    let params = {
      id: file.uid,
      AppId: AppId,
    };
    this._publicServices.delete(params).subscribe(data => {
      this.message.success(data.message)
    }, err => {
      this.message.error(err.message)
    });
    return true;
  }

  handleChange(index) {
    this.uploadIndex = index
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

  customReq = (item: UploadXHRArgs) => {

    var filePost = item.file as any;
    let params = {
      sourceId: createguid(),
      AppId: AppId,
      module: "table",
    };

    var formData = new FormData();
    formData.append('files', filePost);


    const index = this.uploadIndex;

    return this._publicServices.newUpload(formData, params).subscribe(data => {

      // item.onError!(data, item.file!);
      item.onSuccess!({}, item.file!, event);
      var list = this.data.fileList[index].array;

      // var file = list.length - 1 >= 0 ? list[list.length - 1] : list[0];

      var file = indexOfFileByName(list, item.file.name);

      file.uid = data.data[0].id;
      file.name = file.name;
      file.status = 'done';
      file.tid = file.uid;
      file.url = URLConfig.getInstance().REGISTER_URL + 'api/Attachment/Download?appId=' + AppId + '&id=' + data.data[0].id;




    }, error => {
      this.message.error('上传失败，文件不能超过200M！');

      item.onError!('上传失败，文件不能超过200M！', item.file!);

      // this.data.fileList[index].pop();
    },


    )

  }
}
