
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { EngineeringManagementRoutingModule } from './engineering-management-routing.module';
import { EngineeringListComponent } from './engineering-list/engineering-list.component';
import { CompletedAcceptanceComponent } from './completed-acceptance/completed-acceptance.component';
import { FireAcceptanceComponent } from './fire-acceptance/fire-acceptance.component';
import { AddFireDesignDeclareComponent } from './add-fire-design-declare/add-fire-design-declare.component';
import { AddCompletedAcceptanceComponent } from './add-completed-acceptance/add-completed-acceptance.component';
import { AddFireAcceptanceComponent } from './add-fire-acceptance/add-fire-acceptance.component';
import { ComponentsModule } from '@app/components/components.module';
import { FireDesignComponent } from './fire-design/fire-design.component';
import { EngManageService } from './engineering-management.service';


const COMPONENTS = [];
const COMPONENTS_NOROUNT = [
  CompletedAcceptanceComponent,
  EngineeringListComponent,
  FireAcceptanceComponent,
  FireDesignComponent,
  AddFireDesignDeclareComponent,
  AddCompletedAcceptanceComponent,
  AddFireAcceptanceComponent,
];

/**
 * 工程管理
 */
@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    EngineeringManagementRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,

  ],
  entryComponents: COMPONENTS_NOROUNT,
  providers:[
    EngManageService,
  ]
})

export class EngineeringManagementModule { }
