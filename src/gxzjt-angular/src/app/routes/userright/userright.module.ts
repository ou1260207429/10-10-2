import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UserrightRoutingModule } from './userright-routing.module';
import { UserrightUserlistComponent } from './userlist/userlist.component';
import { UserrightRolelistComponent } from './rolelist/rolelist.component';
import { UserrightPostworkComponent } from './postwork/postwork.component';

const COMPONENTS = [
  UserrightUserlistComponent,
  UserrightRolelistComponent,
  UserrightPostworkComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    UserrightRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class UserrightModule { }
