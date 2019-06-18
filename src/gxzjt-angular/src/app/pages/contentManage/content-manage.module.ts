import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoliciesAndRegulationsComponent } from './policies-and-regulations/policies-and-regulations.component';

import { ContentManageRoutingModule } from './content-manage-routing.module';
const COMPONENTS_NOROUNT = [PoliciesAndRegulationsComponent];

@NgModule({
  imports: [
    CommonModule,
    ContentManageRoutingModule
  ],
  declarations: [...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT
})
export class ContentManageModule { }
