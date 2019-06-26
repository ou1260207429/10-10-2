import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDataComponent } from '@shared/components/no-data/no-data.component';
import { ValidationMessagesComponent } from './validation-messages/validation-messages.component';
import { UploadFileComponent } from './tranfile/uploadfile';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SelectorOrgComponent } from './selector/selector-org';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';



const COMPONENTS = [
  NoDataComponent,
  UploadFileComponent,
  ValidationMessagesComponent,
  SelectorOrgComponent,

];



@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,

    ReactiveFormsModule,
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})

/**自定义组件模块 */
export class CustomComponentModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: CustomComponentModule };
  }
}
