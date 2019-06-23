import { Component, OnInit } from '@angular/core';
import { objDeleteType, timeTrans } from 'infrastructure/regular-expression';
import { NzMessageService } from 'ng-zorro-antd';
import { OptionsEnum, ArchitectureTypeEnum } from 'infrastructure/expression';
import { PublicModel } from 'infrastructure/public-model';
import { ApplyServiceServiceProxy, FlowFormDto, FlowFormQueryDto, FlowDataDto, ProjectFlowDto, FlowNodeUser } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute } from '@angular/router';
import { GXZJT_From, FlowServices } from 'services/flow.services';
import { FormGroup } from '@angular/forms';
import { AppSessionService } from '@shared/session/app-session.service';

/**
 * 工程管理->消防验收->新增申报
 */
@Component({
  selector: 'app-add-fire-acceptance',
  templateUrl: './add-fire-acceptance.component.html',
  styles: []
})
export class AddFireAcceptanceComponent implements OnInit {
  showError = {
    projectCategoryId: false,
  }
  data: any = {
    jsconstructionUnit: '',
    legalRepresentative: '',
    legalRepresentativeNo: '',
    projectName: '',
    contacts: '',
    contactsNumber: '',
    engineeringCitycountyAndDistrict: '',
    engineeringAddress: '',
    useNature: '',
    projectCategoryId: '',
    symbol: '',
    dateOfReview: '',
    constructionPermitNumber: '',
    testReportNumber: '',
    design: [{
      designUnit: '',
      qualificationLevel: '',
      legalRepresentative: '',
      contacts: '',
      contactsNumber: ''
    }],
    constructionUnit: [
      {
        designUnit: '',
        qualificationLevel: '',
        legalRepresentative: '',
        contacts: '',
        contactsNumber: ''
      }
    ],
    constructionControlUnit: {
      designUnit: '',
      qualificationLevel: '',
      legalRepresentative: '',
      contacts: '',
      contactsNumber: ''
    },

    detectionUnit: {
      designUnit: '',
      qualificationLevel: '',
      legalRepresentative: '',
      contacts: '',
      contactsNumber: '',
      no: ''
    },
    basicInformation: [
      {
        name: '',
        type: '',
        grade: '',
        aboveGround: '',
        underground: '',
        height: '',
        builtUpArea: '',
        areaCovered: '',
        jzmjaboveGround: '',
        jzmjunderground: '',
      }
    ],
    storageTank: [
      {
        position: '',
        totalCapacity: '',
        setupType: '',
        storageForm: '',
        name: '',
      }
    ],
    yard: [
      { reserves: '', name: '' }
    ],
    buildingThermalInsulation: {
      type: '',
      layerNumber: '',
      useNature: '',
      originallyUsed: '',
    },
    decorationProject: {
      decorationSite: [
        { label: '顶棚', value: false, checked: true },
        { label: '墙面', value: false, checked: false },
        { label: '地面', value: false, checked: false },
        { label: '隔断', value: false, checked: false },
        { label: '固定家具', value: false, checked: false },
        { label: '装饰织物', value: false, checked: false },
        { label: '其他', value: false, checked: false },
      ],
      decorationArea: '',
      decorationFloorNumber: '',
      useNature: '',
      originallyUsed: '',
    },
    implementation: {
      designUnit: '',
      personInChargeName: '',
      opinion: '本工程能按照经审查合格的消防设计文件施工，施工质量满足消防设计和国家工程建设消防技术标准要求 。'
    },
    constructionSituation: {
      contractingUnit: '',
      projectManagerName: '',
      subcontractors: '',
      personInChargeName: '',
      opinion: '按照经审查合格的消防设计文件实施，符合国家工程建设消防技术标准。'
    },
    supervision: {
      constructionControlUnit: '',
      signatureOfChiefEngineer: '',
      opinion: '该工程安装使用的消防产品和有防火性能要求的建筑构件、建筑材料、消防施工安装、隐蔽工程均按照经审查合格的消防设计文件的要求进行施工 。 '
    },
    detection: {
      detectionUnit: '',
      personInChargeName: '',
      opinion: '经对建筑类别、总平面布局和平面布置，防火防烟分隔，安全疏散，消防水源，水灭火系统，火灾自动报警系统，防烟排烟系统，建筑灭火器（防爆设施）等单项进行外观质量检查、现场测量核查、消防设施功能测试和消防产品现场判定，我单位认为该工程基本符合国家有关消防技术标准的要求'
    },
    acceptance: {
      completionTime: '',
      constructionUnit: '',
      personInChargeName: '',
      opinion: '竣工验收情况我单位于XXXX年XX月XX日组织设计、施工、监理、检测等单位有关工程技术人员对该工程进行消防验收，对建筑消防设施功能进行检测，综合评定消防验收合格 。'
    },
    remarks: '',
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

  //0是新增  1是查看  2是修改
  type



  flowFormQueryDto = new FlowFormQueryDto();
  flowFormDto = new FlowFormDto();

  //子组件的表单对象
  form: FormGroup

  //使用性质
  useNatureSelect
  constructor(private _appSessionService: AppSessionService, private _flowServices: FlowServices, private _applyService: ApplyServiceServiceProxy, public publicModel: PublicModel, private _ActivatedRoute: ActivatedRoute, private message: NzMessageService, ) {
    this.flowFormQueryDto.flowType = 2;
    this.type = this._ActivatedRoute.snapshot.paramMap.get('type');
    this.flowFormQueryDto.projectId = this.flowFormDto.projectId = parseInt(this._ActivatedRoute.snapshot.paramMap.get('projectId'));
  }
  ngOnInit() {
    //
    this.post_GetFlowFormData();
    // }
  }


  /**
   * 获取特殊工程列表
   */
  post_GetFlowFormData() {
    this._applyService.post_GetFlowFormData(this.flowFormQueryDto).subscribe(data => {
      if (this.type != 0) {
        this.data = JSON.parse(data.formJson);
      }
      this.useNatureSelect = data.natures
      console.log(this.useNatureSelect)
    })
  }

  /**
   * 存草稿
   */
  depositDraft() {
    this.flowFormDto.formJson = JSON.stringify(this.data);
    this.flowFormDto['flowPathType'] = 2;
    this.flowFormDto.projectTypeStatu = 1;
    this.data.dateOfReview = this.data.dateOfReview == '' ? '' : timeTrans(Date.parse(this.data.dateOfReview) / 1000, 'yyyy-MM-dd HH:mm:ss', '-')
    this._applyService.temporarySava(this.flowFormDto).subscribe(data => {
      this.flowFormDto.projectId = data;
      this.message.success('保存成功')
      history.go(-1)
    })
  }
  save() {
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
    this._flowServices.GXZJT_StartWorkFlowInstanceAsync(from).subscribe((data: any) => {
      console.log(this.form)
      // for (const i in this.form.controls) {
      //   this.form.controls[i].markAsDirty();
      //   this.form.controls[i].updateValueAndValidity();
      // }

      // if (!this.data.projectCategoryId || this.data.projectCategoryId == '') {
      //   this.showError.projectCategoryId = true;
      // } else {
      //   this.showError.projectCategoryId = false;
      // }

      // if (!this.showError.projectCategoryId && this.form.valid) {

      const from: GXZJT_From = {
        frow_TemplateInfo_Data: {
          Area: this.data.engineeringCitycountyAndDistrict[this.data.engineeringCitycountyAndDistrict.length - 1]
        },
        identify: 'xfsj',
        editWorkFlow_NodeAuditorRecordDto: {
          applyEID: this._appSessionService.user.id,
          applyEName: this._appSessionService.user.eName,
          deptId: this._appSessionService.user.organizationsId,
          deptFullPath: this._appSessionService.user.organizationsName,
        }
      };
      this._flowServices.GXZJT_StartWorkFlowInstanceAsync(from).subscribe((data: any) => {

        const flowDataDto = new FlowDataDto();
        flowDataDto.formJson = JSON.stringify(this.data);
        flowDataDto.projectFlowInfo = new ProjectFlowDto();


        flowDataDto.projectFlowInfo.timeLimit = data.result.timeLimit
        //类型  消防设计1   消防验收2   消防竣工3 
        flowDataDto.projectFlowInfo.flowPathType = 2

        flowDataDto.projectFlowInfo.flowNo = data.result.workFlow_Instance_Id

        flowDataDto.projectFlowInfo.currentNodeId = data.result.cur_Node_Id
        flowDataDto.projectFlowInfo.currentNodeName = data.result.cur_NodeName

        flowDataDto.projectFlowInfo.workFlow_Instance_Id = data.result.workFlow_Instance_Id
        flowDataDto.projectFlowInfo.workFlow_TemplateInfo_Id = data.result.workFlow_TemplateInfo_Id

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

        this._applyService.acceptance(flowDataDto).subscribe(data => {
          this.message.success('提交成功')
          history.go(-1)
        })
      })
      // }
    })
  }

}

