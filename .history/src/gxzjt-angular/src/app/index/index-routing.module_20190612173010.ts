import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component'
import { LawsAndRegulationsComponent } from './laws-and-regulations/laws-and-regulations.component';
import { IndexHeaderComponent } from './index-header/index-header.component';


const routes: Routes = [
  {
    path: '',
    component: IndexHeaderComponent,
    pathMatch: 'full',
    children: [
      {
        path: 'index',
        component: IndexComponent,

      },
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
