import { ReuseTabService } from '@delon/abc/reuse-tab';
import {
  Component,
  Injector,
  ElementRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { AbpSessionService } from '@abp/session/abp-session.service';
import { _HttpClient } from '@delon/theme';



import {
  SessionServiceProxy
} from '@shared/service-proxies/service-proxies';
import { UrlHelper } from '@shared/helpers/UrlHelper';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  animations: [appModuleAnimation()],
})
export class LoginComponent extends AppComponentBase implements OnInit {
  submitting = false;
  form: FormGroup;
  count = 0;

  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }
  get mobile() {
    return this.form.controls.mobile;
  }
  get captcha() {
    return this.form.controls.captcha;
  }
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    public loginService: LoginService,
    private _sessionService: AbpSessionService,
    private _sessionAppService: SessionServiceProxy,
    private _router: Router,
    public http: _HttpClient,
  ) {
    super(injector);

    this.form = fb.group({
      userName: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [Validators.required]],
      remember: [true],
    });
  }

  ngOnInit(): void {
    this.titleSrvice.setTitle(this.l('LogIn'));
  }

  get multiTenancySideIsTeanant(): boolean {
    return this.appSession.tenantId > 0;
  }

  get isSelfRegistrationAllowed(): boolean {
    if (!this.appSession.tenantId) {
      return false;
    }
    return true;
  }

  login(): void {
    this.submitting = true;
    this.loginService.authenticate(() => {
      this.submitting = false;
    });
  }

  interval$: any;
  getCaptcha() {
    if (this.mobile.invalid) {
      this.mobile.markAsDirty({ onlySelf: true });
      this.mobile.updateValueAndValidity({ onlySelf: true });
      return;
    }
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) {
        clearInterval(this.interval$);
      }
    }, 1000);
  }

}
