import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(value: string[], ...args: unknown[]): unknown {
    return value.toString().length > 15 ? `${value.toString().slice(0, 15)}...` : value;
  }

}
