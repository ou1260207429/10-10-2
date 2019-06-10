import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FlowRouteComponent } from './flow-route/flow-route.component';
import { PipesModule } from 'pipes/pipes.module';

@NgModule({
	declarations: [
		FlowRouteComponent
	],
	imports: [
		PipesModule,
		SharedModule
	],
	exports: [
		FlowRouteComponent
	],
	entryComponents: [
		FlowRouteComponent,
	]

})
export class ComponentsModule { }
