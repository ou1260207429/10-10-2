import { PublicModel } from './../../../../infrastructure/public-model';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { objDeleteType, timeTrans } from 'infrastructure/regular-expression';
import { ArchitectureTypeEnum, OptionsEnum } from 'infrastructure/expression';
import { ApplyServiceServiceProxy, FlowFormDto, FlowFormQueryDto } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute } from '@angular/router';
/**
 * 工程管理->竣工验收->新增申报
 */
@Component({
  selector: 'app-add-completed-acceptance',
  templateUrl: './add-completed-acceptance.component.html',
  styles: []
})
export class AddCompletedAcceptanceComponent implements OnInit {

  data: any = {
    recordNo: '',
    projectName: '',
    projectNumber: '',
    engineeringAddress: '',
    useNature: '',
    constructionPermitNumber: '',
    testReportNumber: '',
    planEndTime: '',
    constructionUnit: {
      name: '',
      qualificationLevel: '',
      contacts: '',
      contactsNumber: ''
    },
    designUnit: {
      name: '',
      qualificationLevel: '',
      contacts: '',
      contactsNumber: ''
    },
    contractingUnit: {
      name: '',
      qualificationLevel: '',
      contacts: '',
      contactsNumber: ''
    },
    subcontractors: {
      name: '',
      qualificationLevel: '',
      contacts: '',
      contactsNumber: ''
    },
    supervisoryUnit: {
      name: '',
      qualificationLevel: '',
      contacts: '',
      contactsNumber: ''
    },
    detectionUnit: {
      name: '',
      qualificationLevel: '',
      contacts: '',
      contactsNumber: ''
    },
    basicInformation: [
      {
        name: '',
        type: '',
        grade: '',
        height: '',
        builtUpArea: '',
        fireHazard: '',
      }
    ],
    storageTank: [
      {
        position: '',
        settingForm: '',
        type: '',
        materialQuality: '',
        pressure: '',
        temperature: '',
        form: '',
      }
    ],
    yard: [
      { reserves: '', name: '' }
    ],

    newcheckboxEngineering: [
      {
        label: '土建工程',
        value: false,
        checked: false,
        arr: [
          { label: '防火间距', value: false, checked: false },
          { label: '防火分区', value: false, checked: false },
          { label: '防烟分区', value: false, checked: false },
          { label: '消防电梯 ', value: false, checked: false },
          { label: '防烟楼梯', value: false, checked: false },
          { label: '封闭楼梯', value: false, checked: false },
          { label: '消防车通道', value: false, checked: false },
          { label: '消防控制室', value: false, checked: false },
        ]
      },
      {
        label: '室内装修工程',
        value: false,
        checked: false,
        arr: [
          { label: '顶棚', value: false, checked: false },
          { label: '墙面', value: false, checked: false },
          { label: '地面', value: false, checked: false },
          { label: '隔断 ', value: false, checked: false },
          { label: '固定家具', value: false, checked: false },
          { label: '装饰织物', value: false, checked: false },
          { label: '其他装饰材料 ', value: false, checked: false },
        ]
      }
    ],

    fireControlLinkageEngineering: [
      {
        label: '室内消火栓',
        input: '',
        value: false,
        checked: false,
        arr: [
          {
            label: '管    网', value: '', checked: false, type: 'radio', list: [
              { label: '管网', value: '管网', checked: false },
              { label: '无管网', value: '无管网', checked: false },
            ]
          },
        ]
      },

      {
        label: '自动喷水灭火系统',
        input: '',
        value: false,
        checked: false,
        arr: [
          {
            label: '', value: '', checked: false, type: 'radio', list: [
              { label: '干式', value: '干式', checked: false },
              { label: '湿式', value: '湿式', checked: false },
              { label: '预作用', value: '预作用', checked: false },
              { label: '雨淋', value: '雨淋', checked: false },
              { label: '水幕', value: '水幕', checked: false },
              { label: '水雾', value: '水雾', checked: false },
            ]
          },
        ]
      },

      {
        label: '火灾自动报警系统',
        input: '',
        value: false,
        checked: false,
        arr: [
          {
            label: '', value: '', checked: false, type: 'radio', list: [
              { label: '区域报警', value: '区域报警', checked: false },
              { label: '集中报警', value: '集中报警', checked: false },
              { label: '控制中心报警', value: '控制中心报警', checked: false },
            ]
          },
        ]
      },

      {
        label: '气体灭火系统',
        input: '',
        value: false,
        checked: false,
        arr: [
          {
            label: '管    网', value: '', checked: false, type: 'radio', list: [
              { label: '管网', value: '管网', checked: false },
              { label: '无管网', value: '无管网', checked: false },
            ]
          },

          {
            label: '灭 火 剂', value: '', checked: false, type: 'radio', list: [
              { label: '洁净气体', value: '洁净气体', checked: false },
              { label: '哈龙', value: '哈龙', checked: false },
              { label: '其他', value: '其他', checked: false },
            ]
          },
        ]
      },

      {
        label: '泡沫灭火系统',
        input: '',
        value: false,
        checked: false,
        arr: [
          {
            label: '系统形式', value: '', checked: false, type: 'radio', list: [
              { label: '固定', value: '固定', checked: false },
              { label: '半固定', value: '半固定', checked: false },
              { label: '移动', value: '移动', checked: false },
            ]
          },

          {
            label: '泡沫类型', value: '', checked: false, type: 'radio', list: [
              { label: '高倍', value: '高倍', checked: false },
              { label: '中倍', value: '中倍', checked: false },
              { label: '低倍', value: '低倍', checked: false },
            ]
          },

          {
            label: '泡 沫 液', value: '', checked: false, type: 'radio', list: [
              { label: '抗溶性', value: '抗溶性', checked: false },
              { label: '氟蛋白', value: '氟蛋白', checked: false },
              { label: '清水', value: '清水', checked: false },
              { label: '其他', value: '其他', checked: false },
            ]
          },
        ]
      },

      {
        label: '防烟排烟系统',
        input: '',
        value: false,
        checked: false,
        arr: [
          {
            label: '', value: '', checked: false, type: 'radio', list: [
              { label: '机械排烟', value: '机械排烟', checked: false },
              { label: '正压送风', value: '正压送风', checked: false },
              { label: '自然排烟', value: '自然排烟', checked: false },
            ]
          },
        ]
      },

      {
        label: '灭火器',
        input: '楼梯间',
        value: false,
        checked: false,
        arr: [
          {
            label: '', value: '', checked: false, type: 'check', list: [
              { label: '干粉', value: false, checked: false },
              { label: '气体', value: false, checked: false },
              { label: '水系', value: false, checked: false },
              { label: '泡沫', value: false, checked: false },
              { label: '其他', value: false, checked: false },
            ]
          },
        ]
      },

      {
        label: '干粉灭火系统',
        input: '',
        value: false,
        checked: false,
        arr: []
      },

      {
        label: '其他',
        input: '',
        value: false,
        checked: false,
        arr: []
      },
    ],

    acceptanceOpinions: {
      constructionUnit: {
        officialSeal: '',
        autograph: ''
      },

      designUnit: {
        officialSeal: '',
        autograph: ''
      },

      contractingUnit: {
        officialSeal: '',
        autograph: ''
      },

      professionalContractors: {
        officialSeal: '',
        autograph: ''
      },

      engineeringSupervisionUnit: {
        officialSeal: '',
        autograph: ''
      },

      fireInspectionUnit: {
        officialSeal: '',
        autograph: ''
      },
      filingTime: '',

    }

  }

