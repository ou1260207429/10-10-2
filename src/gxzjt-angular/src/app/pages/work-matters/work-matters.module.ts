import { AgencyDoneDetailsComponent } from './agency-done-details/agency-done-details.component';
import { AlreadyDoneComponent } from './already-done/already-done.component';
import { AgencyDoneComponent } from './agency-done/agency-done.component';
import { FormModuleComponent } from './form-module/form-module.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { WorkMattersRoutingModule } from './work-matters-routing.module';
import { PipesModule } from 'pipes/pipes.module';
import { AlreadyDoneDetailsComponent } from './already-done-details/already-done-details.component';
import { ComponentsModule } from '@app/components/components.module';
import { WorkFlowedServiceProxy } from '../../../shared/service-proxies/service-proxies'

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [FormModuleComponent, AgencyDoneComponent, AgencyDoneDetailsComponent, AlreadyDoneComponent, AlreadyDoneDetailsComponent];

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    PipesModule,
    WorkMattersRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
  ],
  providers: [WorkFlowedServiceProxy],
  entryComponents: COMPONENTS_NOROUNT
})
export class WorkMattersModule { }
