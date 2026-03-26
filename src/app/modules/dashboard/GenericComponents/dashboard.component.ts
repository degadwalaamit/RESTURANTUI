import { Component, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OnDestroy, OnInit } from 'src/app/common-imports/angular-core';
import { NgBroadcasterService, Router, TranslateService } from 'src/app/common-imports/other-imports';
import { SharedService } from 'src/app/common-imports/webservices';
import { CommonAppConstants } from 'src/app/constants/app.constant';
import { isNullOrUndefined } from 'util';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {

  isUserLogin = false;
  optionRules: Subscription;
  refreshSubscription: Subscription;
  dashboard$!: Observable<void>;
  private signalRSubscribed = false;

  constructor(
    public sharedService: SharedService,
    private router: Router,
    private titleService: Title,
    private translate: TranslateService,
    private broadcaster: NgBroadcasterService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone) {
  }

  async ngOnInit() {
    this.sharedService.appInsights.trackTrace({ message: 'Dashboard Component Initialized' });
    this.isUserLogin = this.sharedService.isUserLogin();
    if (!this.isUserLogin) {
      this.broadcaster.emitEvent('hideSideMenu', '');
      this.router.navigate(['/login']);
    } else {
      await this.sharedService.GetPwaOrderListByTable();
      let userObject = this.sharedService.getUserDetails();
      let dashboardTitle = this.translate.instant('PageTitles.Dashboard');
      if (dashboardTitle === 'PageTitles.Dashboard') {
        dashboardTitle = 'Welcome';
      } else {
        this.titleService.setTitle(this.translate.instant('PageTitles.Dashboard',
          { userName: userObject.firstName + ' ' + userObject.lastName || '' }));
      }
      this.cdr.markForCheck();
    }
    this.optionRules = this.broadcaster.listen('islogin').subscribe(response => {
      this.isUserLogin = response;
      this.cdr.markForCheck();
    });
    this.sharedService.moveTableArray();

    // Make sure callback added only once, and run handler inside Angular zone.
    this.sharedService.signalRService.startConnection();
    if (!this.signalRSubscribed) {
      this.signalRSubscribed = true;
      this.sharedService.signalRService.onPwaOrderCreated((data: any) => {
        this.ngZone.run(async () => {
          console.log('PwaOrderCreated event received from SignalR', data);
          this.sharedService.appInsights.trackTrace({ message: 'PwaOrderCreated event received from SignalR', properties: { data: JSON.stringify(data) } });
          await this.sharedService.GetPwaOrderListByTable();
          this.cdr.markForCheck();
        });
      });
    }
  }

  trackByTableIndex(index: number): number {
    return index;
  }

  ngOnDestroy() {
    if (this.optionRules) {
      this.optionRules.unsubscribe();
    }
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}
