import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpotCheckProportionComponent } from './spot-check-proportion/spot-check-proportion.component';
const routes: Routes = [
  { path: '', component: SpotCheckProportionComponent, data: { title: '抽查比例设定' } },
  { path: 'spot-check-proportion', component: SpotCheckProportionComponent, data: { title: '抽查比例设定' } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysSettingRoutingModule { }
