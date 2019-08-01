import { Pipe, PipeTransform } from '@angular/core';
import { timeTrans } from 'infrastructure/regular-expression';

/**
 * 根据后台的时间转换成对应的时间
 */
@Pipe({
  name: 'timeNewString'
})
export class TimeNewStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return timeTrans(value);
  }

}
