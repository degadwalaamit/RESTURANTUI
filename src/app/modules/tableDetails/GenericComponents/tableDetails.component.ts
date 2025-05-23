import { ChangeDetectorRef, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { OnDestroy, OnInit } from 'src/app/common-imports/angular-core';
import { ActivatedRoute, NgBroadcasterService, Router, TranslateService } from 'src/app/common-imports/other-imports';
import { SharedService } from 'src/app/common-imports/webservices';
import { MenuItemMasterModel } from 'src/app/models/menu.model';
import { isValidObject } from '../../common/app-helper-functions';
import { PwaOrderDetailMasterModel } from 'src/app/models/cart.model';
import * as _ from 'lodash';
import { ConfirmationCode } from 'src/app/constants/app.constant';
import { isNullOrUndefined } from 'util';
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
  items$: Observable<PwaOrderDetailMasterModel[]>;
  tableId = null;
  constructor(
    public sharedService: SharedService,
    private router: Router,
    private titleService: Title,
    private translate: TranslateService,
    private broadcaster: NgBroadcasterService,
    cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute) {
    // setInterval(function () {
    //   if (this.cd && !this.cd['destroyed']) {
    //     this.cd.detectChanges();
    //   }
    // }, 1);
    // this.items$ = new Observable(observer => {
    //   setInterval(async () => {
    //     this.reCalculation();
    //     observer.next(this.sharedService.orderDetailMaster);
    //   }, 1000);
    // });
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
    this.sharedService.orderDetailMaster = _.cloneDeep(this.sharedService.orderDetailMaster.sort((x, y) => x.cartSequence < y.cartSequence ? -1 : 1));
  }

  async ngOnInit() {
    this.sharedService.setConfirmationPopup('Sent to POS', 'cnfSentToPOS',
      'Are you sure want to send to POS?'
      , 'Cancel', 'Send', ConfirmationCode.TablePage);
    if (!isValidObject(this.activatedRoute.snapshot.params.tId)) {
      this.router.navigate(["/dashboard"]);
    } else {
      this.tableId = this.activatedRoute.snapshot.params.tId;
    }
    this.sharedService.orderMasterModel = await this.sharedService.getTableDetails(this.tableId);
    if (isNullOrUndefined(this.sharedService.orderMasterModel.orderId)) {
      this.sharedService.orderMasterModel = await this.sharedService.GetPwaOrderListByOrderId(this.tableId);
      if (this.sharedService.menuCategoryMasterModel.length == 0) {
        await this.sharedService.getMenuMaster("");
      }
      this.sharedService.orderDetailMaster = await this.sharedService.setOrderDetailObject(this.sharedService.orderMasterModel.orderDetailMaster);
    } else {
      this.sharedService.orderMasterModel.orderStatus = 'Updated';
    }
    this.anotherSubscription = this.sharedService.sendCartCountObservable.subscribe(() => {
      this.reCalculation();
    })
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
    this.sharedService.getOrderCalculation();
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
