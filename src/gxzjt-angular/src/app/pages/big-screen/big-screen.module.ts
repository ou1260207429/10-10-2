import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BigScreenRouting } from './big-screen-routing.module';
import { BigScreenComponent } from './big/big-screen.component';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [
    BigScreenComponent];

@NgModule({
    imports: [
        SharedModule,
        BigScreenRouting
    ],
    declarations: [
        ...COMPONENTS,
        ...COMPONENTS_NOROUNT,
    ],
    entryComponents: COMPONENTS_NOROUNT
})
export class BigScreenModule {

}