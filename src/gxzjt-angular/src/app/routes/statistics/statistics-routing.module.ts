import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticsWarningCenterComponent } from './warning-center/warning-center.component';

const routes: Routes = [
  
  { path: '', component: StatisticsWarningCenterComponent },
  { path: 'warning-center', component: StatisticsWarningCenterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
