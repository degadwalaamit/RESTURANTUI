import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[handlePercentageField]'
})

export class HandlePercentageField {

    constructor(private elHPF: ElementRef, private render: Renderer2) {
        render.listen(elHPF.nativeElement, 'keypress', (event) => {
            if (elHPF.nativeElement.value.substring(elHPF.nativeElement.selectionStart, elHPF.nativeElement.selectionEnd) == ".") {
                return false;
            }
            if (this.elHPF.nativeElement.value < 10) {
                return this.checkEventCode(event);
            } else if (this.elHPF.nativeElement.value == 10 && event.charCode == 48) {
                return this.checkEventCode(event);
            } else {
                if (elHPF.nativeElement.value < 100 && (elHPF.nativeElement.value.indexOf('.') !== -1 || event.charCode == 46)) {
                    if (elHPF.nativeElement.value.indexOf('.') !== -1
                        && elHPF.nativeElement.value.indexOf('.') < elHPF.nativeElement.value.length - 2) {
                        if (elHPF.nativeElement.selectionStart != elHPF.nativeElement.selectionEnd) {
                            return this.checkEventCode(event);
                        }
                        return false;
                    }
                    if (elHPF.nativeElement.value.indexOf('.') !== -1
                        && elHPF.nativeElement.value.indexOf('.') <= elHPF.nativeElement.value.length - 1
                        && elHPF.nativeElement.selectionStart <= elHPF.nativeElement.value.indexOf('.')) {
                        if (elHPF.nativeElement.selectionStart != elHPF.nativeElement.selectionEnd) {
                            return this.checkEventCode(event);
                        }
                        return false;
                    }

                    if (elHPF.nativeElement.value.indexOf('.') !== -1 && event.charCode == 46) {
                        if (elHPF.nativeElement.selectionStart != elHPF.nativeElement.selectionEnd) {
                            return this.checkEventCode(event);
                        }
                        return false;
                    } else {
                        return this.checkEventCode(event);
                    }

                }
                if (elHPF.nativeElement.selectionStart != elHPF.nativeElement.selectionEnd) {
                    return this.checkEventCode(event);
                }
                return false;
            }
        });

        render.listen(elHPF.nativeElement, 'keydown', (event) => {

            if ((event.keyCode == 8
                && elHPF.nativeElement.value.indexOf('.') == elHPF.nativeElement.selectionStart - 1
                || event.keyCode == 46 && elHPF.nativeElement.value.indexOf('.') == elHPF.nativeElement.selectionStart)
                && elHPF.nativeElement.value.length - 1 != elHPF.nativeElement.value.indexOf('.')) {
                return false;
            }
        });
    }

    checkEventCode(event) {
        return ((event.charCode === 8 || event.charCode === 0) ? null
            : (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46);
    }
}
