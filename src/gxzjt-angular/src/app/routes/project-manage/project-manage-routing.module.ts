import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectManageAddDesignComponent } from './add-design/add-design.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectManageAddDesignComponent,
    data: { title: '新增消防设计审查' }
  },
  {
    path: 'add-design',
    component: ProjectManageAddDesignComponent,
    data: { title: "新增消防设计审查" }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManageRoutingModule { }
