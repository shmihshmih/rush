import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'hideAnswer'
})
export class HideAnswerPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return value.split('').map(el => '_').join('');
  }
}
