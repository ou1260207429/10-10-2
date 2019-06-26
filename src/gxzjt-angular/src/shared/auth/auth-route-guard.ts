import { Injectable } from '@angular/core';
import { PermissionCheckerService } from '@abp/auth/permission-checker.service';
import { AppSessionService } from '@shared/session/app-session.service';
import { TokenService } from '@abp/auth/token.service';
import { NzModalService } from 'ng-zorro-antd';
import { ACLService } from '@delon/acl';

import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
} from '@angular/router';

@Injectable()
export class AppRouteGuard implements CanActivate, CanActivateChild {
  constructor(
    private _permissionChecker: PermissionCheckerService,
    private _router: Router,
    private _sessionService: AppSessionService,
    private _tokenService: TokenService,
    private _NzModalService: NzModalService,
    private _ACLService: ACLService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,

  ): boolean {

    if (!this._sessionService.user || !this._tokenService.getToken()) {

      this._router.navigate(['/account/login']);
      this._NzModalService.info({
        nzTitle: '提示',
        nzContent: '您未登录，请先前往登录',
      }
      );

      return false;
    }




    if (route.data && route.data['role'] && !this._ACLService.can(route.data['role'])) {
      this._NzModalService.info({
        nzTitle: '提示',
        nzContent: '您没有权限访问该地址',
      }
      );
      // this._router.navigate([this.selectBestRoute()]);
      return false;
    }


    return true;



    // if (!route.data || !route.data['permission']) {
    //   return true;
    // }

    // if (this._permissionChecker.isGranted(route.data['permission'])) {
    //   return true;
    // }

    // this._router.navigate([this.selectBestRoute()]);
    // return true;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    return this.canActivate(route, state);
  }

  selectBestRoute(): string {
    if (!this._sessionService.user || !this._tokenService.getToken()) {
      return '/account/login';
    }

    // if (this._permissionChecker.isGranted('Pages.Users')) {
    //   return '/app/admin/users';
    // }

    return '/app/home';
  }
}
