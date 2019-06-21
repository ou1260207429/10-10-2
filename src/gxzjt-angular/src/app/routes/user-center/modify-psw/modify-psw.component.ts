import { Component, OnInit } from '@angular/core';


import { FormBuilder, Validators, FormControl,FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd';
import { REGISTER_URL } from 'infrastructure/expression';
import { TokenService } from 'abp-ng2-module/dist/src/auth/token.service';

@Component({
  selector: 'app-user-center-modify-psw',
  templateUrl: './modify-psw.component.html',
  styleUrls: ['./modify-psw.component.less']
})
export class UserCenterModifyPswComponent implements OnInit {

  validateForm: FormGroup;



  oldPassword = "";
  newPassword = "";
  confirmPassword = "";
  modifying = false;
  constructor(
    private _tokenService: TokenService,
    private modalService: NzModalService,
    public http: HttpClient,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]],

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
    this.modifying = true;
    let url = REGISTER_URL + "api/User/LoginUserChangePassword";

    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this._tokenService.getToken()
      })
    };


    var param = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    }

    this.http.post(url, param, httpOptions).subscribe((res: any) => {

      // console.log(res);
      if (res) {
        if (res.result == 0) {
          this.modalService.info({
            nzTitle: '提示',
            nzContent: "修改成功",
          });
          this.validateForm.reset();

        } else {
          this.showErr(res.message);
        }
      }
      this.modifying = false;
    }, err => {
      this.showErr(err);
      this.modifying = false;
    });
  }

  showErr(msg) {
    this.modalService.error({
      nzTitle: '出错啦',
      nzContent: msg,
    });
  }
}
