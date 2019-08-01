import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FiewDesignDeclarePrintComponent } from './fiew-design-declare-print/fiew-design-declare-print.component';


const routes: Routes = [{
  path: 'FiewDesignDeclarePrintComponent',
  component: FiewDesignDeclarePrintComponent,
  data: { title: '消防设计打印', reuse: false },
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintPagesRoutingModule { }
