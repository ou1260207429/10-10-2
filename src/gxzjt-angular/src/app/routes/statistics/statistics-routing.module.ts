import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticsWarningCenterComponent } from './warning-center/warning-center.component';

const routes: Routes = [

  { path: '', component: StatisticsWarningCenterComponent, data: { title: '预警中心' } },
  { path: 'warning-center', component: StatisticsWarningCenterComponent, data: { title: '预警中心' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
