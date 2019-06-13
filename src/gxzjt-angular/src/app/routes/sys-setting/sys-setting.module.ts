import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SysSettingRoutingModule } from './sys-setting-routing.module';
import { SpotCheckProportionComponent } from './spot-check-proportion/spot-check-proportion.component';
import { NatureServiceServiceProxy } from '../../../shared/service-proxies/service-proxies'

const COMPONENTS = [
  SpotCheckProportionComponent
];
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
  providers: [NatureServiceServiceProxy],
  entryComponents: COMPONENTS_NOROUNT
})
export class SysSettingModule { }
