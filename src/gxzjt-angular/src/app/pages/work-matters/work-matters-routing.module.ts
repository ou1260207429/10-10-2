import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormModuleComponent } from './form-module/form-module.component';
import { AgencyDoneComponent } from './agency-done/agency-done.component';
import { AlreadyDoneComponent } from './already-done/already-done.component';
import { AlreadyDoneDetailsComponent } from './already-done-details/already-done-details.component';
import { AgencyDoneDetailsComponent } from './agency-done-details/agency-done-details.component';
import { DraftsComponent } from './drafts/drafts.component';

const routes: Routes = [
  {
    path: 'formModuleComponent',
    component: FormModuleComponent
  },
  {
    path: 'alreadyDoneComponent',
    component: AlreadyDoneComponent,
    data: { title: '已办流程' },
  },
  {
    path: 'alreadyDoneDetailsComponent/:workFlow_Instance_Id',
    component: AlreadyDoneDetailsComponent,
    data: { title: '已办流程详情' },
  },
  {
    path: 'agencyDoneComponent',
    component: AgencyDoneComponent,
    data: { title: '待办流程' },
  },
  {
    path: 'agencyDoneDetailsComponent/:workFlow_Instance_Id',
    component: AgencyDoneDetailsComponent,
    data: { title: '待办流程详情' },
  },

  {
    path: 'draftsComponent',
    component: DraftsComponent,
    data: { title: '草稿箱' },
  },


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkMattersRoutingModule { }
