import { PublicModel } from './../../../../infrastructure/public-model';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { timeTrans } from 'infrastructure/regular-expression';
import { ApplyServiceServiceProxy, FlowFormDto, FlowFormQueryDto } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute } from '@angular/router';
import { FlowServices, GXZJT_From } from 'services/flow.services';
import { FormGroup } from '@angular/forms';
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
    engineeringCitycountyAndDistrict: '',
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
        name: '',
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


  flowFormDto = new FlowFormDto()

  //0是新增  1是查看  2是修改
  type

  flowFormQueryDto = new FlowFormQueryDto();
  //子组件的表单对象
  form: FormGroup
  constructor(private _flowServices: FlowServices, private _ActivatedRoute: ActivatedRoute, private _applyService: ApplyServiceServiceProxy, private message: NzMessageService, public publicModel: PublicModel, ) {
    this.flowFormQueryDto.flowType = 3;
    this.type = this._ActivatedRoute.snapshot.paramMap.get('type');
    this.flowFormQueryDto.projectId = this.flowFormDto.projectId = parseInt(this._ActivatedRoute.snapshot.paramMap.get('projectId'));
  }

  ngOnInit() {
    if (this.type != 0) {
      this.post_GetFlowFormData();
    }
  }


  /**
   * 获取详情
   */
  post_GetFlowFormData() {
    this.data = '';
    this._applyService.post_GetFlowFormData(this.flowFormQueryDto).subscribe(data => {
      this.data = JSON.parse(data.formJson);
      console.log(this.data)
    })
  }

  /**
  * 存草稿
  */
  depositDraft() {
    this.data.planEndTime = this.data.planEndTime == '' ? '' : timeTrans(Date.parse(this.data.planEndTime) / 1000, 'yyyy-MM-dd', '-')
    this.flowFormDto.formJson = JSON.stringify(this.data);
    this.flowFormDto['flowPathType'] = 3;
    this.flowFormDto.projectTypeStatu = 2;

    console.log(this.data);
    this._applyService.temporarySava(this.flowFormDto).subscribe(data => {
      this.flowFormDto.projectId = data;
      this.message.success('保存成功')
      history.go(-1)
    })
  }
  save() {
    const from: GXZJT_From = {
      frow_TemplateInfo_Data: this.data,
      identify: 'jgys',
      editWorkFlow_NodeAuditorRecordDto: {
        applyEID: '10001',
        applyEName: '测试人员',
        deptId: 1,
        deptFullPath: '测试部门',
      }
    };
    this._flowServices.GXZJT_StartWorkFlowInstanceAsync(from).subscribe(data => {
      this.message.success('提交成功')
      history.go(-1)
    })
  }

  /**
     * 获取子组件发送的数据
     */
  outer(e) {
    this.form = e;
  }
}
