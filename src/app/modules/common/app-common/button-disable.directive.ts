import { AuthService } from 'src/services/webservices/auth.service';
import { Directive, Input, Renderer2, ElementRef, HostBinding } from '@angular/core';

@Directive({
    selector: '[disableButton]'
})

export class DisableButtonDirective {
    @Input() @HostBinding('disabled') disableState: boolean;
    // tslint:disable-next-line: no-input-rename
    @Input('IsEditMode') IsEditMode;
    @Input('disableButton') set disableButton(componentName: string) {
        const type = this.IsEditMode ? 'up' : 'cr';
        const action = this.authService.validateAccessSubRights(componentName, type) ? 'enable' : 'disable';
        if (action === 'disable') {
            this.disableState = true; // if action is disable then set to true
        } else {
            this.disableState = false; // if action is not disable then set to false
        }
        this.renderer.setAttribute(this.el.nativeElement, 'disabled', this.disableState ? 'disabled' : '');
      }

    constructor(private renderer: Renderer2, private el: ElementRef, private authService: AuthService) {}
}
