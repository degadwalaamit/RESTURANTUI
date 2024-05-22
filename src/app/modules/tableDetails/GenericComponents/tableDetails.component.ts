import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { OnDestroy, OnInit } from 'src/app/common-imports/angular-core';
import { NgBroadcasterService, Router, TranslateService } from 'src/app/common-imports/other-imports';
import { LocalStorageService, LoginService, SharedService } from 'src/app/common-imports/webservices';
declare const powerbi: any;
@Component({
  selector: 'app-tableDetails',
  templateUrl: './tableDetails.component.html'
})
export class TableDetails implements OnInit, OnDestroy {
  selectedIndex = 0;
  isUserLogin = false;
  optionRules: Subscription;
  dashboard$!: Observable<void>;

  constructor(
    public sharedService: SharedService,
    private router: Router,
    private titleService: Title,
    private translate: TranslateService,
    private broadcaster: NgBroadcasterService,
    private loginService: LoginService,
    private storage: LocalStorageService) {
  }

  async ngOnInit() {
    // this.dashboard$ = this.loginService.getDashboard().pipe(
    //   tap(t => console.log(t)),
    //   map(s => s),
    //   catchError(err => {
    //     if (err.status === 401) {
    //       this.broadcaster.emitEvent('sessionexpire', '');
    //       window.location.href = '/login';
    //     }
    //     return EMPTY;
    //   }));

    this.isUserLogin = this.sharedService.isUserLogin();
    if (!this.isUserLogin) {
      this.broadcaster.emitEvent('hideSideMenu', '');
      this.router.navigate(['/login']);
    } else {
      await this.sharedService.getMenuMaster();
      let userObject = this.sharedService.getUserDetails();
      let dashboardTitle = this.translate.instant('PageTitles.Dashboard');
      if (dashboardTitle === 'PageTitles.Dashboard') {
        dashboardTitle = 'Welcome';
      } else {
        this.titleService.setTitle(this.translate.instant('PageTitles.Dashboard',
          { userName: userObject.firstName + ' '+ userObject.lastName || '' }));
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
