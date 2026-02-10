import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
  constructor(
    public sharedService: SharedService,
    private router: Router,
    private titleService: Title,
    private translate: TranslateService,
    private broadcaster: NgBroadcasterService,
    private cdr: ChangeDetectorRef) {
  }

  async ngOnInit() {
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
      // table details
      this.sharedService.tableMaster = null;
      this.sharedService.totalTableArray = null;
      this.sharedService.totalTakeAwayTableArray = null;
      if (!isNullOrUndefined(userObject.tableMaster) && userObject.tableMaster.length > 0) {
        this.sharedService.tableMaster = userObject.tableMaster[0];

        this.sharedService.totalTableArray = new Array(this.sharedService.tableMaster.tableNo);
        this.sharedService.totalTakeAwayTableArray = new Array(this.sharedService.tableMaster.takeAwayTableNo);
      }
    }
    this.optionRules = this.broadcaster.listen('islogin').subscribe(response => {
      this.isUserLogin = response;
      this.cdr.markForCheck();
    });
    this.sharedService.moveTableArray();

    // Auto-refresh table data at configurable interval
    this.refreshSubscription = interval(CommonAppConstants.TableRefreshIntervalMs).pipe(
      switchMap(() => this.getTableDataSilent())
    ).subscribe(() => {
      // Table data has been refreshed
      this.cdr.markForCheck();
    });
  }

  private getTableDataSilent(): Promise<void> {
    return new Promise(async (resolve) => {
      const currentLoading = this.sharedService.loading;
      try {
        await this.sharedService.GetPwaOrderListByTable();
      } finally {
        // Restore loading state to prevent loader overlay from appearing during auto-refresh
        this.sharedService.loading = currentLoading;
        resolve();
      }
    });
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
