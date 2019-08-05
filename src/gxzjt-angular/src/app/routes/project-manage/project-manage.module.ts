import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProjectManageRoutingModule } from './project-manage-routing.module';
import { ProjectManageAddDesignComponent } from './add-design/add-design.component';

const COMPONENTS = [
  ProjectManageAddDesignComponent];
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
