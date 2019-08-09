import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAddDeisnRepData } from '../../public/add-design-data';
import { getArea } from '../../public/area-json';
import {
  getForsItemFormStatus,
  resetFormControlStatus,
  addEmptyElement,
  removeListElement
} from '../../public/project-util';


@Component({
  selector: 'app-project-manage-add-design',
  templateUrl: './add-design.component.html',
  styleUrls: ['../../public/public.less'],
})
export class ProjectManageAddDesignComponent implements OnInit, AfterViewInit {

  noValidateForm = { standalone: true };//不校验数据需要加

  @ViewChild('validateForm') validateForm: FormGroup;

  areaData: any;
  // validateForm: FormGroup;

  // get jsconstructionUnit(): any { return this.validateForm.get('jsconstructionUnit'); }


  postData: any;//提交数据


  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.postData = getAddDeisnRepData();

    this.areaData = getArea();

    resetFormControlStatus(this.validateForm.controls);

  }

  add() {

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }

  onChangeCitycountyAndDistrict(e) {
  }
  onSelectOrgItem(a, b) { }




  checkFormForsItemData(form: any, controlName: String, index) {
    return getForsItemFormStatus(form, controlName, index);
  }



  addElement(list) {
    addEmptyElement(list);
  }

  delElement(list, i) {
    removeListElement(list, i);
  }




  onCheckDecorationSite(value: string[]): void {//装修部位勾选监听	

  }


  onCheckFireFightingFacilities(value: string[]) {//消防设施勾选监听

  }


}
