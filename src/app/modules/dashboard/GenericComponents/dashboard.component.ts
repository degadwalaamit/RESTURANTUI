import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { OnDestroy, OnInit } from 'src/app/common-imports/angular-core';
import { NgBroadcasterService, Router, TranslateService } from 'src/app/common-imports/other-imports';
import { SharedService } from 'src/app/common-imports/webservices';
import { isNullOrUndefined } from 'util';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  isUserLogin = false;
  optionRules: Subscription;
  dashboard$!: Observable<void>;
  constructor(
    public sharedService: SharedService,
    private router: Router,
    private titleService: Title,
    private translate: TranslateService,
    private broadcaster: NgBroadcasterService) {
  }

  async ngOnInit() {


    this.isUserLogin = this.sharedService.isUserLogin();
    if (!this.isUserLogin) {
      this.broadcaster.emitEvent('hideSideMenu', '');
      this.router.navigate(['/login']);
    } else {
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
    });
  }

  ngOnDestroy() {
    if (this.optionRules) {
      this.optionRules.unsubscribe();
    }
  }  
}
