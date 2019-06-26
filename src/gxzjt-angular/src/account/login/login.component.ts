
import {
  Component,
  Injector,
  ElementRef,
  ViewChild,
  OnInit,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { AbpSessionService } from '@abp/session/abp-session.service';
import { _HttpClient } from '@delon/theme';

import { ReuseTabService } from '@delon/abc';

// import { NzModalService } from 'ng-zorro-antd';

import * as $ from 'jquery';

import { AppSessionService } from '@shared/session/app-session.service';

import { isPhone } from '@shared/utils/regex';

import {
  SessionServiceProxy
} from '@shared/service-proxies/service-proxies';
import { UrlHelper } from '@shared/helpers/UrlHelper';

import { TokenService } from '@abp/auth/token.service';


var checkCode: any;
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  animations: [appModuleAnimation()],
})
export class LoginComponent extends AppComponentBase implements OnInit {
  submitting = false;
  // validateForm: FormGroup;
  count = 0;
  usePsw = true;



  isNeedDragSlider = false;






  switchUswPsw() {
    this.usePsw = !this.usePsw;
  }

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    public loginService: LoginService,
    // private _sessionService: AbpSessionService,
    // private _sessionAppService: SessionServiceProxy,
    private _router: Router,
    public http: _HttpClient,
    // private modalService: NzModalService,
    private _TokenService: TokenService,
    private _AppSessionService: AppSessionService,
    private reuseTabService: ReuseTabService,
  ) {
    super(injector);



  }



  ngOnInit(): void {
    this.titleSrvice.setTitle("登录");

    if (this._TokenService.getToken()) {
      // location.href = location.href.replace('#/account/login', '#/app/');
      this._router.navigate(['/app/home/welcome']);
    }
    this.reuseTabService.clear();
  }


  initSliter() {
    checkCode = "" + Math.ceil(Math.random() * 10000);

    $(".inner").mousedown(function (e) {
      console.log(e)
      var el = $(".inner");

      var os = el.offset();
      var dx;
      var span = $(".outer>span");
      var filter = $(".filter-box");

      $("#slider_content").attr("value", "no");

      var _differ = $(".outer").width() - el.width();
      $(document).mousemove(function (e) {
        dx = e.pageX - os.left;
        if (dx < 0) {
          dx = 0;
        } else if (dx > _differ) {
          dx = _differ;
        }
        filter.css('width', dx);
        el.css("left", dx);
      });
      $(document).mouseup(function (e) {
        $(document).off('mousemove');
        $(document).off('mouseup');
        dx = e.pageX - os.left;
        if (dx < _differ) {
          dx = 0;
          span.html("请拖动滑块至最右边");
        } else if (dx >= _differ) {
          dx = _differ;
          $(".outer").addClass("act");
          span.html("验证通过！");
          el.html('&radic;');


          $("#slider_content").attr("value", checkCode);
          // $(this).trigger('change');


        }
        filter.css('width', dx);
        el.css("left", dx);

      })
    });
  }
  resetSliter() {
    checkCode = "" + Math.ceil(Math.random() * 10000);
    var el = $(".inner");
    el.css("left", 0);
    el.html('&gt;&gt;');

    $(".outer").removeClass("act");

    $("#slider_content").attr("value", "no");
    var span = $(".outer>span");
    span.html("请拖动滑块至最右边");
    var filter = $(".filter-box");
    filter.css('width', 0);
  }

  ngAfterViewInit() {
    this.initSliter();
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
    var str = $("#slider_content").attr("value");
    if (str === checkCode) {

      this.submitting = true;
      this.loginService.authenticate(() => {

        this._AppSessionService.initUserInfo().then(() => {
          /** 强制刷新导航栏url 跳转到首页 */
          // location.href = location.href.replace('#/account/login', '#/app/');
          this.submitting = false;
          this._router.navigate(['#/app/home/welcome']);

        }, err => {
          this.modalService.warning({
            nzTitle: '提示',
            nzContent: '登录出错:'+err
          });
          this.submitting = false;
        });

        this.resetSliter();
      });
    } else {
      this.modalService.warning({
        nzTitle: '提示',
        nzContent: '请完成拖动验证！'
      });
    }



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

  checkPhone() {
    return isPhone(this.loginService.authenticateModel.userNameOrEmailAddress);
  }
}
