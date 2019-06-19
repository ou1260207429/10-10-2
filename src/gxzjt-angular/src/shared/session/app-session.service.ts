import { Injectable } from '@angular/core';
import { AbpMultiTenancyService } from '@abp/multi-tenancy/abp-multi-tenancy.service';
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
      this._loginServiceProxy
        .getCurrentLoginUserInfoByUserId()
        .toPromise()
        .then(
          (result: UserCacheDto) => {
            // this._application = new ApplicationInfoDto();
            // this._application.version = "1.0.0";
            // this._application.releaseDate = new Date();
            this._user = result;
            this._tenant = new TenantLoginInfoDto();

            resolve(true);
          },
          err => {
            resolve(true);
            reject(err);
          },
        );
    });
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
