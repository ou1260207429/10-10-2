import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PermissionRoutingModule } from './permission-routing.module';
import { OrgManagerComponent } from './org-manager/org-manager.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { RoleManagerComponent } from './role-manager/role-manager.component';

const COMPONENTS = [
  OrgManagerComponent,
  UserManagerComponent,
  RoleManagerComponent
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    PermissionRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class PermissionModule { }
