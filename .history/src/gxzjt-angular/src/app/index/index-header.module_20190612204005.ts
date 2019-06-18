import { NgModule } from '@angular/core';
import { IndexHeaderRoutingModule } from './index-header-routing.module';

import { IndexHeaderComponent } from './index-header/index-header.component';
import { IndexModule } from './index.module';


@NgModule({
  imports: [
    v,
    IndexHeaderRoutingModule
  ],
  declarations: [IndexHeaderComponent]
})
export class IndexHeaderModule { }
