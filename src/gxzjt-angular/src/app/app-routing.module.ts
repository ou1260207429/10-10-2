import { BigScreenComponent } from './pages/big-screen/big/big-screen.component';
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
    component: LayoutFullScreenComponent,
    // canActivate: [AppRouteGuard],
    children: [
      { path: '', loadChildren: './index/index.module#IndexModule' },
    ],
  },
  {
    path: '',
    component: LayoutDefaultComponent,
    data: { title: '统计', preload: true },
    // canActivate: [AppRouteGuard],
    children: [
      { path: 'statistics', loadChildren: './routes/statistics/statistics.module#StatisticsModule', },
      { path: 'sys-setting', loadChildren: './routes/sys-setting/sys-setting.module#SysSettingModule', },
      { path: 'home', loadChildren: './pages/home/home.module#HomeModule' },
      { path: 'work-matters', loadChildren: './pages/work-matters/work-matters.module#WorkMattersModule' },
      { path: 'engineering-management', loadChildren: './pages/engineering-management/engineering-management.module#EngineeringManagementModule' },
      { path: 'content-manage', loadChildren: './pages/content-manage/content-manage.module#ContentManageModule' },

    ],

  },
  {
    path: 'big-screen/big',
    component: BigScreenComponent

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
