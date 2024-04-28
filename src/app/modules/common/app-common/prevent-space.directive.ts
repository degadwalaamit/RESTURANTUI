import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[preventspace]'
})

export class PreventSpaceDirective {
    constructor(private el: ElementRef) { }

    @HostListener('focusout', ['$event.target.value']) onfocusout() {
        this.el.nativeElement.value = this.el.nativeElement.value.trim();
    }
}
