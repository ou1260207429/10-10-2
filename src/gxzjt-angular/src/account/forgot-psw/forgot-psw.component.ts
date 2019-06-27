import { finalize } from 'rxjs/operators';
import {
  Component,
  Injector,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { REGISTER_URL } from 'infrastructure/expression';
import {
  AccountServiceProxy,
  RegisterInput,
  RegisterOutput,
} from '@shared/service-proxies/service-proxies';


import { appModuleAnimation } from '@shared/animations/routerTransition';

import { AppComponentBase } from '@shared/component-base/app-component-base';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  templateUrl: './forgot-psw.component.html',
  styleUrls: ['./forgot-psw.component.less'],
  animations: [appModuleAnimation()],
})
export class ForgotPswComponent extends AppComponentBase implements OnInit {


  model: any;
  captcha: {};
  count = 0;
  isSetCaptcha = false;
  constructor(
    injector: Injector,
    private _accountService: AccountServiceProxy,
    private _router: Router,
    public http: HttpClient,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.titleSrvice.setTitle(this.l('CreateAnAccount'));


    this.model = {
      mobile: "",
      newPassword: "",
      confirmPassword: "",
      verificationCode: ""

    };
  }

  back(): void {
    this._router.navigate(['/account/login']);
  }

  save() {
    this.saving = true;
    let url = REGISTER_URL + "api/User/Register";//?MerchantId=C8793952-540E-414C-98FF-9C65D6";


    this.http.post(url, this.model, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe((res: any) => {

      // console.log(res);
      if (res) {
        if (res.result == 0) {
          this.modalService.info({
            nzTitle: '提示',
            nzContent: "注册成功",
          });
          this.back();
        } else {
          this.modalService.info({
            nzTitle: '提示',
            nzContent: res.message,
          });
        }
      }
      this.saving = false;
    }, err => {
      this.modalService.error({
        nzTitle: '提示',
        nzContent: err,
      });
      this.saving = false;
    });
  }




  getCaptcha() {
    this.getServerCaptcha(this.model.mobile, 2);
  }

}
