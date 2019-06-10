import { NgModule } from '@angular/core';
import { BooleanNewStringPipe } from './booleanNewString/boolean-new-string.pipe';
import { TimeNewStringPipe } from './timeNewString/time-new-string.pipe';
import { NumTypePipe } from './numType/num-type.pipe';
@NgModule({
	declarations: [BooleanNewStringPipe, TimeNewStringPipe, NumTypePipe,],
	imports: [],
	exports: [BooleanNewStringPipe,TimeNewStringPipe,NumTypePipe]
})
export class PipesModule {}
