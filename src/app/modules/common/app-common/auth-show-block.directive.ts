import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { AuthService } from 'src/services/webservices/auth.service';

@Directive({
  selector: '[disableControl]'
})
export class AuthShowBlockDirective {
  @Input('IsEditMode') IsEditMode;
  @Input() set disableControl(componentName: string) {
    let type = this.IsEditMode ? 'up' : 'cr';
    const action = this.authService.validateAccessSubRights(componentName, type) ? 'enable' : 'disable';
    this.ngControl.control[action]();
  }

  constructor(private ngControl: NgControl,
    private authService: AuthService) {
  }
}