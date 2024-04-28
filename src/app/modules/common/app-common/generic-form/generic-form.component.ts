import { Subscription } from 'rxjs';
import { NgBroadcasterService } from 'ngx-broadcaster';
import { InsertionDirective } from './../insertion.directive';
import { MessageType } from './../../../../enums/message-type.enum';
import { FormComponent } from './../../../../models/formComponent.model';
import { ViewMessageComponent } from './../../view-message/view-message.component';
import { Component, OnInit, ComponentRef, Input, Output, ViewChild, EventEmitter, ChangeDetectorRef, ComponentFactoryResolver, OnDestroy, AfterViewInit, Type} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/services/webservices/auth.service';
import { SharedService } from 'src/services/webservices/shared.service';
declare var $: any;
@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html'
})
export class GenericFormComponent implements OnInit, OnDestroy, AfterViewInit {

  componentRef: ComponentRef<any>;
  viewContainerRef: any;
  formData: any = {};

  @Input() components: FormComponent[];
  @Input() formName;
  @Output() formSubmit = new EventEmitter<any>();
  @ViewChild(ViewMessageComponent, { static: false }) msgComponent;
  @ViewChild(InsertionDirective, { static: false }) insertionPoint: InsertionDirective;
  currentValue: any = {};
  broadcastUserModelSubscription: Subscription;
  constructor(private cd: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private broadcaster: NgBroadcasterService,
    private route: ActivatedRoute,
    public sharedService: SharedService,
    private authService: AuthService) { }

    ngOnInit() {

    this.broadcastUserModelSubscription = this.broadcaster.listen('broadcastUserModel').subscribe(res => {
      if (res != null && res != '') {
        this.components = res;
      }
      this.clearComponent();
      this.components.forEach(cmp => {
        this.loadComponent(cmp.component, cmp.data);
      });
    });
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    if (this.componentRef) {
      this.componentRef.changeDetectorRef.detach();
    }
    if (this.broadcastUserModelSubscription) {
      this.broadcastUserModelSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.clearComponent();
    this.components.forEach(cmp => {
      this.loadComponent(cmp.component, cmp.data);
    });
  }

  clearComponent() {
    if (this.viewContainerRef) {
      this.viewContainerRef.clear();
    }
  }

  loadComponent(componentType: Type<any>, componentData: any) {
    let returnValue = this.authService.validateAccessSubRights(componentData.toComponentName(), 'vi');
    if (returnValue) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
      this.viewContainerRef = this.insertionPoint.viewContainerRef;
      this.componentRef = this.viewContainerRef.createComponent(componentFactory);
      this.componentRef.instance.data = componentData;

      if (this.componentRef.instance.formData) {
        this.formData[componentData.toClassName()] = componentData;
        this.componentRef.instance.formData.subscribe(data => {
          this.formData[componentData.toClassName()] = data;
        });
      }
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  showMessage(type: MessageType, message: string) {
    this.sharedService.showMessage(type, message);
  }

}
