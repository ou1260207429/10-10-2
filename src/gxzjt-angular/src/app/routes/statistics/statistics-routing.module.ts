import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticsWarningCenterComponent } from './warning-center/warning-center.component';
import { StatisticsProAppStaticComponent } from './pro-app-static/pro-app-static.component';
import { StatisticsTimeoutDealWithComponent } from './timeout-deal-with/timeout-deal-with.component';
import { StatisticsTimeLimtDealComponent } from './time-limt-deal/time-limt-deal.component';
import { AppMenus } from "@shared/AppMenus"
import { UnitProjectStatisComponent } from './unit-project-statis/unit-project-statis.component';
import { WeeklyStatisticsComponent } from './weekly-statistics/weekly-statistics';

const routes: Routes = [

  { path: '', component: StatisticsWarningCenterComponent, data: { title: '预警中心' } },
  { path: 'warning-center', component: StatisticsWarningCenterComponent, data: { title: '预警中心', role: [AppMenus.aclOrg, AppMenus.aclSys] } },
  { path: 'pro-app-static', component: StatisticsProAppStaticComponent, data: { title: '项目申报情况统计' } },
  { path: 'timeout-deal-with', component: StatisticsTimeoutDealWithComponent, data: { title: '超时办理情况分析' } },
  { path: 'time-limt-deal', component: StatisticsTimeLimtDealComponent, data: { title: '办理时限统计' } },
  { path: 'unit-project-statis', component: UnitProjectStatisComponent, data: { title: '单位项目办理统计' } },
  { path: 'weekly-statis', component: WeeklyStatisticsComponent, data: { title: '周报数据统计' } },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
