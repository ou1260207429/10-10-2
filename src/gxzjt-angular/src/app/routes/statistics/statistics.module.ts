import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsWarningCenterComponent } from './warning-center/warning-center.component';
import { PipesModule } from 'pipes/pipes.module';
import { ComponentsModule } from '@app/components/components.module';
import { StatisticsProAppStaticComponent } from './pro-app-static/pro-app-static.component';
import { StatisticsTimeoutDealWithComponent } from './timeout-deal-with/timeout-deal-with.component';
import { StatisticsTimeLimtDealComponent } from './time-limt-deal/time-limt-deal.component';
import { NatureServiceServiceProxy } from '@shared/service-proxies/service-proxies';
const COMPONENTS = [
  StatisticsWarningCenterComponent
  ,
  StatisticsProAppStaticComponent,
  StatisticsTimeoutDealWithComponent,
  StatisticsTimeLimtDealComponent];
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
  providers: [NatureServiceServiceProxy],
  entryComponents: COMPONENTS_NOROUNT
})
export class StatisticsModule { }
