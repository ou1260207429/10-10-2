import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numType'
})
export class NumTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const arr = ['不通过','通过','撤销','转派','待审核'];
    return arr[value];
  }

}
