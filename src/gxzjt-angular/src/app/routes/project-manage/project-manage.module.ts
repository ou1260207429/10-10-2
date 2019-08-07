import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProjectManageRoutingModule } from './project-manage-routing.module';
import { ProjectManageAddDesignComponent } from './design/add-design/add-design.component';
import { ProjectManageAddAcceptanceComponent } from './acceptance/add-acceptance/add-acceptance.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ComponentsModule } from '@app/components/components.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


const COMPONENTS = [
  ProjectManageAddDesignComponent,
  ProjectManageAddAcceptanceComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ComponentsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    ProjectManageRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class ProjectManageModule { }
