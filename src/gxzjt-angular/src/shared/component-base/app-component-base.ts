import { Injector, ElementRef } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppSessionService } from '@shared/session/app-session.service';
import { FeatureCheckerService } from '@abp/features/feature-checker.service';
import { NotifyService } from '@abp/notify/notify.service';
import { SettingService } from '@abp/settings/setting.service';
import { MessageService } from '@abp/message/message.service';
import { NzModalService } from 'ng-zorro-antd';
import { AbpMultiTenancyService } from '@abp/multi-tenancy/abp-multi-tenancy.service';
import { ModalHelper, ALAIN_I18N_TOKEN, TitleService } from '@delon/theme';
import { LocalizationService } from '@shared/i18n/localization.service';
import { PermissionService } from '@shared/auth/permission.service';
import { REGISTER_URL } from 'infrastructure/expression';

import { HttpClient, HttpHeaders } from '@angular/common/http';
export abstract class AppComponentBase {
  localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;

  localization: LocalizationService;
  permission: PermissionService;
  feature: FeatureCheckerService;
  notify: NotifyService;
  setting: SettingService;
  message: MessageService;
  modalService: NzModalService;
  multiTenancy: AbpMultiTenancyService;
  appSession: AppSessionService;
  elementRef: ElementRef;
  modalHelper: ModalHelper;
  titleSrvice: TitleService;
  http: HttpClient;
  /**
   * 保存状态
   */
  saving = false;

  constructor(injector: Injector) {
    this.localization = injector.get<LocalizationService>(ALAIN_I18N_TOKEN);
    this.permission = injector.get(PermissionService);
    this.feature = injector.get(FeatureCheckerService);
    this.notify = injector.get(NotifyService);
    this.setting = injector.get(SettingService);
    this.message = injector.get(MessageService);
    this.multiTenancy = injector.get(AbpMultiTenancyService);
    this.appSession = injector.get(AppSessionService);
    this.elementRef = injector.get(ElementRef);
    this.modalHelper = injector.get(ModalHelper);
    this.titleSrvice = injector.get(TitleService);
    this.modalService = injector.get(NzModalService);
    this.http = injector.get(HttpClient);
  }

  l(key: string, ...args: any[]): string {
    let localizedText = this.localization.localization(key, this.localizationSourceName);

    if (!localizedText) {
      localizedText = key;
    }

    if (!args || !args.length) {
      return localizedText;
    }

    return this.localization.formatString(localizedText, args);
  }

  isGranted(permissionName: string): boolean {
    return this.permission.isGranted(permissionName);
  }


  countCaptcha = 0;
  isSetCaptcha = false;
  interval$: any;
  // 0登录 1注册 2找回密码
  getServerCaptcha(phone, type) {
    let url = REGISTER_URL + "api/User/SendValidationSMS?mobile=" + phone + "&validationCodeType=" + type;

    this.isSetCaptcha = true;
    var httpOptions = {
      headers: new HttpHeaders()
    };
    this.http.post(url, null, httpOptions).subscribe((res: any) => {

      if (res) {
        if (res.result == 0) {
          this.startCount();
        } else {
          this.modalService.info({
            nzTitle: '提示',
            nzContent: res.message,
          });
        }

      }

      this.isSetCaptcha = false;
    },
      err => {

        this.modalService.error({
          nzTitle: '提示',
          nzContent: err,
        });
        this.isSetCaptcha = false;
      });

  }

  startCount() {
    this.countCaptcha = 59;
    this.interval$ = setInterval(() => {
      this.countCaptcha -= 1;
      if (this.countCaptcha <= 0) {
        clearInterval(this.interval$);
      }
    }, 1000);
  }


}
