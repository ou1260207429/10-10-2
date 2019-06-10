import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard'; 
import { LayoutDefaultComponent } from '../layout/default/layout-default.component';
import { LayoutFullScreenComponent } from '@layout/fullscreen/fullscreen.component';

const routes: Routes = [
  // {
  //   path: 'home',
  //   component: LayoutFullScreenComponent,
  //   data: { title: '首页' },
  //   canActivate: [AppRouteGuard],
  //   children: [
  //     {
  //       path: '',
  //       component: HomeComponent,
  //       canActivate: [AppRouteGuard],
  //     },
  //   ],
  // },
  {
    path: 'home',
    component: LayoutFullScreenComponent,
    data: { title: '首页' },
    children: [
      { path: '', loadChildren: './home/home.module#HomeModule' }
    ],
  },
  {
    path: 'test',
    component: LayoutDefaultComponent,
    canActivate: [AppRouteGuard],
    data: { title: '测试页面' },
    children: [
      { path: '', loadChildren: './pages/test/test.module#TestModule', canActivate: [AppRouteGuard], },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
