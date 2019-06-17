import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemHomeComponent } from './system-home/system-home.component';

const routes: Routes = [
  {
    path: 'systemHomeComponent',
    component: SystemHomeComponent,
    data: { title: '首页' }
  },
  {
    path: '',
    component: SystemHomeComponent,
    data: { title: '首页' }
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
