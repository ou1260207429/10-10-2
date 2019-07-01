// import { finalize } from 'rxjs/operators';
import {
  Component,
  Injector,

  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

// import {
//   AccountServiceProxy,
//   RegisterInput,
//   RegisterOutput,
// } from '@shared/service-proxies/service-proxies';


import { appModuleAnimation } from '@shared/animations/routerTransition';

import { AppComponentBase } from '@shared/component-base/app-component-base';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NzNotificationService } from 'ng-zorro-antd';

import { REGISTER_URL } from 'infrastructure/expression';


@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
  animations: [appModuleAnimation()],
})
export class RegisterComponent extends AppComponentBase implements OnInit {


  model: any;


  constructor(
    injector: Injector,
    // private _accountService: AccountServiceProxy,
    private _router: Router,
    public http: HttpClient,
    // private modalService: NzModalService,
    private _NzNotificationService: NzNotificationService,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.titleSrvice.setTitle("创建用户");


    // this.model = {new RegisterInput()};

    this.model = {
      MerchantId: "C8793952-540E-414C-98FF-9C65D6171F6D",
      EId: "",//登录手机号
      EName: "",
      Password: "",
      ConfirmPassword: "",
      EnterpriseCode: "",
      EnterpriseName: "",
      Leader: "",
      LeaderPhone: "",
      Contact: "",
      ContactPhone: "",
      VerificationCode: "",

    };


  }

  back(): void {
    this._router.navigate(['/account/login']);
  }


  // save(): void {
  // this.saving = true;
  // this._accountService
  //   .register(this.model)
  //   .pipe(finalize(() => {
  //     this.saving = false;
  //   }))
  //   .subscribe((result: RegisterOutput) => {
  //     if (!result.canLogin) {
  //       this.notify.success(this.l('SuccessfullyRegistered'));
  //       this._router.navigate(['/login']);
  //       return;
  //     }

  //     this.saving = true;

  //     // Autheticate
  //     this._loginService.authenticateModel.userNameOrEmailAddress = this.model.userName;
  //     this._loginService.authenticateModel.password = this.model.password;
  //     this._loginService.authenticate(() => {
  //       this.saving = false;
  //     });
  //   });
  // }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  register() {
    this.saving = true;
    let url = REGISTER_URL + "api/User/Register";//?MerchantId=C8793952-540E-414C-98FF-9C65D6";


    this.http.post(url, this.model, this.httpOptions).subscribe((res: any) => {

      // console.log(res);
      if (res) {
        if (res.result == 0) {

          this._NzNotificationService.info("注册成功",'');
          this.back();
        } else {
          this._NzNotificationService.info(res.message,'');
        }
      }
      this.saving = false;
    }, err => {
      this.showErr(err);
      this.saving = false;
    });
  }

  showErr(msg) {
    // this.message.error(msg);
    this._NzNotificationService.error(msg,'');
  }


  getCaptcha() {
    this.getServerCaptcha(this.model.EId, 1);
  }



}
