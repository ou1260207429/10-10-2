import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '@app/app-routing.module';
import { LayoutModule } from '@layout/layout.module';
import { SharedModule } from '@shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlowServices } from 'services/flow.services';
import { PoliciesAndRegulationsServices } from 'services/policies-and-regulations.services';

import { EventEmiter } from 'infrastructure/eventEmiter';
import { AuthInterceptor } from 'infrastructure/http-interceptor';
import { ContentManageModule } from './pages/content-manage/content-manage.module';
import { UEditorModule } from 'ngx-ueditor';
import { PublicModel } from 'infrastructure/public-model';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ContentManageModule,
    AppRoutingModule,
    LayoutModule,
    SharedModule,
    
    UEditorModule.forRoot({
      js: [
        `/assets/js/ueditor.config.js`,
        `/assets/js/ueditor.all.min.js`,
      ],
      options: {
        UEDITOR_HOME_URL: `//apps.bdimg.com/libs/ueditor/1.4.3.1/`,
      },
    }),
  ],
  declarations: [],
  entryComponents: [
  ],
  providers: [
    FlowServices,
    PoliciesAndRegulationsServices,
    PublicModel,
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
