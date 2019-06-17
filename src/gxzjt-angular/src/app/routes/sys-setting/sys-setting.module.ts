import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SysSettingRoutingModule } from './sys-setting-routing.module';
import { SpotCheckProportionComponent } from './spot-check-proportion/spot-check-proportion.component';
// import { NatureServiceServiceProxy } from '../../../shared/service-proxies/service-proxies';
import { SysSettingUnitInfoManageComponent } from './unit-info-manage/unit-info-manage.component';
import { SysSettingLogManageComponent } from './log-manage/log-manage.component';
import { SysSettingLogEditComponent } from './log-edit/log-edit.component';
import { SysSettingUnitInfoEditComponent } from './unit-info-edit/unit-info-edit.component'

const COMPONENTS = [
  SpotCheckProportionComponent
  ,
  SysSettingUnitInfoManageComponent,
  SysSettingLogManageComponent,
  SysSettingLogEditComponent,
  SysSettingUnitInfoEditComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    SysSettingRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  // providers: [NatureServiceServiceProxy],
  entryComponents: COMPONENTS_NOROUNT
})
export class SysSettingModule { }
