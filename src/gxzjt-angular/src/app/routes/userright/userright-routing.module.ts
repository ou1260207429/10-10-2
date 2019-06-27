import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserrightUserlistComponent } from './userlist/userlist.component';
import { UserrightRolelistComponent } from './rolelist/rolelist.component';
import { UserrightPostworkComponent } from './postwork/postwork.component';
import { UserrightUseraddComponent } from './useradd/useradd.component';
import { UserrightUsereditComponent } from './useredit/useredit.component';
import { UserrightUserlookComponent } from './userlook/userlook.component';

const routes: Routes = [
  { path: 'userlist', component: UserrightUserlistComponent },
  { path: 'rolelist', component: UserrightRolelistComponent },
  { path: 'postwork', component: UserrightPostworkComponent },
  { path: 'useradd', component: UserrightUseraddComponent,data:{ title: '添加用户',reuse:false},},
  { path: 'useredit', component: UserrightUsereditComponent,data:{ title: '编辑用户',reuse:false}},
  { path: 'userlook', component: UserrightUserlookComponent,data:{title:'查看用户',reuse:true}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserrightRoutingModule { }
