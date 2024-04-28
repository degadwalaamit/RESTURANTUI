import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
    selector: '[HandleNegativeFloatingNumberFields]'
})

export class HandleNegativeFloatingNumberFields {
    @Input('handleFloatingNumberFields') fieldSize: any;

    isDoubleClick: boolean = false;

    constructor(private elHNFNF: ElementRef, private render: Renderer2) {
        render.listen(elHNFNF.nativeElement, 'keypress', (event) => {
            /* regex for negative only decimal number */
            var pattern = /^(-{1}?(?:([0-9]{0,10}))|([0-9]{1})?(?:([0-9]{0,9})))?(?:\.([0-9]{0,2}))?$/;
            /* if it doesn't match the pattern, return. */
            if (!pattern.test(event.key)) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
            /* if it matches the pattern, then. */
            else {
                /* if there is already negative sign anf user try to enter another 
                negative sign, return. */
                if ((event.key == '-' && event.target.value.indexOf('-') >= 0) ||
                    (event.key == '.' && event.target.value.indexOf('.') >= 0)) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                }
                /* if there is already decimal sign anf user try to enter another 
               decimal sign, return. */
                else if (event.target.value.indexOf('.') >= 0) {
                    let current: string = this.elHNFNF.nativeElement.value;
                    const position = this.elHNFNF.nativeElement.selectionStart;
                    const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
                    if (next && !String(next).match(pattern)) {
                        event.preventDefault();
                        return false;
                    }
                }
            }
        });

        render.listen(elHNFNF.nativeElement, 'mouseleave', (event) => {

            if (elHNFNF.nativeElement.value != undefined && elHNFNF.nativeElement.value.indexOf('.') == elHNFNF.nativeElement.value.length - 1) {
                elHNFNF.nativeElement.value = elHNFNF.nativeElement.value.substring(0, elHNFNF.nativeElement.value.length - 1)
            }

        })

        render.listen(elHNFNF.nativeElement, 'load', (event) => {
            if (elHNFNF.nativeElement.value)
                elHNFNF.nativeElement.value = this.parseValue(elHNFNF.nativeElement.value);
        })

        render.listen(elHNFNF.nativeElement, 'change', (event) => {
            if (elHNFNF.nativeElement.value)
                elHNFNF.nativeElement.value = this.parseValue(elHNFNF.nativeElement.value);
        })
    }

    parseValue(value) {
        if (!isNaN(value) && value != undefined) {
            return Number.parseFloat(value).toFixed(2);
        }
    }
}