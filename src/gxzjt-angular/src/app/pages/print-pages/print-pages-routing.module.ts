import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FiewDesignDeclarePrintComponent } from './fiew-design-declare-print/fiew-design-declare-print.component';
import { AcceptanceManagementPrintComponent } from './acceptance-management-print/acceptance-management-print.component';
import { CompletedAcceptancePrintComponent } from './completed-acceptance-print/completed-acceptance-print.component';


const routes: Routes = [{
  path: 'FiewDesignDeclarePrintComponent',
  component: FiewDesignDeclarePrintComponent,
  data: { title: '消防设计打印', reuse: false },
}, {
  path: 'AcceptanceManagementPrintComponent',
  component: AcceptanceManagementPrintComponent,
  data: { title: '消防验收打印', reuse: false },
}, {
  path: 'CompletedAcceptancePrintComponent',
  component: CompletedAcceptancePrintComponent,
  data: { title: '竣工验收打印', reuse: false },
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintPagesRoutingModule { }
