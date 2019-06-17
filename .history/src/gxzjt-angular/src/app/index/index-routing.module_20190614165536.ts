import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component'
import { LawsAndRegulationsComponent } from './laws-and-regulations/laws-and-regulations.component';
import { IndexHeaderComponent } from './index-header/index-header.component';
import { FormDownloadListComponent } from './form-download-list/form-download-list.component';
import { HandlingGuidListComponent } from './handling-guid-list/handling-guid-list.component';
import { AnnouncementInformationComponent } from './announcement-information/announcement-information.component';
import { HandlingGuidListDetailComponent } from './handling-guid-list-detail/handling-guid-list-detail.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
     redirectTo: 'index',
     pathMatch: 'full',
  },
  
  {
    path: 'index',
    component: IndexComponent,
  }, 
  {
    path: 'laws-and-regulations',
    component: LawsAndRegulationsComponent,
  },
  {
    path: 'form-download',
    component: FormDownloadListComponent,
  }, {
    path: 'handling-guid',
    component: HandlingGuidListComponent,
  }, {
    path: 'handling-guid/detail/:type',
     component: HandlingGuidListDetailComponent,
   }, {
    path: 'announcement-information',
    component: AnnouncementInformationComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
