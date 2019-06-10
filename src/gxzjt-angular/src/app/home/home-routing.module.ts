import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeIndexComponent } from './index/index.component'


const routes: Routes = [
  {
    path: '',
    component: HomeIndexComponent
  },
  {
    path: 'index',
    component: HomeIndexComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
