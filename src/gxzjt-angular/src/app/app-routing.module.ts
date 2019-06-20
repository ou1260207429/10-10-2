import { BigScreenComponent } from './pages/big-screen/big/big-screen.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { LayoutDefaultComponent } from '../layout/default/layout-default.component';
import { LayoutFullScreenComponent } from '@layout/fullscreen/fullscreen.component';
import { IndexDefaultComponent } from '@layout/index-default/index-default.component';

import { ACLGuard, ACLType } from '@delon/acl';

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

      {
        path: '', loadChildren: './pages/home/home.module#HomeModule',

      },
    ],
  },
  {
    path: '',
    component: LayoutDefaultComponent,
    data: { title: '统计', preload: true },
    canActivate: [AppRouteGuard],
    children: [
      {
        path: 'statistics', loadChildren: './routes/statistics/statistics.module#StatisticsModule',
     
      },
      {
        path: 'sys-setting', loadChildren: './routes/sys-setting/sys-setting.module#SysSettingModule',
     
      },
      {
        path: 'permission', loadChildren: './routes/permission/permission.module#PermissionModule',
       
      },
      {
        path: 'home', loadChildren: './pages/home/home.module#HomeModule',
   
      },
      {
        path: 'work-matters', loadChildren: './pages/work-matters/work-matters.module#WorkMattersModule',
      
      },
      {
        path: 'engineering-management',
        loadChildren: './pages/engineering-management/engineering-management.module#EngineeringManagementModule',
  
      },
      {
        path: 'content-manage', loadChildren: './pages/content-manage/content-manage.module#ContentManageModule', 
        
      },
      {
        path: 'user-center', loadChildren: './routes/user-center/user-center.module#UserCenterModule', 
        
      },

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
