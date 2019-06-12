import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsWarningCenterComponent } from './warning-center/warning-center.component';
import { PipesModule } from 'pipes/pipes.module';
import { ComponentsModule } from '@app/components/components.module';
const COMPONENTS = [
  StatisticsWarningCenterComponent
];
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
  entryComponents: COMPONENTS_NOROUNT
})
export class StatisticsModule { }
