import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FlowRouteComponent } from './flow-route/flow-route.component';
import { PipesModule } from 'pipes/pipes.module';
import { CompletedAcceptanceAssemblyComponent } from './completed-acceptance-assembly/completed-acceptance-assembly.component';

import { FireDesignDeclareAssemblyComponent } from './fire-design-declare-assembly/fire-design-declare-assembly.component';
import { FireDesignDeclareAssemblyHandleComponent } from './fire-design-declare-assembly-handle/fire-design-declare-assembly-handle.component';

@NgModule({
	declarations: [
		FlowRouteComponent,
		CompletedAcceptanceAssemblyComponent,
		FireDesignDeclareAssemblyComponent,
		FireDesignDeclareAssemblyHandleComponent,
	],
	imports: [
		PipesModule,
		SharedModule
	],
	exports: [
		FlowRouteComponent,
		CompletedAcceptanceAssemblyComponent,
		FireDesignDeclareAssemblyComponent,
		FireDesignDeclareAssemblyHandleComponent,
	],
	entryComponents: [
		FlowRouteComponent,
		CompletedAcceptanceAssemblyComponent,
		FireDesignDeclareAssemblyComponent,
		FireDesignDeclareAssemblyHandleComponent,
	]

})
export class ComponentsModule { }
