import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FlowRouteComponent } from './flow-route/flow-route.component';
import { PipesModule } from 'pipes/pipes.module';
import { CompletedAcceptanceAssemblyComponent } from './completed-acceptance-assembly/completed-acceptance-assembly.component';

import { FireDesignDeclareAssemblyComponent } from './fire-design-declare-assembly/fire-design-declare-assembly.component';
import { FireDesignDeclareAssemblyHandleComponent } from './fire-design-declare-assembly-handle/fire-design-declare-assembly-handle.component';
import { FireAcceptanceAssemblyComponent } from './fire-acceptance-assembly/fire-acceptance-assembly.component';
import { FireAcceptanceAssemblyHandleComponent } from './fire-acceptance-assembly-handle/fire-acceptance-assembly-handle.component';
import { CompletedAcceptanceAssemblyHandleComponent } from './completed-acceptance-assembly-handle/completed-acceptance-assembly-handle.component';
import { FlowProcessRejectComponent } from './flow-process-reject/flow-process-reject.component';

@NgModule({
	declarations: [
		FlowRouteComponent,
		CompletedAcceptanceAssemblyComponent,
		FireAcceptanceAssemblyComponent,
		FireDesignDeclareAssemblyComponent,
		FireDesignDeclareAssemblyHandleComponent, 
		FireAcceptanceAssemblyHandleComponent, 
		CompletedAcceptanceAssemblyHandleComponent, FlowProcessRejectComponent,
	],
	imports: [
		PipesModule,
		SharedModule
	],
	exports: [
		FlowRouteComponent,
		CompletedAcceptanceAssemblyComponent,
		FireAcceptanceAssemblyComponent,
		FireDesignDeclareAssemblyComponent,
		FireDesignDeclareAssemblyHandleComponent,
		FireAcceptanceAssemblyHandleComponent, 
		CompletedAcceptanceAssemblyHandleComponent,
		FlowProcessRejectComponent,
	],
	entryComponents: [
		FlowRouteComponent,
		CompletedAcceptanceAssemblyComponent,
		FireAcceptanceAssemblyComponent,
		FireDesignDeclareAssemblyComponent,
		FireDesignDeclareAssemblyHandleComponent,
		FireAcceptanceAssemblyHandleComponent, 
		CompletedAcceptanceAssemblyHandleComponent,
		FlowProcessRejectComponent,
	]

})
export class ComponentsModule { }
