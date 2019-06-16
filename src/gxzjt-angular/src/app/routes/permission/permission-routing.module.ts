import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrgManagerComponent } from './org-manager/org-manager.component';

const routes: Routes = [
  { path: 'org-manager', component: OrgManagerComponent, data: { title: '组织架构管理' } },
  { path: '', component: OrgManagerComponent, data: { title: '组织架构管理' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRoutingModule { }
