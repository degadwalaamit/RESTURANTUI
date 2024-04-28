import { Component, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent implements OnDestroy, AfterViewInit {

  @ViewChild('flatpickrEl', { read: ElementRef, static: false }) flatpickrEl: ElementRef;
  @ViewChild('eInput', { read: ElementRef, static: false }) eInput: ElementRef;
  private date: Date;
  private params: any;
  private picker: any;

  agInit(params: any): void {
    this.params = params;
  }

  ngAfterViewInit(): void {
    this.picker = flatpickr(this.flatpickrEl.nativeElement, {
      onChange: this.onDateChanged.bind(this),
      wrap: true,
      dateFormat: 'd/m/Y'
    });
    this.eInput.nativeElement.setAttribute('placeholder', 'dd/mm/yyyy');
    this.picker.calendarContainer.classList.add('ag-custom-component-popup');
  }

  ngOnDestroy() {
  }

  onDateChanged(selectedDates) {
    this.date = selectedDates[0] || null;
    this.params.onDateChanged();
  }

  getDate(): Date {
    return this.date;
  }

  setDate(date: Date): void {
    this.date = date || null;
    this.picker.setDate(date);
  }

  setInputPlaceholder(placeholder: string): void {
    this.eInput.nativeElement.setAttribute('placeholder', placeholder);
  }

}
