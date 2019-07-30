import { Component, OnInit, Input } from '@angular/core';
import { AppMenus } from "@shared/AppMenus";

import { AppSessionService } from '@shared/session/app-session.service';

/**
 * 流程的路径模块
 */
@Component({
  selector: 'app-flow-route',
  templateUrl: './flow-route.component.html',

})
export class FlowRouteComponent implements OnInit {

  //路径的对象
  @Input() data: any;

  @Input() flowPathType: any;

  showProcessor = false;
  constructor(private _AppSessionService: AppSessionService) { }

  ngOnInit() {
    // this.showProcessor = !this._ACLService.can(AppMenus.aclCompany);
    // console.log("showProcessor  " + this._ACLService.can(AppMenus.aclCompany));
    this.showProcessor = this._AppSessionService.user.roleName != '企业用户';
  }
  extraTemplate = "";

}
