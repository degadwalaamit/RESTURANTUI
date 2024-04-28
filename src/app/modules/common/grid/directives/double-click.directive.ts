import { Directive, HostListener, Input } from '@angular/core';
import { AMTGridDataService } from '../services/amt-grid-data-broadcaster.service';

@Directive({
  selector: '[tableRowClicked]'
})
export class DoubleClickDirective {

  @Input() rowLevel: string;
  @Input() firstLevelData: any;
  @Input() secondLevelData: any;
  @Input() thirdLevelData: any;

  constructor(private gridBroadcaster:AMTGridDataService) { }

  @HostListener('dblclick') onDoubleClicked() {
    this.gridBroadcaster.firstLevelRowClickSub.next({
      level: this.rowLevel,
      firstLevel: this.firstLevelData,
      secondLevel: this.secondLevelData,
      thirdLevel: this.thirdLevelData
    });
  }

  @HostListener('click') onClicked() {
    // event for single click
  }

}
