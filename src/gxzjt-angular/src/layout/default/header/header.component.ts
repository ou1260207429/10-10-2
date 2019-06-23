import { Component, ViewChild } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { UtilsService } from 'abp-ng2-module/dist/src/utils/utils.service';
import { TokenService } from 'abp-ng2-module/dist/src/auth/token.service';
import { AppAuthService } from '@shared/auth';
import { AppConsts } from '@shared/AppConsts';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  searchToggleStatus: boolean;

  constructor(public settings: SettingsService,
    private _utilsService: UtilsService,
    private _tokenService: TokenService,
    private authService: AppAuthService, ) { }

  toggleCollapsedSidebar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }

  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  }
  logout() {

    this._tokenService.clearToken();
    this._utilsService.deleteCookie(AppConsts.authorization.encrptedAuthTokenName);

   
    this.authService.logout(true);
    // location.href = AppConsts.appBaseUrl;
  }
}
