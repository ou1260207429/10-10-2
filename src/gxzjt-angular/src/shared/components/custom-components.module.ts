import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDataComponent } from '@shared/components/no-data/no-data.component';
import { ValidationMessagesComponent } from './validation-messages/validation-messages.component';
import { UploadFileComponent } from './tranfile/uploadfile';
import { NgZorroAntdModule } from 'ng-zorro-antd';

const COMPONENTS = [
  NoDataComponent,
  UploadFileComponent,
  ValidationMessagesComponent,

];



@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    ...COMPONENTS
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

/**自定义组件模块 */
export class CustomComponentModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: CustomComponentModule };
  }
}
