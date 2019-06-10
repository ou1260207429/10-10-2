import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormModuleComponent } from './form-module.component';

const routes: Routes = [
  {
    path: '',
    component: FormModuleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormModuleRoutingModule { }
