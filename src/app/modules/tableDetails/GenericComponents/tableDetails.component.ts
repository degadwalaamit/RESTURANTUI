import { ChangeDetectorRef, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { OnDestroy, OnInit } from 'src/app/common-imports/angular-core';
import { ActivatedRoute, NgBroadcasterService, Router, TranslateService } from 'src/app/common-imports/other-imports';
import { SharedService } from 'src/app/common-imports/webservices';
import { OrderDetailMasterModel } from 'src/app/models/cart.model';
import { MenuItemMasterModel } from 'src/app/models/menu.model';
import { isValidObject } from '../../common/app-helper-functions';
@Component({
  selector: 'app-tableDetails',
  templateUrl: './tableDetails.component.html'
})
export class TableDetails implements OnInit, OnDestroy {
  selectedIndex = 0;
  isUserLogin = false;
  optionRules: Subscription;
  anotherSubscription: Subscription;
  dashboard$!: Observable<void>;
  items$: Observable<OrderDetailMasterModel[]>;
  tableId = null;
  constructor(
    public sharedService: SharedService,
    private router: Router,
    private titleService: Title,
    private translate: TranslateService,
    private broadcaster: NgBroadcasterService,
    cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute) {
    setInterval(function () {
      if (this.cd && !this.cd['destroyed']) {
        this.cd.detectChanges();
      }
    }, 1);
    this.items$ = new Observable(observer => {
      setInterval(async () => {
        this.reCalculation();
        observer.next(this.sharedService.orderDetailMaster);
      }, 1000);
    });
  }

  get now(): string { return Date(); };

  reCalculation() {
    if (this.sharedService.orderDetailMaster.filter(x => x.cartSequence == 101).length > 0) {
      this.sharedService.orderMasterModel.isTakeAway = false;
      this.sharedService.orderMasterModel.isDelivery = true;
    } else {
      this.sharedService.orderMasterModel.isTakeAway = true;
      this.sharedService.orderMasterModel.isDelivery = false;
    }
    // this.sharedService.addPackingCharge();
    this.sharedService.getOrderCalculation();
    this.sharedService.orderDetailMaster = this.sharedService.orderDetailMaster.sort((x, y) => x.cartSequence < y.cartSequence ? -1 : 1);
  }

  async ngOnInit() {
    if (!isValidObject(this.activatedRoute.snapshot.params.tId)) {
      this.router.navigate(["/dashboard"]);
    } else {
      this.tableId = this.activatedRoute.snapshot.params.tId;
    }
    this.sharedService.orderMasterModel = this.sharedService.getTableDetails(this.tableId);
    this.anotherSubscription = this.sharedService.sendCartCountObservable.subscribe(() => {
      //this.cartDetails();
    })
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
    this.sharedService.currentSelectedObject = new MenuItemMasterModel();
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
          { userName: userObject.firstName + ' ' + userObject.lastName || '' }));
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
    if (this.anotherSubscription) {
      this.anotherSubscription.unsubscribe();
    }
  }
}
