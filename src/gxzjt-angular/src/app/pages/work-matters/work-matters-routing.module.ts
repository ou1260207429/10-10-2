import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormModuleComponent } from './form-module/form-module.component';
import { FlowModuleComponent } from './flow-module/flow-module.component';

const routes: Routes = [
  {
    path: 'flowModuleComponent',
    component: FlowModuleComponent
  },
  {
    path: 'formModuleComponent',
    component: FormModuleComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkMattersRoutingModule { }
