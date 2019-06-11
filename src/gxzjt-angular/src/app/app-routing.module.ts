import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { LayoutDefaultComponent } from '../layout/default/layout-default.component';
import { LayoutFullScreenComponent } from '@layout/fullscreen/fullscreen.component';


const routes: Routes = [
  // {
  //   path: '',
  //   component: LayoutFullScreenComponent,
  //   data: { title: '首页' },
  //   children: [
  //     { path: '', loadChildren: './home/home.module#HomeModule' }
  //   ],
  // },
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [AppRouteGuard],
    children: [
      { path: 'test', loadChildren: './pages/test/test.module#TestModule' },
      { path: 'formModuleComponent', loadChildren: './pages/work-matters/form-module/form-module.module#FormModuleModule' },
    ],
  },
  {
    path: '',
    component: LayoutDefaultComponent,
    data: { title: '统计', preload: true },
    // canActivate: [AppRouteGuard],
    children: [
      { path: 'statistics', loadChildren: './routes/statistics/statistics.module#StatisticsModule', },
    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
