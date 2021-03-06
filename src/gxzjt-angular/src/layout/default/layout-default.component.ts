import {
  Component,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  AfterViewInit,
  OnInit,
  OnDestroy,
  ElementRef,
  Renderer2,
  Inject,
  Injector,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  Router,
  NavigationEnd,
  RouteConfigLoadStart,
  NavigationError,
  NavigationCancel,
} from '@angular/router';
import { NzMessageService, NzIconService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { updateHostClass } from '@delon/util';
import { ScrollService, SettingsService, TitleService } from '@delon/theme';
import { TokenService } from '@abp/auth/token.service';
// #region icons

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  SearchOutline,
  SettingOutline,
  FullscreenOutline,
  FullscreenExitOutline,
  BellOutline,
  LockOutline,
  PlusOutline,
  UserOutline,
  LogoutOutline,
  EllipsisOutline,
  GlobalOutline,
  ArrowDownOutline,
  // Optional
  GithubOutline,
  AppstoreOutline,
} from '@ant-design/icons-angular/icons';

const ICONS = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  SearchOutline,
  SettingOutline,
  FullscreenOutline,
  FullscreenExitOutline,
  BellOutline,
  LockOutline,
  PlusOutline,
  UserOutline,
  LogoutOutline,
  EllipsisOutline,
  GlobalOutline,
  ArrowDownOutline,
  // Optional
  GithubOutline,
  AppstoreOutline,
];

// #endregion
import { AppComponentBase } from '@shared/component-base';

var hadShowModel = false;
@Component({
  selector: 'layout-default',
  templateUrl: './layout-default.component.html',
  preserveWhitespaces: false,
  host: {
    '[class.alain-default]': 'true',
  },
})
export class LayoutDefaultComponent extends AppComponentBase
  implements OnInit, AfterViewInit, OnDestroy {
  private notify$: Subscription;
  isFetching = false;


  constructor(
    injector: Injector,
    iconSrv: NzIconService,
    router: Router,
    scroll: ScrollService,
    public settings: SettingsService,
    private el: ElementRef,
    private renderer: Renderer2,
    private _TokenService: TokenService,

    @Inject(DOCUMENT) private doc: any,
  ) {
    super(injector);
    iconSrv.addIcon(...ICONS);
    // scroll to top in change page
    router.events.subscribe(evt => {

      if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
        this.isFetching = true;
      }
      if (evt instanceof NavigationError || evt instanceof NavigationCancel) {
        this.isFetching = false;
        // if (!hadShowModel) {
        //   hadShowModel = true;
        //   this.modalService.info({
        //     nzTitle: '提示',
        //     nzContent: '页面出现错误，此页面页面无法正常加载。请检查您的网络是否已断开。',
        //     nzOnOk: () => { hadShowModel = false },
        //     nzOnCancel: () => { hadShowModel = false },
        //   });
        // }

        
        // if (evt instanceof NavigationError) {
        //   // this.message.error(`无法加载${evt.url}路由`);
        //   if (!this._TokenService.getToken()) {
        //     // this.message.info(`您未登录，请先前往登录`);
        //     if (!hadShowModel) {
        //       hadShowModel = true;

        //       this.modalService.info({
        //         nzTitle: '提示',
        //         nzContent: '您未登录，请先前往登录',
        //         nzOnOk: () => {

        //           hadShowModel = false;
        //         },
        //         nzOnCancel: () => hadShowModel = false,
        //       });
        //       router.navigate(['/account/login']);
        //     }

        //   } else {
        //     // this.message.error(`页面出现错误，此页面页面无法正常加载`);
        //     if (!hadShowModel) {
        //       hadShowModel = true;
        //       this.modalService.info({
        //         nzTitle: '提示',
        //         nzContent: '页面出现错误，此页面页面无法正常加载。请检查您的网络是否已断开。',
        //         nzOnOk: () => { hadShowModel = false },
        //         nzOnCancel: () => { hadShowModel = false },
        //       });

        //     }

        //   }

        // }
        return;
      }
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      setTimeout(() => {
        scroll.scrollToTop();
        this.isFetching = false;
      }, 100);
    });

  }

  get collapsed(): boolean {
    return this.settings.layout.collapsed;
  }

  private setClass() {
    const { el, renderer, settings } = this;
    const layout = settings.layout;

    updateHostClass(
      el.nativeElement,
      renderer,
      {
        ['alain-default']: true,
        // [`alain-default__fixed`]: layout.fixed,
        [`alain-default__boxed`]: layout.boxed,
        [`alain-default__collapsed`]: layout.collapsed,
      },
      true,
    );

    this.doc.body.classList[layout.colorWeak ? 'add' : 'remove']('color-weak');
  }



  ngAfterViewInit(): void {

  }

  ngOnInit() {
    this.notify$ = this.settings.notify.subscribe(() => this.setClass());
    this.setClass();
  }

  ngOnDestroy() {
    this.notify$.unsubscribe();
  }
}
