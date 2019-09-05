import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsWarningCenterComponent } from './warning-center/warning-center.component';
import { PipesModule } from 'pipes/pipes.module';
import { ComponentsModule } from '@app/components/components.module';
import { StatisticsProAppStaticComponent } from './pro-app-static/pro-app-static.component';
import { StatisticsTimeoutDealWithComponent } from './timeout-deal-with/timeout-deal-with.component';
import { StatisticsTimeLimtDealComponent } from './time-limt-deal/time-limt-deal.component';
import { StatisticsProAppStaticDetailComponent } from './pro-app-static-detail/pro-app-static-detail.component';
import { StatisticsTimeLimtDealDetailComponent } from './time-limt-deal-detail/time-limt-deal-detail.component';
import { StatisticsTimeoutDealDetailComponent } from './timeout-deal-detail/timeout-deal-detail.component';
import { StatisticsWarningCenterDetailComponent } from './warning-center-detail/warning-center-detail.component';
import { StatisticsAcceptCredentialsComponent } from './accept-credentials/accept-credentials.component';
import { StatisticsPositionPaperComponent } from './position-paper/position-paper.component';
import { UserRightService } from '../userright/userright.service';
import { StatisticsService } from './statistics.service';
import { UnitProjectStatisComponent } from './unit-project-statis/unit-project-statis.component';
import { WeeklyStatisticsComponent } from './weekly-statistics/weekly-statistics';

const COMPONENTS = [
  StatisticsWarningCenterComponent,
  StatisticsProAppStaticComponent,
  StatisticsTimeoutDealWithComponent,
  StatisticsTimeLimtDealComponent,
  UnitProjectStatisComponent,
  StatisticsAcceptCredentialsComponent,
  StatisticsPositionPaperComponent,
  WeeklyStatisticsComponent,
];
const COMPONENTS_NOROUNT = [
  StatisticsProAppStaticDetailComponent,
  StatisticsTimeLimtDealDetailComponent,
  StatisticsTimeoutDealDetailComponent,
  StatisticsWarningCenterDetailComponent,
  WeeklyStatisticsComponent,
];

@NgModule({
  imports: [
    SharedModule,
    StatisticsRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT,
  providers: [
    UserRightService, StatisticsService
  ]
})
export class StatisticsModule { }
