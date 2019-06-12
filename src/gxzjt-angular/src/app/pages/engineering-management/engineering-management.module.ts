
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { EngineeringManagementRoutingModule } from './engineering-management-routing.module';
import { EngineeringListComponent } from './engineering-list/engineering-list.component';
import { CompletedAcceptanceComponent } from './completed-acceptance/completed-acceptance.component';
import { FireAcceptanceComponent } from './fire-acceptance/fire-acceptance.component';
import { FireDesignComponent } from './fire-design/fire-design.component';
import { AddFireDesignDeclareComponent } from './add-fire-design-declare/add-fire-design-declare.component';


const COMPONENTS = [];
const COMPONENTS_NOROUNT = [
  CompletedAcceptanceComponent, EngineeringListComponent, FireAcceptanceComponent, FireDesignComponent, AddFireDesignDeclareComponent];

/**
 * 工程管理
 */
@NgModule({
  imports: [
    SharedModule,
    EngineeringManagementRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
  ],
  entryComponents: COMPONENTS_NOROUNT
})

export class EngineeringManagementModule { }