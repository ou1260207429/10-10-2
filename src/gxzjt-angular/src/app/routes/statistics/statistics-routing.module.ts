import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticsWarningCenterComponent } from './warning-center/warning-center.component';
import { StatisticsProAppStaticComponent } from './pro-app-static/pro-app-static.component';
import { StatisticsTimeoutDealWithComponent } from './timeout-deal-with/timeout-deal-with.component';
import { StatisticsTimeLimtDealComponent } from './time-limt-deal/time-limt-deal.component';
import { StatisticsProAppStaticDetailComponent } from './pro-app-static-detail/pro-app-static-detail.component';
import { StatisticsTimeLimtDealDetailComponent } from './time-limt-deal-detail/time-limt-deal-detail.component';
import { StatisticsTimeoutDealDetailComponent } from './timeout-deal-detail/timeout-deal-detail.component';
import { StatisticsWarningCenterDetailComponent } from './warning-center-detail/warning-center-detail.component';
import { StatisticsAcceptCredentialsComponent } from './accept-credentials/accept-credentials.component';
import { StatisticsPositionPaperComponent } from './position-paper/position-paper.component';

const routes: Routes = [

  { path: '', component: StatisticsWarningCenterComponent, data: { title: '预警中心' } },
  { path: 'warning-center', component: StatisticsWarningCenterComponent, data: { title: '预警中心' } },
  { path: 'pro-app-static', component: StatisticsProAppStaticComponent, data: { title: '项目申报情况统计' } },
  { path: 'timeout-deal-with', component: StatisticsTimeoutDealWithComponent, data: { title: '超时办理情况分析' } },
  { path: 'time-limt-deal', component: StatisticsTimeLimtDealComponent, data: { title: '办理时限统计' } },
  { path: 'pro-app-static-detail', component: StatisticsProAppStaticDetailComponent },
  { path: 'time-limt-deal-detail', component: StatisticsTimeLimtDealDetailComponent },
  { path: 'timeout-deal-detail', component: StatisticsTimeoutDealDetailComponent },
  { path: 'warning-center-detail', component: StatisticsWarningCenterDetailComponent },
  { path: 'accept-credentials', component: StatisticsAcceptCredentialsComponent },
  { path: 'position-paper', component: StatisticsPositionPaperComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
