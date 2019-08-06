import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProjectManageRoutingModule } from './project-manage-routing.module';
import { ProjectManageAddDesignComponent } from './design/add-design/add-design.component';
import { ProjectManageAddAcceptanceComponent } from './add-acceptance/add-acceptance.component';

const COMPONENTS = [
  ProjectManageAddDesignComponent,
  ProjectManageAddAcceptanceComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    ProjectManageRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class ProjectManageModule { }
