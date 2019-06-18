import { NgModule } from '@angular/core';
import { IndexHeaderRoutingModule } from './index-header-routing.module';

import { IndexHeaderComponent } from './index-header/index-header.component';

@NgModule({
  imports: [
    IndexHeaderRoutingModule
  ],
  declarations: [IndexHeaderComponent]
})
export class IndexHeaderModule { }
