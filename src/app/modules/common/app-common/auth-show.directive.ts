import { Directive, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/services/webservices/auth.service';
import { ActivatedRoute } from '@angular/router';
import { getUrlSegmentPath } from 'src/app/functions/util.functions';
declare var $: any;
@Directive({
  selector: '[ngLinkShow]'
})
export class AuthShowDirective implements OnInit {

  constructor(
    private templateRef: TemplateRef<any>,
    private authService: AuthService,
    private viewContainer: ViewContainerRef,
    private route: ActivatedRoute) { }
  linkName: string;

  @Input() set ngLinkShow(linkName: string) {
    this.linkName = linkName;
  }

    ngOnInit() {  
        
    if (this.linkName.includes('-')) { // this condition will be used for *ngLinkShow="'ex-sh'"
      let isAllowed = false;
      const splitedValue = this.linkName.split('-');
      if (splitedValue.length !== 0) {
        for (const el of splitedValue) {
          isAllowed = this.authService.validateAccessRights(this.getTemplatePath(), el);
          if (isAllowed) {
            break; // if 'ex' or 'sh' any one of is true then break from the loop
          }
        }
        if (isAllowed) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
    } else {
      const isAllowed = this.authService.validateAccessRights(this.getTemplatePath(), this.linkName);
      if (isAllowed) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    }
  }

  private getTemplatePath() {
    return getUrlSegmentPath(this.route.snapshot.parent);
  }
}
