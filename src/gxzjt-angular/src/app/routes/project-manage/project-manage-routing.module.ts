import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectManageAddDesignComponent } from './add-design/add-design.component';
import { ProjectManageAddAcceptanceComponent } from './add-acceptance/add-acceptance.component';

const routes: Routes = [

  { path: 'add-design', component: ProjectManageAddDesignComponent },
  { path: 'add-acceptance/:type/:projectId/:flowId', component: ProjectManageAddAcceptanceComponent,data: {  title: '新增验收审查申报',reuse:true } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManageRoutingModule { }
