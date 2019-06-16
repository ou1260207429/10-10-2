import { TenantRegisterComponent } from './tenant-register/tenant-register.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account.component';
import { ForgotPswComponent } from './forgot-psw/forgot-psw.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AccountComponent,

        children: [
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterComponent },
          { path: 'forgot-psw', component: ForgotPswComponent },
          {
            path: 'tenant-register',
            component: TenantRegisterComponent,
          },
          {
            path: '**',
            redirectTo: 'login',
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AccountRoutingModule { }
