import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UserCenterRoutingModule } from './user-center-routing.module';
<<<<<<< HEAD

const COMPONENTS = [];
=======
import { UserCenterModifyPswComponent } from './modify-psw/modify-psw.component';


const COMPONENTS = [

  UserCenterModifyPswComponent];
>>>>>>> 493c25c93d5b13ca386d8f03501fd0c87c716421
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
