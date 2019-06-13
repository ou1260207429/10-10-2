import { NgModule } from '@angular/core';
import { ContentManageRoutingModule } from './content-manage-routing.module';
import { PoliciesAndRegulationsComponent } from './policies-and-regulations/policies-and-regulations.component';
import { HandlingGuideComponent } from './handling-guide/handling-guide.component';
import { FormDownloadComponent } from './form-download/form-download.component';
import { ComponentsModule } from '@app/components/components.module';
import { PipesModule } from 'pipes/pipes.module';
import { SharedModule } from '@shared/shared.module';
import { PoliciesAndRegulationsDetailsComponent } from './policies-and-regulations-details/policies-and-regulations-details.component';
import { UEditorModule } from 'ngx-ueditor';
import { HandlingGuidDetailComponent } from './handling-guid-detail/handling-guid-detail.component';
import { FormDownloadDetailComponent } from './form-download-detail/form-download-detail.component';



const COMPONENTS = [];
const COMPONENTS_NOROUNT = [PoliciesAndRegulationsComponent, HandlingGuideComponent];

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    PipesModule,
    ContentManageRoutingModule,
    UEditorModule
  ],
  declarations: [...COMPONENTS,...COMPONENTS_NOROUNT, FormDownloadComponent, PoliciesAndRegulationsDetailsComponent, HandlingGuidDetailComponent, FormDownloadDetailComponent],
  entryComponents: COMPONENTS_NOROUNT
})
export class ContentManageModule { }
