import { GridConfiguration } from '../Configuration/grid-configuration.model';
import {Pipe,PipeTransform} from '@angular/core';

@Pipe ({
  name: 'CurrencyConverter'
})

export class CurrencyConverterPipe implements PipeTransform {
  transform(value: number): string {
     if(value==null)
      value=0.00;
    return new GridConfiguration().currencyType+" "+value;
  }
}
