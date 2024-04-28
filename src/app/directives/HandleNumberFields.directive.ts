import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
    selector: '[handleNumberFields]'
})

export class HandleNumberFields {
    @Input('handleNumberFields') fieldSize: any;

    constructor(private elHNF: ElementRef, private render: Renderer2) {
        var len = 15;
        render.listen(elHNF.nativeElement, 'keypress', (event) => {
            if (this.fieldSize) {
                len = Number(this.fieldSize);
            }
            if (elHNF.nativeElement.value.length >= len) {
                return false;
            }

            return (event.charCode === 8 || event.charCode === 0) ? null : (event.charCode >= 48 && event.charCode <= 57);
        })

        render.listen(elHNF.nativeElement, 'paste', (event) => {
            if (elHNF.nativeElement.value.length > len) {
                elHNF.nativeElement.value = 0;
            }
            return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
        })
    }
}