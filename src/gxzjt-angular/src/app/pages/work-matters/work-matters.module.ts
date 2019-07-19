import { AgencyDoneDetailsComponent } from './agency-done-details/agency-done-details.component';
import { AlreadyDoneComponent } from './already-done/already-done.component';
import { AgencyDoneComponent } from './agency-done/agency-done.component';
import { FormModuleComponent } from './form-module/form-module.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { WorkMattersRoutingModule } from './work-matters-routing.module';
import { PipesModule } from 'pipes/pipes.module';
import { AlreadyDoneDetailsComponent } from './already-done-details/already-done-details.component';
import { ComponentsModule } from '@app/components/components.module';
import { DraftsComponent } from './drafts/drafts.component';
import { SearchHadDoneComponent } from './search-had-done/search-had-done';
import { WorkMattersReviewApplyComponent } from './review-apply/review-apply.component';
import { SignForComponent } from './sign-for/sign-for.component';
import { WorkMattersService } from './work-matters.service';
import { WorkMattersAllDoneComponent } from './all-done/all-done.component';

const COMPONENTS = [
  
  WorkMattersAllDoneComponent];
const COMPONENTS_NOROUNT = [
  FormModuleComponent,
  AgencyDoneComponent,
  AgencyDoneDetailsComponent,
  AlreadyDoneComponent,
  AlreadyDoneDetailsComponent,
  DraftsComponent,
  SearchHadDoneComponent,
  WorkMattersReviewApplyComponent,
  SignForComponent,
];

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    PipesModule,
    WorkMattersRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,

  ],
  providers: [WorkMattersService],
  entryComponents: COMPONENTS_NOROUNT
})
export class WorkMattersModule { }
