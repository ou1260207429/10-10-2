import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FlowRouteComponent } from './flow-route/flow-route.component';
import { PipesModule } from 'pipes/pipes.module';
import { CompletedAcceptanceAssemblyComponent } from './completed-acceptance-assembly/completed-acceptance-assembly.component';
import { FormsModule } from '@angular/forms';

import { FireDesignDeclareAssemblyComponent } from './fire-design-declare-assembly/fire-design-declare-assembly.component';
import { FireDesignDeclareAssemblyHandleComponent } from './fire-design-declare-assembly-handle/fire-design-declare-assembly-handle.component';
import { FireAcceptanceAssemblyComponent } from './fire-acceptance-assembly/fire-acceptance-assembly.component';
import { FireAcceptanceAssemblyHandleComponent } from './fire-acceptance-assembly-handle/fire-acceptance-assembly-handle.component';
import { CompletedAcceptanceAssemblyHandleComponent } from './completed-acceptance-assembly-handle/completed-acceptance-assembly-handle.component';
import { FlowProcessRejectComponent } from './flow-process-reject/flow-process-reject.component';
import { InitiationProcessAddAuditorComponent } from './initiation-process-add-auditor/initiation-process-add-auditor.component';
import { AddPostworkComponent } from './add-postwork/add-postwork.component';
import { EditorModule } from '@tinymce/tinymce-angular';

import { TinyEditorComponent } from './tiny-editor/tiny-editor.component';
@NgModule({
	declarations: [
		FlowRouteComponent,
		CompletedAcceptanceAssemblyComponent,
		FireAcceptanceAssemblyComponent,
		FireDesignDeclareAssemblyComponent,
		FireDesignDeclareAssemblyHandleComponent,
		FireAcceptanceAssemblyHandleComponent,
		CompletedAcceptanceAssemblyHandleComponent, FlowProcessRejectComponent, InitiationProcessAddAuditorComponent, AddPostworkComponent, TinyEditorComponent,
	],
	imports: [
		PipesModule,
		SharedModule,
		EditorModule,
		FormsModule,
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
		InitiationProcessAddAuditorComponent,
		AddPostworkComponent,
		TinyEditorComponent
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
		InitiationProcessAddAuditorComponent,
		AddPostworkComponent,
		TinyEditorComponent
	]

})
export class ComponentsModule { }
