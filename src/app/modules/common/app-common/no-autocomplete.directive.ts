import { Directive, ElementRef, OnInit } from '@angular/core';
declare var $: any;
@Directive({
    selector: '[noAutoComplete]'
})

export class NoAutoCompleteDirective implements OnInit {

    constructor(private el: ElementRef) { }

      ngOnInit() {

        this.el.nativeElement.setAttribute('autocomplete', 'off');
    }
}