  //市县区
  position = OptionsEnum

  //结构类型
  typeSelect = ArchitectureTypeEnum

  flowFormDto = new FlowFormDto()

  //0是新增  1是查看  2是修改
  type

  flowFormQueryDto = new FlowFormQueryDto();

  constructor(private _ActivatedRoute: ActivatedRoute, private _applyService: ApplyServiceServiceProxy, private message: NzMessageService, public publicModel: PublicModel, ) {
    this.flowFormQueryDto.flowType = 3;
    this.type = this._ActivatedRoute.snapshot.paramMap.get('type');
    console.log(parseInt(this._ActivatedRoute.snapshot.paramMap.get('projectId')));
    this.flowFormQueryDto.projectId = this.flowFormDto.projectId = parseInt(this._ActivatedRoute.snapshot.paramMap.get('projectId'));
  }

  ngOnInit() {
    if (this.type != 1) {
      this.post_GetFlowFormData();
    }
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

  /**
   * 获取详情
   */
  post_GetFlowFormData() {
    this._applyService.post_GetFlowFormData(this.flowFormQueryDto).subscribe(data => {
      this.data = data;
    })
  }

  /**
  * 存草稿
  */
  depositDraft() {
    this.data.planEndTime = this.data.planEndTime == '' ? '' : timeTrans(Date.parse(this.data.planEndTime) / 1000, 'yyyy-MM-dd', '-')
    this.flowFormDto.formJson = JSON.stringify(this.data);
    this.flowFormDto.flowPathType = 3;
    if (!this.flowFormDto.projectId) delete this.flowFormDto.projectId
    console.log(this.flowFormDto)
    this._applyService.temporarySava(this.flowFormDto).subscribe(data => {
      this.flowFormDto.projectId = data;
      this.message.success('保存成功')
    })
  }

}
