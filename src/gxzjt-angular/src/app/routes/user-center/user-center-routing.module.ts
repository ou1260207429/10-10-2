import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

<<<<<<< HEAD
const routes: Routes = [
];
=======
import { UserCenterModifyPswComponent } from './modify-psw/modify-psw.component';

const routes: Routes = [
  { path: 'modify-psw', component: UserCenterModifyPswComponent }];
>>>>>>> 493c25c93d5b13ca386d8f03501fd0c87c716421

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCenterRoutingModule { }
