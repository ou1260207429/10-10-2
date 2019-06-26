// import { finalize } from 'rxjs/operators';
import {
  Component,
  Injector,

  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
// import {  FormBuilder } from '@angular/forms';

// import {
//   AccountServiceProxy,
//   RegisterInput,
//   RegisterOutput,
// } from '@shared/service-proxies/service-proxies';


import { appModuleAnimation } from '@shared/animations/routerTransition';

// import { LoginService } from '../login/login.service';
import { AppComponentBase } from '@shared/component-base/app-component-base';

import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { environment } from 'environments/environment'

import { REGISTER_URL } from 'infrastructure/expression';

// import { NzModalService } from 'ng-zorro-antd';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
  animations: [appModuleAnimation()],
})
export class RegisterComponent extends AppComponentBase implements OnInit {


  model: any;
  captcha: {};
  count = 0;

  constructor(
    injector: Injector,
    // private _accountService: AccountServiceProxy,
    private _router: Router,
    public http: HttpClient,
    // private modalService: NzModalService,
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
  isSetCaptcha = false;

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
          this.modalService.info({
            nzTitle: '提示',
            nzContent: "注册成功",
          });
          this.back();
        } else {
          this.showErr(res.message);
        }
      }
      this.saving = false;
    }, err => {
      this.showErr(err);
      this.saving = false;
    });
  }

  showErr(msg) {
    this.modalService.error({
      nzTitle: '出错啦',
      nzContent: msg,
    });
  }

  interval$: any;
  getCaptcha() {
    let url = REGISTER_URL + "api/User/Register?phoneNum" + this.model.EId;
    this.http.get(url).subscribe(res => {
      this.startCount();
    }

    );

  }

  startCount() {
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) {
        clearInterval(this.interval$);
      }
    }, 1000);
  }



}
