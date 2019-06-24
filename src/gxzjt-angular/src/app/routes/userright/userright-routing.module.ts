import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserrightUserlistComponent } from './userlist/userlist.component';
import { UserrightRolelistComponent } from './rolelist/rolelist.component';
import { UserrightPostworkComponent } from './postwork/postwork.component';

const routes: Routes = [

  { path: 'userlist', component: UserrightUserlistComponent },
  { path: 'rolelist', component: UserrightRolelistComponent },
  { path: 'postwork', component: UserrightPostworkComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserrightRoutingModule { }
