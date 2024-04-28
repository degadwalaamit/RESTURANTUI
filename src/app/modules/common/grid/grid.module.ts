import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { CurrencyConverterPipe } from './pipes/currency.pipe';
import { DateChangerPipe } from './pipes/date.pipe';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TagInputModule } from 'ngx-chips';
import { TranslateModule } from '@ngx-translate/core';
import { DoubleClickDirective } from './directives/double-click.directive';
import { MouseHoverDirective } from './directives/mouse-hover.directive';

@NgModule({
  declarations: [
    GridComponent,
    CurrencyConverterPipe,
    DateChangerPipe,
    DoubleClickDirective,
    MouseHoverDirective,
  ],
  imports: [
    TagInputModule,
    CommonModule,
    TranslateModule,
    FormsModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [
    GridComponent,
  ]
})
export class GridModule { }
