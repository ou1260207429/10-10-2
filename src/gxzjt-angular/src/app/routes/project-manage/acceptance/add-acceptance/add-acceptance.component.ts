import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAddDeisnRepData } from '../../public/add-design-data';
import { getArea } from '../../public/area-json';
import { getForsItemFormStatus, resetFormControlStatus, addEmptyElement, removeListElement } from '../../public/project-util';
import { ProjectManageService } from '../../project-manage.service'
import { NzMessageService, UploadXHRArgs, UploadFile } from 'ng-zorro-antd';
import { objDeleteType, genID, createguid, classTreeChildrenArray, checkArrayString, newClassTreeChildrenArray, updateEngineeringNo } from 'infrastructure/regular-expression';
import { ArchitectureTypeEnum, OptionsEnum, RefractoryEnum, AppId, zzdjEnum4, zzdjEnum3, zzdjEnum2, zzdjEnum1, zzdjEnum } from 'infrastructure/expression';
import { PublicServices } from 'services/public.services';
@Component({
  selector: 'app-project-manage-add-acceptance',
  templateUrl: './add-acceptance.component.html',
  styleUrls: ['../../public/public.less', './add-acceptance.component.less'],
  // styleUrls: ['../../public/public.less'],
})
export class ProjectManageAddAcceptanceComponent implements OnInit {

  noValidateForm = { standalone: true };//不校验数据需要加

  @ViewChild('validateForm') validateForm: FormGroup;

  areaData: any;
  // @Input() data: any;
  // validateForm: FormGroup;

  // get jsconstructionUnit(): any { return this.validateForm.get('jsconstructionUnit'); }


  postData: any;//提交数据

  fileList;//

  useNatureSelect: any;//获取使用性质数组

  //获取使用性质
  getfolwmodel = {
    flowId: null,
    flowType: 2,
    projectId: null,
  }
  //存放使用性质对象数组
  usetyle = [];

  engineeringList: any;//使用单位
  @Input() data: any;
  //判断上传的焦点
  uploadIndex: number = -1;


  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private fb: FormBuilder,
    private ProjectManageService: ProjectManageService,
    public _publicServices: PublicServices,
    private message: NzMessageService, ) { }

  ngOnInit() {
    this.postData = getAddDeisnRepData();
    this.areaData = getArea();
    this.getPost_GetFlowFormData();

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

  getPost_GetFlowFormData() {

    this.ProjectManageService.GetPost_GetFlowFormDataList(this.getfolwmodel).subscribe(
      res => {
        // this.message.success(res.message);
        // this.refresh();
        if (res.result.natures.length != 0) {
          this.usetyle = res.result.natures;

        }

      },
    );


  }

  addElement(list) {
    addEmptyElement(list);
  }
  delElement(list, i) {
    removeListElement(list, i);
  }
  handleChange(index) {
    this.uploadIndex = index
  }
  customReq = (item: UploadXHRArgs) => {

    var filePost = item.file as any;
    let params = {
      sourceId: createguid(),
      AppId: AppId,
      module: "table",
    };
  }
  removeFile = (file: UploadFile): boolean => {
    let params = {
      id: file.uid,
      AppId: AppId,
    };
    this._publicServices.delete(params).subscribe(data => {
      this.message.success(data.message)
    }, err => {
      this.message.error(err.message)
    });
    return true;
  }

}
