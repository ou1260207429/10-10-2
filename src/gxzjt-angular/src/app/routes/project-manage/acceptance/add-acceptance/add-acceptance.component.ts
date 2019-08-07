import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAddDeisnRepData } from '../../public/add-design-data';
import { getArea } from '../../public/area-json';
import { getForsItemFormStatus, resetFormControlStatus } from '../../public/project-util';

@Component({
  selector: 'app-project-manage-add-acceptance',
  templateUrl: './add-acceptance.component.html',
  styleUrls:['../../public/public.less','./add-acceptance.component.less'],
  // styleUrls: ['../../public/public.less'],
})
export class ProjectManageAddAcceptanceComponent implements OnInit {

  noValidateForm = { standalone: true };//不校验数据需要加

  @ViewChild('validateForm') validateForm: FormGroup;

  areaData: any;
  // validateForm: FormGroup;

  // get jsconstructionUnit(): any { return this.validateForm.get('jsconstructionUnit'); }


  postData: any;//提交数据

  useNatureSelect: any;//获取使用性质数组




  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.postData = getAddDeisnRepData();

    this.useNatureSelect=this.postData.specialEngineering;
    debugger

    this.areaData = getArea();

    resetFormControlStatus(this.validateForm);
    // this.validateForm = this.fb.group({
    //   jsconstructionUnit: [null, [Validators.required]],//建设单位
    //   legalRepresentative: [null, [Validators.required]],//法定代表人/主要负责人
    //   legalRepresentativeNo: [null, [Validators.required]],//法定代表人/主要负责人 联系电话
    //   projectName: [null, [Validators.required]],//工程名称
    //   contacts: [null, [Validators.required]],//联系人
    //   contactsNumber: [null, [Validators.required]],//联系电话
    //   engineeringCitycountyAndDistrict: [null, [Validators.required]],
    //   engineeringId: [null, [Validators.required]],
    //   engineeringNo: [null, [Validators.required]],
    //   engineeringAddress: [null, [Validators.required]],
    //   // planStartTime: [null, [Validators.required]],
    //   // planEndTime: [null, [Validators.required]],
    // });
  }

  add() {

  }

  onChangeCitycountyAndDistrict(e) {
  }
  onSelectOrgItem(a, b) { }




  checkFormForsItemData(form: any, controlName: String, index) {
    return getForsItemFormStatus(form, controlName, index);
  }

}
