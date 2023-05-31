import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/core/models';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: Student, ...args: unknown[]): unknown {
    return `${value.name} ${value.surname}`;
  }

}
