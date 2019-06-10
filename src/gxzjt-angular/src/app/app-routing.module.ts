import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { LayoutDefaultComponent } from '../layout/default/layout-default.component';
import { LayoutFullScreenComponent } from '@layout/fullscreen/fullscreen.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';

const routes: Routes = [
  {
    path: '',
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
  {
    path: 'statistics',
    component: LayoutDefaultComponent,
    canActivate: [AppRouteGuard],
    children: [
      { path: '', loadChildren: './routes/statistics/statistics.module#StatisticsModule', canActivate: [AppRouteGuard], },
    ],

    data: { preload: true },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
