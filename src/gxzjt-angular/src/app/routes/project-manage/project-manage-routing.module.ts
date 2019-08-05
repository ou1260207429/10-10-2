import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectManageAddDesignComponent } from './add-design/add-design.component';

const routes: Routes = [

  { path: 'add-design', component: ProjectManageAddDesignComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManageRoutingModule { }
