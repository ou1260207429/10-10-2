import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

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


    projectCategoryId: '',
    design: {
      designUnit: '',
      qualificationLevel: '',
      legalRepresentative: '',
      contacts: '',
      contactsNumber: ''
    },
    constructionControlUnit: {
      designUnit: '',
      qualificationLevel: '',
      legalRepresentative: '',
      contacts: '',
      contactsNumber: ''
    },
    mappingUnit: {
      designUnit: '',
      qualificationLevel: '',
      legalRepresentative: '',
      contacts: '',
      contactsNumber: '',
      no: ''
    },



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
    fireFightingFacilities: [
      { label: '室内消火栓系统', value: false, checked: false },
      { label: '室外消火栓系统', value: false, checked: false },
      { label: '火灾自动报警系统', value: false, checked: false },
      { label: '自动喷水灭火系统', value: false, checked: false },
      { label: '气体灭火系统', value: false, checked: false },
      { label: '泡沫灭火系统', value: false, checked: false },
      { label: '其他灭火系统', value: false, checked: false },
      { label: '疏散指示标志', value: false, checked: false },
      { label: '消防应急照明', value: false, checked: false },
      { label: '防烟排烟系统', value: false, checked: false },
      { label: '消防电梯', value: false, checked: false },
      { label: '灭火器', value: false, checked: false },
      { label: '其他', value: false, checked: false },
    ],

    //同时提供的材料
    simultaneousMaterials: {
      a1Checkbox: '',
      a1Input: '',
      a2Checkbox: '',
      a2Input: '',
      a3Checkbox: '',
      a4Checkbox: '',
      a5Checkbox: '',
    },
    corporateOpinion: {
      seal: '',
      name: '',
    }
  }

  constructor(private message: NzMessageService, ) { }

  ngOnInit() {
  }

  addJArray(arr) {
    arr.push({
      name: '',
      type: '',
      grade: '',
      height: '',
      builtUpArea: '',
      fireHazard: '',
    })
  }

  addStorageTankArray(arr) {
    arr.push({
      position: '',
      settingForm: '',
      type: '',
      materialQuality: '',
      pressure: '',
      temperature: '',
      form: '',
    })
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
