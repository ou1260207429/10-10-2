import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserCenterModifyPswComponent } from './modify-psw/modify-psw.component';

const routes: Routes = [
  { path: '', component: UserCenterModifyPswComponent },
  { path: 'modify-psw', component: UserCenterModifyPswComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCenterRoutingModule { }
