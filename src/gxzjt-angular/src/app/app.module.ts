import { NgxEchartsModule } from 'ngx-echarts';
import { BigScreenComponent } from './pages/big-screen/big/big-screen.component';
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
import { PublicServices } from 'services/public.services';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';

import { DelonACLModule } from '@delon/acl';
import { UserServices } from 'services/user.services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ContentManageModule,
    ServiceProxyModule,
    AppRoutingModule,
    LayoutModule,
    SharedModule,
    NgxEchartsModule,
    DelonACLModule.forRoot(),
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
  declarations: [
    BigScreenComponent
  ],
  entryComponents: [
  ],
  providers: [
    FlowServices,
    PoliciesAndRegulationsServices,
    PublicModel,
    EventEmiter,
    PublicServices,
    UserServices,
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
