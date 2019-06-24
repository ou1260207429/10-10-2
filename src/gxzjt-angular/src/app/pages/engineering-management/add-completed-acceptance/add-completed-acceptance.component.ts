import { PublicModel } from './../../../../infrastructure/public-model';
import { Component, OnInit } from '@angular/core';
// import { NzMessageService } from 'ng-zorro-antd';
import { timeTrans } from 'infrastructure/regular-expression';
import { ApplyServiceServiceProxy, FlowFormDto, FlowFormQueryDto, FlowDataDto, ProjectFlowDto, FlowNodeUser } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute } from '@angular/router';
import { FlowServices, GXZJT_From } from 'services/flow.services';
import { FormGroup } from '@angular/forms';
import { AppSessionService } from '@shared/session/app-session.service';

import { NzModalService } from 'ng-zorro-antd';
import { EventEmiter } from 'infrastructure/eventEmiter';

/**
 * 工程管理->竣工验收->新增申报
 */
@Component({
  selector: 'app-add-completed-acceptance',
  templateUrl: './add-completed-acceptance.component.html',
  styles: [
    `.select_row {
    display:flex;
    width:100%;
    justify-content: space-between;
    }
    .select_item {
      
      width:9%;
      
      }
      .select_item_label{
      
        width:100%;
        text-align:center;
        
        }
  `
  ]
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
            label: '水源', value: '', checked: false, type: 'radio', list: [
              { label: '市政管网', value: '市政管网', checked: false },
              { label: '消防水池', value: '消防水池', checked: false },
              { label: '天然水源', value: '天然水源', checked: false },
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
            label: '', value: '', checked: false, type: 'check', list: [
              { label: '干式', value: false, checked: false },
              { label: '湿式', value: false, checked: false },
              { label: '预作用', value: false, checked: false },
              { label: '雨淋', value: false, checked: false },
              { label: '水幕', value: false, checked: false },
              { label: '水雾', value: false, checked: false },
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
            label: '', value: '', checked: false, type: 'check', list: [
              { label: '区域报警', value: false, checked: false },
              { label: '集中报警', value: false, checked: false },
              { label: '控制中心报警', value: false, checked: false },
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
            label: '管    网', value: '', checked: false, type: 'check', list: [
              { label: '管网', value: false, checked: false },
              { label: '无管网', value: false, checked: false },
            ]
          },

          {
            label: '灭 火 剂', value: '', checked: false, type: 'check', list: [
              { label: '洁净气体', value: false, checked: false },
              { label: '哈龙', value: false, checked: false },
              { label: '其他', value: false, checked: false },
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
        autograph: '',
        opinion: '本工程所提交的材料真实、准确、齐全，基本按照消防设计文件实施，符合国家工程建设消防技术标准，本工程消防验收合格。',
      },

      designUnit: {
        officialSeal: '',
        autograph: '',
        opinion: '本工程消防设计符合国家工程建设消防技术标准，基本按照消防设计文件施工，本工程消防验收合格。',
      },

      contractingUnit: {
        officialSeal: '',
        autograph: '',
        opinion: '本工程消防设计符合国家工程建设消防技术标准，基本按照消防设计文件施工，本工程消防验收合格。',
      },

      professionalContractors: {
        officialSeal: '',
        autograph: '',
        opinion: '本工程消防设计符合国家工程建设消防技术标准，基本按照消防设计文件施工，本工程消防验收合格。',
      },

      engineeringSupervisionUnit: {
        officialSeal: '',
        autograph: '',
        opinion: '本工程安装使用的消防产品和有防火性能要求的建筑构件、建筑材料、消防施工安装等均按照消防设计文件的要求进行施工。',
      },

      fireInspectionUnit: {
        officialSeal: '',
        autograph: '',
        opinion: '经对建筑类别、总平面布局和平面布置，防火防烟分隔，安全疏散，消防水源，水灭火系统，火灾自动报警系统，防烟排烟系统，建筑灭火器（防爆设施）等单项进行外观质量检查、现场测量核查、消防设施功能测试和消防产品现场判定，我单位认为该工程基本符合国家有关消防技术标准的要求。',
      },
      catalog: {
        opinion: '1、消防产品质量合格证明文件；2、有防火性能要求的建筑构件、建筑材料、室内装修装饰材料符合国家标准或者行业标准的证明文件、出厂合格证；3、消防设施、电气防火技术检测合格证明文件；4、施工、工程监理、检测单位的合法身份证明和资质等级证明文件。'

        ,

      },
      filingTime: '',
      luckNo: '',
    },
    engineerinDescription: '',
    fileList: [
      {
        //设工程消防验收申报表（纸质申报表的图片）
        type: 0,
        array: [

        ]
      },
      {
        //与消防验收有关的竣工图纸及隐蔽工程记录
        type: 1,
        array: [

        ]
      },
      {
        //符合要求的检测机构出具出具的消防设施及系统检测合格证明文件
        type: 2,
        array: [

        ]
      },
    ]

  }


  flowFormDto = new FlowFormDto()

  //0是新增  1是查看  2是修改
  type

  flowFormQueryDto = new FlowFormQueryDto();
  //子组件的表单对象
  form: FormGroup

  butNzLoading: boolean = false;
  constructor(private _appSessionService: AppSessionService,
    private _flowServices: FlowServices,
    private _eventEmiter: EventEmiter,
    private _ActivatedRoute: ActivatedRoute,
    private _applyService: ApplyServiceServiceProxy,
    // private message: NzMessageService,
    public publicModel: PublicModel,
    private _NzModalService: NzModalService) {
    this.flowFormQueryDto.flowType = 3;
    this.type = this._ActivatedRoute.snapshot.paramMap.get('type');
    this.flowFormQueryDto.projectId = this.flowFormDto.projectId = parseInt(this._ActivatedRoute.snapshot.paramMap.get('projectId'));
  }

  ngOnInit() {
    if (this.type != 0) {
      this.post_GetFlowFormData();
    }
    this.initSelectModalData();
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
    this.butNzLoading = true;
    this.data.planEndTime = this.data.planEndTime == '' ? '' : timeTrans(Date.parse(this.data.planEndTime) / 1000, 'yyyy-MM-dd HH:mm:ss', '-')

    this.data.acceptanceOpinions.filingTime = this.data.acceptanceOpinions.filingTime == '' ? '' : timeTrans(Date.parse(this.data.acceptanceOpinions.filingTime) / 1000, 'yyyy-MM-dd HH:mm:ss', '-')
    this.flowFormDto.formJson = JSON.stringify(this.data);
    this.flowFormDto['flowPathType'] = 3;
    this.flowFormDto.projectTypeStatu = 2;
    this._applyService.temporarySava(this.flowFormDto).subscribe(data => {
      this.butNzLoading = false;
      this._eventEmiter.emit('draftsComponentInit', []); 
      this.flowFormDto.projectId = data;
      this._NzModalService.success({
        nzTitle: '操作提示',
        nzContent: '保存成功'
      }
      );
      history.go(-1)
    }, error => {
      this.butNzLoading = false;
    })
  }
  save() {

    console.log(this.form.valid)
    const from: GXZJT_From = {
      frow_TemplateInfo_Data: {
        Area: this.data.engineeringCitycountyAndDistrict[this.data.engineeringCitycountyAndDistrict.length - 1],
      },
      identify: 'xfsj',
      editWorkFlow_NodeAuditorRecordDto: {
        applyEID: this._appSessionService.user.id,
        applyEName: this._appSessionService.user.eName,
        deptId: this._appSessionService.user.organizationsId,
        deptFullPath: this._appSessionService.user.organizationsName,
      }
    };

    this.butNzLoading = true;
    this._flowServices.GXZJT_StartWorkFlowInstanceAsync(from).subscribe((data: any) => {

      const flowDataDto = new FlowDataDto();
      flowDataDto.formJson = JSON.stringify(this.data);
      flowDataDto.projectFlowInfo = new ProjectFlowDto();


      flowDataDto.projectFlowInfo.timeLimit = data.result.timeLimit
      //类型  消防设计1   消防验收2   消防竣工3 
      flowDataDto.projectFlowInfo.flowPathType = 3

      flowDataDto.projectFlowInfo.flowNo = data.result.workFlow_Instance_Id

      flowDataDto.projectFlowInfo.currentNodeId = data.result.cur_Node_Id
      flowDataDto.projectFlowInfo.currentNodeName = data.result.cur_NodeName

      flowDataDto.projectFlowInfo.workFlow_Instance_Id = data.result.workFlow_Instance_Id
      flowDataDto.projectFlowInfo.workFlow_TemplateInfo_Id = data.result.workFlow_TemplateInfo_Id

      // flowDataDto.luckNo = this.data.luckNo;
      flowDataDto.luckNo = this.selectModalValue;
      flowDataDto.handleUserList = [];
      data.result.auditorRecords.forEach(element => {
        const flowNodeUser = new FlowNodeUser()
        flowNodeUser.userFlowId = element.id
        flowNodeUser.userName = element.applyEName
        flowNodeUser.userCode = element.applyEID
        flowDataDto.handleUserList.push(flowNodeUser)
      });

      //待审人数组 等后台改模型
      // currentHandleUserName: string | undefined;

      //待审人数组 等后台改模型
      // currentHandleUserCode: string | undefined; 

      console.log(flowDataDto)

      this.isSelectModalOkLoading = true;
      this._applyService.post_PutOnRecord(flowDataDto).subscribe(data => {
        this.butNzLoading = false;
        this._eventEmiter.emit('completedAcceptanceComponentInit', []);
        if (data == true) {
          this._NzModalService.success({
            nzTitle: '抽选结果',
            nzContent: this.data.projectName + '，已经被抽中'

          }
          );
        } else {
          this._NzModalService.info({
            nzTitle: '抽选结果',
            nzContent: this.data.projectName + '，没有被抽中'

          }
          );
        }

        this.isSelectModalOkLoading = false;
        this.isVisibleSelectModal = false;
        this.butNzLoading = false;
        history.go(-1)
      }, err => {
        this.butNzLoading = false;
        this.isSelectModalOkLoading = false;
        this.isVisibleSelectModal = false;
        this._NzModalService.error({
          nzTitle: '操作失败',
          nzContent: this.data.projectName + '，提交出错'

        }
        );
      })
    })
  }

  /**
     * 获取子组件发送的数据
     */
  outer(e) {
    this.form = e;
  }


  //抽选按钮弹框

  isVisibleSelectModal = false;
  isSelectModalOkLoading = false;

  handleSelectModalCancel() {
    this.isVisibleSelectModal = false;
  }

  showSelectModal() {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.valid) {
      this.isVisibleSelectModal = true;
    }
  }




  selectModalData = [];
  selectModalValue = 1;
  initSelectModalData() {
    this.selectModalData = [];
    for (var i = 0; i < 10; ++i) {
      var row = [];
      for (var j = 1; j <= 10; ++j) {
        row.push(i * 10 + j);
      }
      this.selectModalData.push(row);
    }

  }

  handleSelectModalOk() {
    this.save();
    // console.log(this.selectModalValue);
  }



}
