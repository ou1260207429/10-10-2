
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


import { ReuseTabService } from '@delon/abc';
import { HttpClient, HttpHeaders } from '@angular/common/http';



import * as $ from 'jquery';

import { AppSessionService } from '@shared/session/app-session.service';


import {
  SessionServiceProxy
} from '@shared/service-proxies/service-proxies';
import { UrlHelper } from '@shared/helpers/UrlHelper';

import { TokenService } from '@abp/auth/token.service';


import { URL_CONFIG } from 'infrastructure/expression';
import { UtilsService } from '@abp/utils/utils.service';

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
    // private modalService: NzModalService,
    private _TokenService: TokenService,
    private _AppSessionService: AppSessionService,
    private reuseTabService: ReuseTabService,
    public http: HttpClient,
    private _utilsService: UtilsService,
  ) {
    super(injector);



  }



  ngOnInit(): void {

    this.titleSrvice.setTitle("登录");

    if (this._TokenService.getToken()) {

      this._router.navigate(['/app/home/welcome']);
    }
    this.reuseTabService.clear();
  }

  isSimplePsw = false;


  initSliter() {
    checkCode = "" + Math.ceil(Math.random() * 10000);

    $(".inner").mousedown(function (e) {

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

  loginErrMsg = "";

  login(): void {
    var str = $("#slider_content").attr("value");
    if (str === checkCode) {

      var reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/);
      this.isSimplePsw = !reg.test(this.loginService.authenticateModel.password);


      this.submitting = true;

      this.loginService.authenticate(
        () => {

          this._AppSessionService.initUserInfo(
            () => {
              /** 强制刷新导航栏url 跳转到首页 */
              this.submitting = false;
              this._router.navigate(['/app/home/welcome'], {

                queryParams: { t: this.isSimplePsw ? 1 : 0 }
              });

            }, (err) => {

              this.loginErrMsg = err;
              this.submitting = false;
            });

          this.resetSliter();
        },

        (err: any) => {

          this.loginErrMsg = err;
          this.submitting = false;
        });

    } else {

      this.loginErrMsg = '请完成拖动验证！';

    }

  }



  getCaptcha() {
    this.getServerCaptcha(this.loginService.authenticateModel.userNameOrEmailAddress, 0);
  }







  model = {
    // client_id: 'AEDA41B4-C038-4053-9105-3C73279E21C5',
    // client_secret: 'secret',
    // grant_type: 'password',
    // username: '',
    // password: ''
    userNameOrEmailAddress: "",
    password: "",
    clientId: "AEDA41B4-C038-4053-9105-3C73279E21C5"
  };



  login1(): void {
    var str = $("#slider_content").attr("value");
    if (str === checkCode) {

      this.submitting = true;



      let url = URL_CONFIG.getInstance().REGISTER_URL + "api/User/Login";//?MerchantId=C8793952-540E-414C-98FF-9C65D6";


      this.model.userNameOrEmailAddress = this.loginService.authenticateModel.userNameOrEmailAddress;
      this.model.password = this.loginService.authenticateModel.password;

      this.http.post(url, this.model, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).subscribe((res: any) => {


        if (res) {
          if (res.result == 0) {


            this._TokenService.setToken(res.data.access_token);

            this._AppSessionService.initUserInfo(
              () => {
                /** 强制刷新导航栏url 跳转到首页 */
                this.submitting = false;
                this._router.navigate(['/app/home/welcome']);

              }, (err) => {

                this.loginErrMsg = err;
                this.submitting = false;
              });
          } else {
            this.loginErrMsg = res.data.message;
          }
        }
        this.submitting = false;
        this.saving = false;
      }, err => {
        this.loginErrMsg = err;
        this.saving = false;
        this.submitting = false;
      });




    } else {

      this.loginErrMsg = '请完成拖动验证！';

    }

  }


}
