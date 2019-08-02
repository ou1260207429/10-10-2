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

  //判断是新增或者办理  0是新增 1是办理
  @Input() type: number = 0

  @Input() data: any;

  @Input() errorData = {
    projectCategoryId: false,
    specialEngineering: false,
    fireFightingFacilities: false
  }
  //市县区
  position: any;// = OptionsEnum

  //结构类型
  typeSelect = ArchitectureTypeEnum;

  //耐火结构
  refractoryEnum = RefractoryEnum;

  //获取表单对象
  @ViewChild('f') f: FormGroup;

  //判断上传的焦点
  uploadIndex: number = -1;

  //向父组件发送数据
  @Output() private childOuter = new EventEmitter();
  @Output() private printOuter = new EventEmitter();
  printData = { address: '', examination: '' };
  //从父组件获取使用行性质的select
  @Input() useNatureSelect: any;


  //资质等级的列表
  zzdjEnum = zzdjEnum;
  zzdjEnum1 = zzdjEnum1;
  zzdjEnum2 = zzdjEnum2;
  zzdjEnum3 = zzdjEnum3;
  zzdjEnum4 = zzdjEnum4;

  //审批单位
  engineeringList: any;

  engineering: any;

  constructor(private message: NzMessageService, public _publicServices: PublicServices, public _homeServiceProxy: HomeServiceProxy, public publicModel: PublicModel, ) { }

  ngOnInit() {
    //使用性质数据
    const selectChildren = [
      { natureName: "体育场馆", natureCode: "1" },
      { natureName: "会堂", natureCode: "2" },
      { natureName: "公共展览馆", natureCode: "3" },
      { natureName: "博物馆的展示厅", natureCode: "4" },
      { natureName: "民用机场航站楼", natureCode: "6" },
      { natureName: "客运车站候车室", natureCode: "7" },
      { natureName: "客运码头候船厅", natureCode: "8" },
      { natureName: "宾馆", natureCode: "9" },
      { natureName: "饭店", natureCode: "10" },
      { natureName: "商场", natureCode: "11" },
      { natureName: "市场", natureCode: "12" },
      { natureName: "影剧院", natureCode: "13" },
      { natureName: "公共图书馆的阅览室", natureCode: "14" },
      { natureName: "营业性室内健身场馆", natureCode: "15" },
      { natureName: "休闲场馆", natureCode: "16" },
      { natureName: "医院的门诊楼", natureCode: "17" },
      { natureName: "大学的教学楼", natureCode: "18" },
      { natureName: "图书馆", natureCode: "19" },
      { natureName: "食堂", natureCode: "20" },
      { natureName: "劳动密集型企业的生产加工车间", natureCode: "21" },
      { natureName: "寺庙", natureCode: "22" },
      { natureName: "教堂", natureCode: "23" },
      { natureName: "托儿所", natureCode: "24" },
      { natureName: "幼儿园的儿童用房", natureCode: "25" },
      { natureName: "儿童游乐厅等室内儿童活动场所", natureCode: "26" },
      { natureName: "养老院", natureCode: "27" },
      { natureName: "福利院", natureCode: "28" },
      { natureName: "医院", natureCode: "29" },
      { natureName: "疗养院的病房楼", natureCode: "30" },
      { natureName: "中小学校的教学楼", natureCode: "31" },
      { natureName: "学校的集体宿舍", natureCode: "32" },
      { natureName: "劳动密集型企业的员工集体宿舍", natureCode: "33" },
      { natureName: "歌舞厅", natureCode: "34" },
      { natureName: "录像厅", natureCode: "38" },
      { natureName: "放映厅", natureCode: "36" },
      { natureName: "卡拉ＯＫ厅", natureCode: "37" },
      { natureName: "夜总会", natureCode: "38" },
      { natureName: "游艺厅", natureCode: "39" },
      { natureName: "桑拿浴室", natureCode: "40" },
      { natureName: "网吧", natureCode: "41" },
      { natureName: "酒吧", natureCode: "42" },
      { natureName: "具有娱乐功能的□餐馆", natureCode: "43" },
      { natureName: "茶馆", natureCode: "44" },
      { natureName: "咖啡厅", natureCode: "45" },
      { natureName: "国家机关办公楼", natureCode: "46" },
      { natureName: "电力调度楼", natureCode: "47" },
      { natureName: "电信楼", natureCode: "48" },
      { natureName: "邮政楼", natureCode: "49" },
      { natureName: "防灾指挥调度楼", natureCode: "50" },
      { natureName: "广播电视楼", natureCode: "51" },
      { natureName: "档案楼", natureCode: "52" },
      { natureName: "本条第一至七项规定以外的单体建筑面积大于四万平方米或者建筑高度超过五十米的公共建筑", natureCode: "53" },
      { natureName: "国家标准规定的一类高层住宅建筑", natureCode: "54" },
      { natureName: "城市轨道交通", natureCode: "55" },
      { natureName: "隧道工程", natureCode: "56" },
      { natureName: "大型发电", natureCode: "57" },
      { natureName: "变配电工程", natureCode: "58" },
      { natureName: "生产、储存、装卸易燃易爆危险物品的工厂", natureCode: "59" },
      { natureName: "仓库", natureCode: "60" },
      { natureName: "专用车站", natureCode: "61" },
      { natureName: "码头，易燃易爆气体和液体的的充装站", natureCode: "62" },
      { natureName: "供应站", natureCode: "63" },
    ];
    this.useNatureSelect = selectChildren;


    //向父组件发送数据   把表单对象传过去
    this.childOuter.emit(this.f);
    this.getAreaDropdown();
    this.getOrganizationTree()

    if (this.type == 1) {
      setTimeout(() => {
        const a: any = this.f;
        this.f.controls.jsconstructionUnit.disable({ onlySelf: false, emitEvent: false });

        Object.keys(this.f.controls).forEach(function (key) {
          a.controls[key].disable({ onlySelf: false, emitEvent: false })
        });

      }, 500)
    }
  }
  ngAfterViewInit(): void {
    this.printOuter.emit(this.printData);
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
    let addressData = this.data.engineeringCitycountyAndDistrict;
    this._homeServiceProxy.getAreaDropdown().subscribe(data => {
      this.position = classTreeChildrenArray([JSON.parse(data)]);
      if (addressData.length > 0) {
        this.getAddress(addressData, addressData[0], this.position, 0, 'address', 'AreaId');
      };
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
        this.data.engineeringNo.push(item.value);

      });
      this.data.FlowTemplateSuffix = list[list.length - 1].FlowTemplateSuffix;
    }
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




    }, error => {
      this.message.error('上传失败，多次尝试无效请联系系统客服（请注意文件不能超过200M）');

      item.onError!('上传失败，多次尝试无效请联系系统客服（请注意文件不能超过200M）', item.file!);

      // this.data.fileList[index].pop();
    },


    )

  }
}
