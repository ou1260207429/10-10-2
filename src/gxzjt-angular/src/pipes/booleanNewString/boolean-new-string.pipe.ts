import { Pipe, PipeTransform } from '@angular/core';

/**
 * 布尔转string   值
 */
@Pipe({
  name: 'booleanNewString'
})
export class BooleanNewStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value)
    return value;
  }

}
