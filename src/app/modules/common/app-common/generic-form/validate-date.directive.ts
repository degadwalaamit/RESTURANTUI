import { Directive, ElementRef, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Directive({
    selector: '[validateDate]'
})

export class ValidateDateDirective implements OnInit,OnChanges {
  @Input() isDisabled:boolean=false;
  constructor(private el: ElementRef) { }
    ngOnInit() {
    this.el.nativeElement.setAttribute('readonly', 'readonly');
    this.el.nativeElement.className+= ' readonly-bg-white';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes){
      /*
      previousValue: any;
      currentValue: any;
      firstChange: boolean;
      */
      let siblingElement = this.el.nativeElement['nextSibling'];
      if(!isNullOrUndefined(siblingElement)){
        siblingElement.style.display= changes.isDisabled.currentValue ? 'none' : 'block';
      }
    }
  }
}
