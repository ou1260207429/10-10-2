import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component'
import { LawsAndRegulationsComponent } from './laws-and-regulations/laws-and-regulations.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    pathMatch: 'full',
    children: [
      {
        path: 'index',
        component: LawsAndRegulationsComponent,

      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
