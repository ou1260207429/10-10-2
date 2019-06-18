import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticsWarningCenterComponent } from './warning-center/warning-center.component';
import { StatisticsProAppStaticComponent } from './pro-app-static/pro-app-static.component';
import { StatisticsTimeoutDealWithComponent } from './timeout-deal-with/timeout-deal-with.component';
import { StatisticsTimeLimtDealComponent } from './time-limt-deal/time-limt-deal.component';
const routes: Routes = [

  { path: '', component: StatisticsWarningCenterComponent, data: { title: '预警中心' } },
  { path: 'warning-center', component: StatisticsWarningCenterComponent, data: { title: '预警中心' } },
  { path: 'pro-app-static', component: StatisticsProAppStaticComponent, data: { title: '项目申报情况统计' } },
  { path: 'timeout-deal-with', component: StatisticsTimeoutDealWithComponent, data: { title: '超时办理情况分析' } },
  { path: 'time-limt-deal', component: StatisticsTimeLimtDealComponent, data: { title: '办理时限统计' } },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
