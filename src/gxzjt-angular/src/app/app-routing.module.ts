import { BigScreenComponent } from './pages/big-screen/big/big-screen.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { LayoutDefaultComponent } from '../layout/default/layout-default.component';
// import { LayoutFullScreenComponent } from '@layout/fullscreen/fullscreen.component';
// import { IndexDefaultComponent } from '@layout/index-default/index-default.component';

// import { ACLGuard, ACLType } from '@delon/acl';

import { AppMenus } from "@shared/AppMenus";


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
    canActivateChild: [AppRouteGuard],
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
    canActivateChild: [AppRouteGuard],
    children: [
      {
        path: 'statistics', loadChildren: './routes/statistics/statistics.module#StatisticsModule',
        data: {
          role: AppMenus.aclSys
        },

      },
      {
        path: 'sys-setting', loadChildren: './routes/sys-setting/sys-setting.module#SysSettingModule',
        data: {
          role: AppMenus.aclSys
        },

      },
      {
        path: 'permission', loadChildren: './routes/permission/permission.module#PermissionModule',
        data: {
          role: AppMenus.aclSys
        },

      },
      {
        path: 'home', loadChildren: './pages/home/home.module#HomeModule',
        data: {
          role: AppMenus.aclSys
        },

      },
      {
        path: 'work-matters', loadChildren: './pages/work-matters/work-matters.module#WorkMattersModule',
        data: {
          role: AppMenus.aclCompany
        },

      },
      {
        path: 'engineering-management',
        loadChildren: './pages/engineering-management/engineering-management.module#EngineeringManagementModule',
        data: {
          role: AppMenus.aclCompany
        },

      },
      {
        path: 'content-manage', loadChildren: './pages/content-manage/content-manage.module#ContentManageModule',
        data: {
          role: AppMenus.aclSys
        },

      },
      {
        path: 'user-center', loadChildren: './routes/user-center/user-center.module#UserCenterModule',

      },
      {
        path: 'userright', loadChildren: './routes/userright/userright.module#UserrightModule',

      },

    ],
  },
  {
    path: 'big-screen/big',
    canActivateChild: [AppRouteGuard],
    component: BigScreenComponent,
    data: {
      role: AppMenus.aclSys
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
