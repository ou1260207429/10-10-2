import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component'
import { LawsAndRegulationsComponent } from './laws-and-regulations/laws-and-regulations.component';
import { IndexHeaderComponent } from './index-header/index-header.component';
import { FormDownloadListComponent } from './form-download-list/form-download-list.component';
import { HandlingGuidListComponent } from './handling-guid-list/handling-guid-list.component';
import { AnnouncementInformationComponent } from './announcement-information/announcement-information.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    pathMatch: 'full',
    children:[
      {
        path: 'app/index',
        component: IndexComponent,
    
      },
      {
        path: 'app/laws-and-regulations',
        component: LawsAndRegulationsComponent,
      },
      {
        path: 'app/form-download',
        component: FormDownloadListComponent,
      }, {
        path: 'app/handling-guid',
        component: HandlingGuidListComponent,
      }, {
        path: 'app/announcement-information',
        component: AnnouncementInformationComponent,
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
