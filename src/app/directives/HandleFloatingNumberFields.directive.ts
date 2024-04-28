import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
    selector: '[handleFloatingNumberFields]'
})

export class HandleFloatingNumberFields {
    @Input() numberOfDecimal: any = 2;
    @Input('handleFloatingNumberFields') fieldSize: any;

    isDoubleClick = false;

    constructor(private elHFNF: ElementRef, private renderHFNF: Renderer2) {

        let len = 15;
        renderHFNF.listen(elHFNF.nativeElement, 'keypress', (event) => {

            if (elHFNF.nativeElement.value.substring(elHFNF.nativeElement.selectionStart, elHFNF.nativeElement.selectionEnd) == ".") {
                return false;
            }
            if (elHFNF.nativeElement.selectionStart <= elHFNF.nativeElement.value.indexOf('.') && elHFNF.nativeElement.value.length < len) {
                return (event.charCode === 8 || event.charCode === 0) ? null : (event.charCode >= 48 && event.charCode <= 57)
            }
            if (this.fieldSize) {
                len = Number(this.fieldSize);
            }

            if (elHFNF.nativeElement.value.length >= len) {
                if (elHFNF.nativeElement.value.length == len && elHFNF.nativeElement.selectionStart != elHFNF.nativeElement.selectionEnd) {
                    return this.checkEventCode(event);
                }
                return false;
            }

            if (elHFNF.nativeElement.value.indexOf('.') !== -1
                && elHFNF.nativeElement.value.indexOf('.') < elHFNF.nativeElement.value.length - 2) {
                if (elHFNF.nativeElement.selectionStart != elHFNF.nativeElement.selectionEnd) {
                    return this.checkEventCode(event);
                }
                return false;
            }

            if (elHFNF.nativeElement.value.indexOf('.') !== -1 && event.charCode == 46) {
                if (elHFNF.nativeElement.selectionStart != elHFNF.nativeElement.selectionEnd) {
                    return this.checkEventCode(event);
                }
                return false;
            } else {
                if (elHFNF.nativeElement.selectionStart != elHFNF.nativeElement.selectionEnd) {
                    return this.checkEventCode(event);
                }
                return this.checkEventCode(event);
            }
        });

        renderHFNF.listen(elHFNF.nativeElement, 'paste', (event) => {

            if (elHFNF.nativeElement.value.length > len) {
                elHFNF.nativeElement.value = 0;
            }
            return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
        });

        renderHFNF.listen(elHFNF.nativeElement, 'mouseleave', (event) => {

            if (elHFNF.nativeElement.value != undefined
                && elHFNF.nativeElement.value.indexOf('.') == elHFNF.nativeElement.value.length - 1) {
                elHFNF.nativeElement.value = elHFNF.nativeElement.value.substring(0, elHFNF.nativeElement.value.length - 1);
            }
        });

        renderHFNF.listen(elHFNF.nativeElement, 'load', (event) => {
            if (elHFNF.nativeElement.value) {
                elHFNF.nativeElement.value = this.parseValue(elHFNF.nativeElement.value);
            }
        });

        renderHFNF.listen(elHFNF.nativeElement, 'change', (event) => {
            if (elHFNF.nativeElement.value) {
                elHFNF.nativeElement.value = this.parseValue(elHFNF.nativeElement.value);
            }
        });
    }

    checkEventCode(event) {
        return ((event.charCode === 8 || event.charCode === 0) ? null :
            (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46);
    }

    parseValue(value) {
        if (!isNaN(value) && value != undefined) {
            return Number.parseFloat(value).toFixed(this.numberOfDecimal);
        }
    }
}

