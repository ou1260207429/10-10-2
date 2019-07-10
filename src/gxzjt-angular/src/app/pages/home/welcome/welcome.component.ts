import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { MenuService } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd';

/**
 * 
 */
@Component({
  selector: 'sys-welcome',
  templateUrl: './welcome.html',
})
export class WelcomeComponent implements OnInit {

  constructor(
    private _NzModalService: NzModalService,
    private _MenuService: MenuService,
    public _ActivatedRoute: ActivatedRoute,
    private _router: Router,
  ) {

  }

  ngOnInit() {

    this._MenuService.resume();

    this._ActivatedRoute.queryParams.subscribe(params => {
      if (params["t"] == 1) {
        this._NzModalService.confirm({
          nzTitle: '提示',
          nzContent: "您现在的密码不符合8-18位数字和字母组合的要求，请前往修改",
          nzOnOk: () => {

            this._router.navigate(['/app/user-center/modify-psw']);
          }
        }
        );
      }
    });

  }




}
