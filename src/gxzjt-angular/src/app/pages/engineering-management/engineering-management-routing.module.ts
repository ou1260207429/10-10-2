import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompletedAcceptanceComponent } from './completed-acceptance/completed-acceptance.component';
import { EngineeringListComponent } from './engineering-list/engineering-list.component';
import { FireAcceptanceComponent } from './fire-acceptance/fire-acceptance.component';
import { AddFireDesignDeclareComponent } from './add-fire-design-declare/add-fire-design-declare.component';
import { AddFireAcceptanceComponent } from './add-fire-acceptance/add-fire-acceptance.component';
import { AddCompletedAcceptanceComponent } from './add-completed-acceptance/add-completed-acceptance.component';
import { FireDesignComponent } from './fire-design/fire-design.component';

const routes: Routes = [
  {
    path: 'completedAcceptanceComponent',
    component: CompletedAcceptanceComponent
  },

  {
    path: 'engineeringListComponent',
    component: EngineeringListComponent
  },

  {
    path: 'fireAcceptanceComponent',
    component: FireAcceptanceComponent
  },
  {
    path: 'fireDesignComponent',
    component: FireDesignComponent
  },

  {
    path: 'addFireDesignDeclareComponent/:type/:projectId',
    data: { title: '新增申报' },
    component: AddFireDesignDeclareComponent
  },

  {
    path: 'addCompletedAcceptanceComponent/:type/:projectId',
    data: { title: '新增申报' },
    component: AddCompletedAcceptanceComponent
  },

  {
    path: 'addFireAcceptanceComponent/:type/:projectId',
    data: { title: '新增申报' },
    component: AddFireAcceptanceComponent
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngineeringManagementRoutingModule { }
