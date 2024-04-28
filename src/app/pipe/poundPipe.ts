import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'poundPipe' })
export class PoundPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null) {
      value = 0.00;
    }
    return '£ ' + value;
  }
}