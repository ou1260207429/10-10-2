import { NgModule } from '@angular/core';


import { PrintPagesRoutingModule } from './print-pages-routing.module';
import { ComponentsModule } from '@app/components/components.module';
import { SharedModule } from '@shared/shared.module';
import { WorkMattersService } from './work-matters.service';
import { FiewDesignDeclarePrintComponent } from './fiew-design-declare-print/fiew-design-declare-print.component';
import { PipesModule } from 'pipes/pipes.module';
import { DelonCacheModule } from '@delon/cache';
import { AcceptanceManagementPrintComponent } from './acceptance-management-print/acceptance-management-print.component';

const COMPONENTS_NOROUNT = [
  FiewDesignDeclarePrintComponent
];
@NgModule({
  imports: [
    DelonCacheModule,
    SharedModule,
    ComponentsModule,
    PipesModule,
    PrintPagesRoutingModule,
  ],
  providers: [WorkMattersService],
  declarations: [...COMPONENTS_NOROUNT, AcceptanceManagementPrintComponent],
  // entryComponents: COMPONENTS_NOROUNT
})
export class PrintPagesModule { }
