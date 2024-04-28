import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-no-data-found',
  templateUrl: './no-data-found.component.html'
})
export class NoDataFoundComponent implements OnChanges {

  @Input() model;
  isShow = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['model']) {
      this.model = changes['model'].currentValue;
      this.isDataFound();
    } else {
      this.model = {};
      this.isDataFound();
    }
  }

  isDataFound() {
    if (this.model != null || this.model !== undefined) {
      if (this.model.length === 0) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    }
  }

}
