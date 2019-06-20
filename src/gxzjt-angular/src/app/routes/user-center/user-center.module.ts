import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UserCenterRoutingModule } from './user-center-routing.module';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    UserCenterRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class UserCenterModule { }
