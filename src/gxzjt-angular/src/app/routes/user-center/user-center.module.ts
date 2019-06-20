import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UserCenterRoutingModule } from './user-center-routing.module';
import { UserCenterModifyPswComponent } from './modify-psw/modify-psw.component';


const COMPONENTS = [

  UserCenterModifyPswComponent];
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
