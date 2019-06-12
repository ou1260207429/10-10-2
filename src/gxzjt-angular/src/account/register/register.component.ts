import { finalize } from 'rxjs/operators';
import {
  Component,
  Injector,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';

import {
  AccountServiceProxy,
  RegisterInput,
  RegisterOutput,
} from '@shared/service-proxies/service-proxies';


import { appModuleAnimation } from '@shared/animations/routerTransition';

import { LoginService } from '../login/login.service';
import { AppComponentBase } from '@shared/component-base/app-component-base';

import { _HttpClient } from '@delon/theme';
@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
  animations: [appModuleAnimation()],
})
export class RegisterComponent extends AppComponentBase implements OnInit {


  model: RegisterInput;
  captcha: {};
  count = 0;

  constructor(
    injector: Injector,
    private _accountService: AccountServiceProxy,
    private _router: Router,
    private readonly _loginService: LoginService,
    public http: _HttpClient,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.titleSrvice.setTitle(this.l('CreateAnAccount'));


    this.model = new RegisterInput();
  }

  back(): void {
    this._router.navigate(['/account/login']);
  }

  save(): void {
    this.saving = true;
    this._accountService
      .register(this.model)
      .pipe(finalize(() => {
        this.saving = false;
      }))
      .subscribe((result: RegisterOutput) => {
        if (!result.canLogin) {
          this.notify.success(this.l('SuccessfullyRegistered'));
          this._router.navigate(['/login']);
          return;
        }

        this.saving = true;

        // Autheticate
        this._loginService.authenticateModel.userNameOrEmailAddress = this.model.userName;
        this._loginService.authenticateModel.password = this.model.password;
        this._loginService.authenticate(() => {
          this.saving = false;
        });
      });
  }


  interval$: any;
  getCaptcha() {
    // if (this.mobile.invalid) {
    //   this.mobile.markAsDirty({ onlySelf: true });
    //   this.mobile.updateValueAndValidity({ onlySelf: true });
    //   return;
    // }
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) {
        clearInterval(this.interval$);
      }
    }, 1000);
  }

}
