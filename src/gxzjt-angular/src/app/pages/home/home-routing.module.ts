import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemHomeComponent } from './system-home/system-home.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { AppMenus } from "@shared/AppMenus";

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    data: { title: '欢迎' }
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    data: { title: '欢迎' }
  },

  {
    path: 'systemHomeComponent',
    component: SystemHomeComponent,
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
