import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FlowRouteComponent } from './flow-route/flow-route.component';
import { PipesModule } from 'pipes/pipes.module';
import { CompletedAcceptanceAssemblyComponent } from './completed-acceptance-assembly/completed-acceptance-assembly.component';
import { FireAcceptanceAssemblyComponent } from './fire-acceptance-assembly/fire-acceptance-assembly.component';
import { FireDesignDeclareAssemblyComponent } from './fire-design-declare-assembly/fire-design-declare-assembly.component';
import { FireDesignQualifiedOpinionsComponent } from './fire-design-declare-project/fire-design-qualified-opinions/fire-design-qualified-opinions.component';

@NgModule({
	declarations: [
		FlowRouteComponent,
		CompletedAcceptanceAssemblyComponent,
		FireAcceptanceAssemblyComponent,
		FireDesignDeclareAssemblyComponent,
		FireDesignQualifiedOpinionsComponent
	],
	imports: [
		PipesModule,
		SharedModule
	],
	exports: [
		FlowRouteComponent,
		CompletedAcceptanceAssemblyComponent,
		FireAcceptanceAssemblyComponent,
		FireDesignDeclareAssemblyComponent
	],
	entryComponents: [
		FlowRouteComponent,
		CompletedAcceptanceAssemblyComponent,
		FireAcceptanceAssemblyComponent,
		FireDesignDeclareAssemblyComponent
	]

})
export class ComponentsModule { }
