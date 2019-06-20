import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';


import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';

@Component({
  selector: 'app-user-center-modify-psw',
  templateUrl: './modify-psw.component.html',
  styleUrls: ['./modify-psw.component.less']
})
export class UserCenterModifyPswComponent implements OnInit {
  
  validateForm: any;



  oldPassword = "";
  newPassword = "";
  confirmPassword = "";
  modifying = false;
  constructor(private http: _HttpClient,
    private modal: ModalHelper,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]]
    });

  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.newPassword.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  modify() {

  }
}
