import { Component, OnInit } from '@angular/core';
import { objDeleteType } from 'infrastructure/regular-expression';
import { NzMessageService } from 'ng-zorro-antd';
import { OptionsEnum, ArchitectureTypeEnum } from 'infrastructure/expression';
import { PublicModel } from 'infrastructure/public-model';
import { ApplyServiceServiceProxy, FlowFormDto, FlowFormQueryDto } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute } from '@angular/router';

/**
 * 工程管理->消防验收->新增申报
 */
@Component({
  selector: 'app-add-fire-acceptance',
  templateUrl: './add-fire-acceptance.component.html',
  styles: []
})
export class AddFireAcceptanceComponent implements OnInit {
  dateOfReview: any;
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
    design: {
      designUnit: '',
      qualificationLevel: '',
      legalRepresentative: '',
      contacts: '',
      contactsNumber: ''
    },
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
    },
    constructionSituation: {
      contractingUnit: '',
      projectManagerName: '',
      subcontractors: '',
      personInChargeName: '',
    },
    supervision: {
      constructionControlUnit: '',
      signatureOfChiefEngineer: '',
    },
    detection: {
      detectionUnit: '',
      personInChargeName: '',
    },
    acceptance: {
      completionTime: '',
      constructionUnit: '',
      personInChargeName: '',
    },
    remarks: ''

  }

  //0是新增  1是查看  2是修改
  type

  //市县区
  position = OptionsEnum

  //结构类型
  typeSelect = ArchitectureTypeEnum

  flowFormQueryDto = new FlowFormQueryDto();
  flowFormDto = new FlowFormDto();
  constructor(private _applyService: ApplyServiceServiceProxy, public publicModel: PublicModel, private _ActivatedRoute: ActivatedRoute, private message: NzMessageService, ) {
    this.flowFormQueryDto.flowType = 2;
    this.type = this._ActivatedRoute.snapshot.paramMap.get('type');
    this.flowFormQueryDto.projectId = this.flowFormDto.projectId = parseInt(this._ActivatedRoute.snapshot.paramMap.get('projectId'));
  }
  ngOnInit() {
    if (this.type != 0) {
      this.post_GetFlowFormData();
    }
  }

  /**
   * 获取特殊工程列表
   */
  post_GetFlowFormData() {
    this.data = '';
    this._applyService.post_GetFlowFormData(this.flowFormQueryDto).subscribe(data => {
      this.data = JSON.parse(data.formJson);
      console.log(data)
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

  /**
   * 存草稿
   */
  depositDraft() {
    this.flowFormDto.formJson = JSON.stringify(this.data);
    this.flowFormDto['flowPathType'] = 2;
    this.flowFormDto.projectTypeStatu = 1;
    this._applyService.temporarySava(this.flowFormDto).subscribe(data => {
      this.flowFormDto.projectId = data;
      this.message.success('保存成功')
    })
  }
  save() { }
}
