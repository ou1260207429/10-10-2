import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemHomeComponent } from './system-home/system-home.component';

const routes: Routes = [
  {
    path: 'systemHomeComponent',
    component: SystemHomeComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
