import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { LayoutDefaultComponent } from '../layout/default/layout-default.component';
import { LayoutFullScreenComponent } from '@layout/fullscreen/fullscreen.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutFullScreenComponent,
    data: { title: '首页' },
    children: [
      { path: '', loadChildren: './index/index.module#IndexModule' }
    ],
  },
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [AppRouteGuard],
    children: [
      { path: 'home', loadChildren: './pages/home/home.module#HomeModule' },
      { path: 'work-matters', loadChildren: './pages/work-matters/work-matters.module#WorkMattersModule' },
      { path: 'work-matters', loadChildren: './pages/work-matters/work-matters.module#WorkMattersModule' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
