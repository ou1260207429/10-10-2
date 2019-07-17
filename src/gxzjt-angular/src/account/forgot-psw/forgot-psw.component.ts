import { finalize } from 'rxjs/operators';
import {
  Component,
  Injector,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { URLConfig } from '@shared/config/host';

import {
  AccountServiceProxy,
  RegisterInput,
  RegisterOutput,
} from '@shared/service-proxies/service-proxies';


import { appModuleAnimation } from '@shared/animations/routerTransition';

import { AppComponentBase } from '@shared/component-base/app-component-base';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NzNotificationService } from 'ng-zorro-antd';

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
    private _NzNotificationService: NzNotificationService,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.titleSrvice.setTitle(this.l('CreateAnAccount'));


    this.model = {
      Mobile: "",
      NewPassword: "",
      ConfirmPassword: "",
      VerificationCode: ""

    };
  }

  back(): void {
    this._router.navigate(['/account/login']);
  }

  save() {
    this.saving = true;
    let url = URLConfig.getInstance().REGISTER_URL + "api/User/BackUserPasswordAsync";//?MerchantId=C8793952-540E-414C-98FF-9C65D6";


    this.http.post(url, this.model, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe((res: any) => {

      // console.log(res);
      if (res) {
        if (res.result == 0) {

          this._NzNotificationService.info("修改成功", '');
          this.back();
        } else {

          this._NzNotificationService.info(res.message, '');
        }
      }
      this.saving = false;
    }, err => {


      this._NzNotificationService.info(err, '');
      this.saving = false;
    });
  }




  getCaptcha() {
    this.getServerCaptcha(this.model.Mobile, 2);
  }

}
