import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
    selector: '[validateDiscount]'
})

export class HandleEuroPercentageSelection {
    @Input('validateDiscount') isEuroSelected: any;

    constructor(private el: ElementRef, private render: Renderer2) {
        render.listen(el.nativeElement, 'keypress', (event) => {
            if (this.isEuroSelected == "no") {
                if (this.el.nativeElement.value < 10) {
                    return (event.charCode === 8 || event.charCode === 0) ? null : (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46;
                }
                else if (this.el.nativeElement.value == 10 && event.charCode == 48) {
                    return (event.charCode === 8 || event.charCode === 0) ? null : (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46;
                }
                else {
                    if (el.nativeElement.value < 100 && (el.nativeElement.value.indexOf('.') !== -1 || event.charCode == 46)) {
                        if (el.nativeElement.value.indexOf('.') !== -1 && el.nativeElement.value.indexOf('.') < el.nativeElement.value.length - 2) {
                            return false;
                        }

                        if (el.nativeElement.value.indexOf('.') !== -1 && event.charCode == 46) {
                            return false;
                        }
                        else {
                            return (event.charCode === 8 || event.charCode === 0) ? null : (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46;
                        }

                    }
                    return false;
                }
            }
        })
    }
}