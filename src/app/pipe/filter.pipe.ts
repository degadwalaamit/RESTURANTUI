import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class FilterPipe implements PipeTransform {
  transform(data: any, key: string, value: string): any {
    if(!data || data.length === 0) {
      return [];
    }
    return data.filter(d => {
      return d.value.damageSide == value;
    })

  }
}
