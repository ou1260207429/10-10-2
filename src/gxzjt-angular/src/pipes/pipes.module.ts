import { NgModule } from '@angular/core';
import { TimeNewStringPipe } from './timeNewString/time-new-string.pipe';
import { NumTypePipe } from './numType/num-type.pipe';
@NgModule({
	declarations: [TimeNewStringPipe, NumTypePipe,],
	imports: [],
	exports: [TimeNewStringPipe, NumTypePipe]
})
export class PipesModule { }
