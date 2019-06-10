import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { FormModuleRoutingModule } from './form-module-routing.module';
import { FormModuleComponent } from './form-module.component';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [
  FormModuleComponent];

@NgModule({
  imports: [
    SharedModule,
    FormModuleRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class FormModuleModule { }
