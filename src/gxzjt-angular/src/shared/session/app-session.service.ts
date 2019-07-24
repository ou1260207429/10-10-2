import { Injectable } from '@angular/core';
import { AbpMultiTenancyService } from '@abp/multi-tenancy/abp-multi-tenancy.service';
import { ACLService, DelonACLConfig } from '@delon/acl';
import { MenuService } from '@delon/theme';
import { AppConsts } from '@shared/AppConsts';
import { TokenService } from '@abp/auth/token.service';

import { AppMenus } from '@shared/AppMenus';

import { finalize } from 'rxjs/operators';
import {
  LoginServiceProxy,
  // UserLoginInfoDto,
  TenantLoginInfoDto,
  ApplicationInfoDto,
  GetCurrentLoginInformationsOutput,
  UserCacheDto,
} from '@shared/service-proxies/service-proxies';

@Injectable()
export class AppSessionService {
  // private _user: UserLoginInfoDto;

  private _user: UserCacheDto;
  private _tenant: TenantLoginInfoDto;
  // private _application: ApplicationInfoDto;

  constructor(
    private _loginServiceProxy: LoginServiceProxy,
    private _abpMultiTenancyService: AbpMultiTenancyService,
    private _ACLService: ACLService,
    private _MenuService: MenuService,
    private _TokenService: TokenService,
    // private _DelonACLConfig: DelonACLConfig
  ) { }

  // get application(): ApplicationInfoDto {
  //   return this._application;
  // }

  get user(): UserCacheDto {
    return this._user;
  }

  get userId(): string {
    return this.user ? this.user.id : null;
  }

  get tenant(): TenantLoginInfoDto {
    return this._tenant;
  }

  get tenantId(): number {
    return this.tenant ? this.tenant.id : null;
  }

  getShownLoginName(): string {
    const userName = this._user.eName;
    if (!this._abpMultiTenancyService.isEnabled) {
      return userName;
    }
    return (this._tenant ? this._tenant.tenancyName : '.') + '\\' + userName;
  }

  init(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

      if (this._TokenService.getToken()) {

        this.initUserInfo(() => {
          resolve(true);
        }, err => {
          location.href = AppConsts.appBaseUrl + '/#/account/login';
          // reject(err);
          resolve(true);
        });
        return;
      } else {
        resolve(true);
        location.href = AppConsts.appBaseUrl + '/#/account/login';
      }

    });
  }

  public initUserInfo(finallyCallback: () => void, errCallback: (e) => void) {
    finallyCallback = finallyCallback || (() => { });

    errCallback = errCallback || ((e) => { });
    return this._loginServiceProxy
      .getCurrentLoginUserInfoByUserId()
      // .pipe(finalize(finallyCallback))
      .subscribe
      (
        (result: UserCacheDto) => {
          // this._application = new ApplicationInfoDto();
          // this._application.version = "1.0.0";
          // this._application.releaseDate = new Date();
          this._user = result;
          // this._ACLService.removeRole([AppMenus.aclCompany,AppMenus.aclSys,AppMenus.aclOrg]);
          this._MenuService.clear();
          switch (result.roleName) {
            case '系统管理员':
              this._ACLService.setFull(true);
              this._MenuService.add(AppMenus.Menus);
              break;
            case '管理员':
              this._ACLService.setRole([AppMenus.aclSys]);
              this._MenuService.add(AppMenus.Menus);
              break;
            case '单位管理员':
              this._ACLService.setRole([AppMenus.orgManager]);
              this._MenuService.add(AppMenus.Menus);
              break;
            case '大厅窗口受理':
              this._ACLService.setRole([AppMenus.aclOrg]);
              this._MenuService.add(AppMenus.MenusOrg);
              break;
            case '业务审批负责人（主要领导）':
              this._ACLService.setRole([AppMenus.aclOrg]);
              this._MenuService.add(AppMenus.MenusOrg);
              break;
            case '业务审批负责人（分管领导）':
              this._ACLService.setRole([AppMenus.aclOrg]);
              this._MenuService.add(AppMenus.MenusOrg);
              break;
            case '业务审批负责人':
              this._ACLService.setRole([AppMenus.aclOrg]);
              this._MenuService.add(AppMenus.MenusOrg);
              break;
            case '业务承办人':
              this._ACLService.setRole([AppMenus.aclOrg]);
              this._MenuService.add(AppMenus.MenusOrg);
              break;
            case '经办事项':
              this._ACLService.setRole([AppMenus.aclOrg]);
              this._MenuService.add(AppMenus.MenusOrg);
              break;
            case '窗口受理':
              this._ACLService.setRole([AppMenus.aclOrg]);
              this._MenuService.add(AppMenus.MenusOrg);
              break;
            case '窗口负责人':
              this._ACLService.setRole([AppMenus.aclOrg]);
              this._MenuService.add(AppMenus.MenusOrg);
              break;
            case '市级领导':
              this._ACLService.setRole([AppMenus.aclOrg]);
              this._MenuService.add(AppMenus.MenusOrg);
              break;
            case '审批负责人':
              this._ACLService.setRole([AppMenus.aclOrg]);
              this._MenuService.add(AppMenus.MenusOrg);
              break;
            case '备案抽查审批负责人':
              this._ACLService.setRole([AppMenus.aclOrg]);
              this._MenuService.add(AppMenus.MenusOrg);
              break;
            case '业务审批负责人（局主要领导）':
              this._ACLService.setRole([AppMenus.aclOrg]);
              this._MenuService.add(AppMenus.MenusOrg);
              break;
            case '业务审批负责人（股长）':
              this._ACLService.setRole([AppMenus.aclOrg]);
              this._MenuService.add(AppMenus.MenusOrg);
              break;
            case '企业用户':
              this._ACLService.setRole([AppMenus.aclCompany]);
              this._MenuService.add(AppMenus.MenusOrg);
              break;
            default:
              this._ACLService.setRole([AppMenus.aclCompany]);
              this._MenuService.add(AppMenus.MenusOrg);

              break;
          }



          this._MenuService.resume();


          this._tenant = new TenantLoginInfoDto();

          // resolve(true);
          finallyCallback();
        },
        err => {
          errCallback(err);


        }
      );
  }

  changeTenantIfNeeded(tenantId?: number): boolean {
    if (this.isCurrentTenant(tenantId)) {
      return false;
    }

    abp.multiTenancy.setTenantIdCookie(tenantId);
    location.reload();
    return true;
  }

  private isCurrentTenant(tenantId?: number) {
    if (!tenantId && this.tenant) {
      return false;
    } else if (tenantId && (!this.tenant || this.tenant.id !== tenantId)) {
      return false;
    }

    return true;
  }
}
