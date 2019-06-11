import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '@app/app-routing.module';
import { LayoutModule } from '@layout/layout.module';
import { SharedModule } from '@shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlowServices } from 'services/flow.services';
import { EventEmiter } from 'infrastructure/eventEmiter';
import { AuthInterceptor } from 'infrastructure/http-interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    SharedModule,
  ],
  declarations: [],
  entryComponents: [
  ],
  providers: [
    FlowServices,
    EventEmiter,
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ],
  ],
  // providers: [LocalizationService, MenuService],
})
export class AppModule { }
