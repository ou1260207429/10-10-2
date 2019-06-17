import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrgManagerComponent } from './org-manager/org-manager.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { RoleManagerComponent } from './role-manager/role-manager.component';

const routes: Routes = [

  { path: '', component: OrgManagerComponent, data: { title: '组织架构管理' } },
  { path: 'org-manager', component: OrgManagerComponent, data: { title: '组织架构管理' } },
  { path: 'user-manager', component: UserManagerComponent, data: { title: '用户管理' } },
  { path: 'role-manager', component: RoleManagerComponent, data: { title: '角色管理' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRoutingModule { }
