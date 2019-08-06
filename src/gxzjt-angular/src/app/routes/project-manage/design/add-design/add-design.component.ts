import { Component, OnInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAddDeisnRepData } from '../../public/add-design-data';
@Component({
  selector: 'app-project-manage-add-design',
  templateUrl: './add-design.component.html',
  styleUrls: ['../../public/public.less'],
})
export class ProjectManageAddDesignComponent implements OnInit {

  validateForm: FormGroup;

  postData = getAddDeisnRepData();//提交数据


  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      jsconstructionUnit: [null, [Validators.required]],//建设单位
      legalRepresentative: [null, [Validators.required]],//法定代表人/主要负责人
      legalRepresentativeNo: [null, [Validators.required]],//法定代表人/主要负责人 联系电话
      projectName: [null, [Validators.required]],//工程名称
      contacts: [null, [Validators.required]],//联系人
      contactsNumber: [null, [Validators.required]],//联系电话
      engineeringCitycountyAndDistrict: [null, [Validators.required]],
      engineeringId: [null, [Validators.required]],
      engineeringNo: [null, [Validators.required]],
      engineeringAddress: [null, [Validators.required]],
      planStartTime: [null, [Validators.required]],
      planEndTime: [null, [Validators.required]],
    });
  }

  add() {

  }

}
