import { BigScreenRouting } from './big-screen-routing.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { NgxEchartsModule } from "ngx-echarts";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        NgxEchartsModule,
        BigScreenRouting
    ],
    exports: [

    ],
    declarations: [
    ],
    entryComponents: [
    ]
})

export class BigScreenModule {

}