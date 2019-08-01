import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgencyDoneDetailsPrintComponent } from './agency-done-details-print/agency-done-details-print.component';
import { FiewDesignDeclarePrintComponent } from './fiew-design-declare-print/fiew-design-declare-print.component';


const routes: Routes = [{
  path: 'AgencyDoneDetailsPrintComponent/:flowNo/:flowId/:flowPathType',
  component: AgencyDoneDetailsPrintComponent,
  data: { title: '', reuse: false },
}, {
  path: 'FiewDesignDeclarePrintComponent',
  component: FiewDesignDeclarePrintComponent,
  data: { title: '消防设计打印', reuse: false },
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintPagesRoutingModule { }
