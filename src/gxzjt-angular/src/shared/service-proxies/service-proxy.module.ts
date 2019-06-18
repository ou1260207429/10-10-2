import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbpHttpInterceptor } from '@abp/abpHttpInterceptor';

import * as ApiServiceProxies from '@shared/service-proxies/service-proxies';

@NgModule({
  providers: [
    ApiServiceProxies.RoleServiceProxy,
    ApiServiceProxies.SessionServiceProxy,
    ApiServiceProxies.LoginServiceProxy,
    ApiServiceProxies.TenantServiceProxy,
    ApiServiceProxies.UserServiceProxy,
    ApiServiceProxies.TokenAuthServiceProxy,
    ApiServiceProxies.AccountServiceProxy,
    ApiServiceProxies.ConfigurationServiceProxy,
    ApiServiceProxies.TenantRegistrationServiceProxy,
    ApiServiceProxies.NoticeServiceProxy,
    ApiServiceProxies.ApplyServiceServiceProxy,
    ApiServiceProxies.RegulationServiceProxy,
    ApiServiceProxies.AttachmentServiceProxy,
    ApiServiceProxies.ProjectFlowServcieServiceProxy,
    ApiServiceProxies.WorkFlowedServiceProxy,
    ApiServiceProxies.HomeServiceProxy,
    ApiServiceProxies.AcceptServiceServiceProxy,
    ApiServiceProxies.StatisticalServiceServiceProxy,
    { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true },
  ],
})
export class ServiceProxyModule { }
