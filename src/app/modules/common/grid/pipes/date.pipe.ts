import { GridConfiguration } from '../Configuration/grid-configuration.model';
import {Pipe,PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe ({
  name: 'DateChanger'
})

export class DateChangerPipe implements PipeTransform {
  transform(value: string): string {
    let date = new Date(value);
   return moment(date).format(new GridConfiguration().dateFormat);
  }
}
