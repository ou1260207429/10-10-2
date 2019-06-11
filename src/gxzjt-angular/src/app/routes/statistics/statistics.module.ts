import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsWarningCenterComponent } from './warning-center/warning-center.component';

const COMPONENTS = [
  StatisticsWarningCenterComponent
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    StatisticsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class StatisticsModule { }
