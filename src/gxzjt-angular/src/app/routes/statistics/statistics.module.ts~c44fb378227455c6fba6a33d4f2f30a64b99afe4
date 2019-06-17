import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsWarningCenterComponent } from './warning-center/warning-center.component';
import { PipesModule } from 'pipes/pipes.module';
import { ComponentsModule } from '@app/components/components.module';
import { StatisticsProAppStaticComponent } from './pro-app-static/pro-app-static.component';
import { StatisticsTimeoutDealWithComponent } from './timeout-deal-with/timeout-deal-with.component';
import { StatisticsTimeLimtDealComponent } from './time-limt-deal/time-limt-deal.component';
// import { NatureServiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { StatisticsProAppStaticDetailComponent } from './pro-app-static-detail/pro-app-static-detail.component';
import { StatisticsTimeLimtDealDetailComponent } from './time-limt-deal-detail/time-limt-deal-detail.component';
import { StatisticsTimeoutDealDetailComponent } from './timeout-deal-detail/timeout-deal-detail.component';
import { StatisticsWarningCenterDetailComponent } from './warning-center-detail/warning-center-detail.component';
import { StatisticsAcceptCredentialsComponent } from './accept-credentials/accept-credentials.component';
import { StatisticsPositionPaperComponent } from './position-paper/position-paper.component';
const COMPONENTS = [
  StatisticsWarningCenterComponent,
  StatisticsProAppStaticComponent,
  StatisticsTimeoutDealWithComponent,
  StatisticsTimeLimtDealComponent,
  StatisticsProAppStaticDetailComponent,
  StatisticsTimeLimtDealDetailComponent,
  StatisticsTimeoutDealDetailComponent,
  StatisticsWarningCenterDetailComponent,
  StatisticsAcceptCredentialsComponent,
  StatisticsPositionPaperComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    StatisticsRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  // providers: [NatureServiceServiceProxy],
  entryComponents: COMPONENTS_NOROUNT
})
export class StatisticsModule { }
