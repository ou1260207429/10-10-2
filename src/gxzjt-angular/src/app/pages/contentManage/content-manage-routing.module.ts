import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoliciesAndRegulationsComponent } from './policies-and-regulations/policies-and-regulations.component';

const routes: Routes = [ {
  path: 'policiesAndRegulationsComponent',
  component: PoliciesAndRegulationsComponent,
  data: { title: '法律法规' },
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentManageRoutingModule { }
