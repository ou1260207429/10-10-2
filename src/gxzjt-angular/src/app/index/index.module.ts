import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index/index.component';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [
  IndexComponent];

@NgModule({
  imports: [
    SharedModule,
    IndexRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class IndexModule { }
