import { Component, OnInit, Injector } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@delon/theme';
import { AppComponentBase } from '@shared/component-base';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { TokenService } from '@abp/auth/token.service';
import { UtilsService } from '@abp/utils/utils.service';
import { AppConsts } from '@shared/AppConsts';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent extends AppComponentBase implements OnInit {
  shownLoginName = '';
  emailAddress = '';

  constructor(
    injector: Injector,
    private authService: AppAuthService,
    public settings: SettingsService,
    private _utilsService: UtilsService,
    private _tokenService: TokenService,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.shownLoginName = this.appSession.getShownLoginName();
    this.emailAddress = this.appSession.user.eid;
  }

  logout() {

    this._tokenService.clearToken();
    this._utilsService.deleteCookie(AppConsts.authorization.encrptedAuthTokenName);
    this.authService.logout(true);
    // location.href = AppConsts.appBaseUrl;
  }
  toggleCollapsedSidebar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }

}
