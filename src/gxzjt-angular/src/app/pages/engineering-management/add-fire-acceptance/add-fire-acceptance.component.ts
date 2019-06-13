import { Component, OnInit } from '@angular/core';
import { objDeleteType } from 'infrastructure/regular-expression';
import { NzMessageService } from 'ng-zorro-antd';

/**
 * 工程管理->消防验收->新增申报
 */
@Component({
  selector: 'app-add-fire-acceptance',
  templateUrl: './add-fire-acceptance.component.html',
  styles: []
})
export class AddFireAcceptanceComponent implements OnInit {

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

  constructor(private message: NzMessageService, ) { }

  ngOnInit() {
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
    if (index == 0) {
      this.message.error('不允许删除完，必须保留一个')
      return false
    }
    arr.splice(index, 1)
  }

}
