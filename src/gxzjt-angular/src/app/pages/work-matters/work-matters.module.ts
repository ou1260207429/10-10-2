import { FormModuleComponent } from './form-module/form-module.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FlowModuleComponent } from './flow-module/flow-module.component';
import { WorkMattersRoutingModule } from './work-matters-routing.module';
import { PipesModule } from 'pipes/pipes.module';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [
  FlowModuleComponent, FormModuleComponent];

@NgModule({
  imports: [
    SharedModule,
    PipesModule,
    WorkMattersRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class WorkMattersModule { }
