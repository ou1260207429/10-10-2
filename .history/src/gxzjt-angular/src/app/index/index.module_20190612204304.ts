import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index/index.component';
import { HandlingGuidListComponent } from './handling-guid-list/handling-guid-list.component';
import { AnnouncementInformationComponent } from './announcement-information/announcement-information.component';
import { FormDownloadListComponent } from './form-download-list/form-download-list.component';
import { LawsAndRegulationsComponent } from './laws-and-regulations/laws-and-regulations.component';
import { IndexHeaderComponent } from './index-header/index-header.component';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [
  IndexComponent,HandlingGuidListComponent,
  AnnouncementInformationComponent,
  FormDownloadListComponent,
  LawsAndRegulationsComponent,
];

@NgModule({
  imports: [
    SharedModule,
    IndexRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class IndexModule { }
