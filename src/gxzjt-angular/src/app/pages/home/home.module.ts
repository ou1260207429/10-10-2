import { NgxEchartsModule } from 'ngx-echarts';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SystemHomeComponent } from './system-home/system-home.component'; 
import { WelcomeComponent } from './welcome/welcome.component'; 

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [
  SystemHomeComponent,
  WelcomeComponent];

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule,
    NgxEchartsModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT, 
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class HomeModule { }
