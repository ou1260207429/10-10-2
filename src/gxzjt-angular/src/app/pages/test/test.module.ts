import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TestRoutingModule } from './home-routing.module';
import { TestComponent } from './test.component';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [
  TestComponent];

@NgModule({
  imports: [
    SharedModule,
    TestRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class TestModule { }
