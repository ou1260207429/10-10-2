import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemHomeComponent } from './system-home/system-home.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { AppMenus } from "@shared/AppMenus";
import { AppRouteGuard } from '@shared/auth/auth-route-guard';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    data: { title: '欢迎', reuseClosable: false }
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    data: { title: '欢迎', reuseClosable: false }
  },

  {
    path: 'systemHomeComponent',
    component: SystemHomeComponent,
    canActivateChild: [AppRouteGuard],
    data: {
      title: '首页',
      role: [AppMenus.aclSys]
    }

  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
