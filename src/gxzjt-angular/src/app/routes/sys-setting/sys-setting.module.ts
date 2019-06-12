import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SysSettingRoutingModule } from './sys-setting-routing.module';

const COMPONENTS = [];
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
  entryComponents: COMPONENTS_NOROUNT
})
export class SysSettingModule { }
