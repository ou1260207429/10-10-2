import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpotCheckProportionComponent } from './spot-check-proportion/spot-check-proportion.component';
import { SysSettingUnitInfoManageComponent } from './unit-info-manage/unit-info-manage.component';
import { SysSettingLogManageComponent } from './log-manage/log-manage.component';
import { SysSettingLogEditComponent } from './log-edit/log-edit.component';
import { SysSettingUnitInfoEditComponent } from './unit-info-edit/unit-info-edit.component';
const routes: Routes = [
  { path: '', component: SpotCheckProportionComponent, data: { title: '抽查比例设定' } },
  { path: 'spot-check-proportion', component: SpotCheckProportionComponent, data: { title: '抽查比例设定' } },
  { path: 'unit-info-manage', component: SysSettingUnitInfoManageComponent, data: { title: '单位信息管理' } },
  { path: 'log-manage', component: SysSettingLogManageComponent, data: { title: '日志管理' } },
  { path: 'log-edit', component: SysSettingLogEditComponent, data: { title: '操作日志' } },
  { path: 'unit-info-edit', component: SysSettingUnitInfoEditComponent, data: { title: '单位信息编辑' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysSettingRoutingModule { }
