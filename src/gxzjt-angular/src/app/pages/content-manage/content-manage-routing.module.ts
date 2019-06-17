import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoliciesAndRegulationsComponent } from './policies-and-regulations/policies-and-regulations.component';
import { PoliciesAndRegulationsDetailsComponent } from './policies-and-regulations-details/policies-and-regulations-details.component';
import { HandlingGuideComponent } from './handling-guide/handling-guide.component';
import { FormDownloadComponent } from './form-download/form-download.component';
import { HandlingGuidDetailComponent } from './handling-guid-detail/handling-guid-detail.component';
import { FormDownloadDetailComponent } from './form-download-detail/form-download-detail.component';

const routes: Routes = [{
  path: 'policiesAndRegulationsComponent',
  component: PoliciesAndRegulationsComponent,
  data:{ title:"政策法规"}
},{
  path: 'policiesAndRegulationsDetailsComponent/:id',
  component: PoliciesAndRegulationsDetailsComponent,
  data:{ title:"政策法规详情"}
},{
  path: 'handlingGuideComponent',
  component: HandlingGuideComponent,
  data:{ title:"办事指南"}
},{
  path: 'handlingGuidDetailComponent/:id',
  component: HandlingGuidDetailComponent,
  data:{ title:"办事指南详情"}
},{
  path: 'formDownloadComponent',
  component: FormDownloadComponent,
  data:{ title:"表格下载"}
},{
  path: 'formDownloadDetailComponent',
  component: FormDownloadDetailComponent,
  data:{ title:"表格下载详情"}
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentManageRoutingModule { }
