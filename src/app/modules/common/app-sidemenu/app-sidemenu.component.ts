import { Component } from '@angular/core';
import { OnInit, OnDestroy } from 'src/app/common-imports/angular-core';
import { NgBroadcasterService, NavigationEnd, Router, UserRoleEnum, WorkflowFeatureName } from 'src/app/common-imports/other-imports';
import { Subscription } from 'src/app/common-imports/rxjs-imports';
import { SharedService, LocalStorageService } from 'src/app/common-imports/webservices';
import { CommonAppConstants } from 'src/app/constants/app.constant';
import { isNullOrUndefined } from 'util';
declare var $: any;
@Component({
  selector: 'app-sidemenu',
  templateUrl: './app-sidemenu.component.html'
})
export class AppSidemenuComponent implements OnInit, OnDestroy {

  featureList: any = [];
  subfeatureList: any = [];
  selectedIndex: any = null;
  selectedParentIndex: any = null;
  salesIndex: any;
  sendFeatureListSubscription: Subscription;
  constructor(private routes: Router,
    private broadcast: NgBroadcasterService,
    private storage: LocalStorageService,
    public sharedService: SharedService) {
    // override the route reuse strategy
    this.routes.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };

    this.routes.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.routes.navigated = false;
        // if you need to scroll back to top
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnDestroy() {
    if (this.sendFeatureListSubscription) {
      this.sendFeatureListSubscription.unsubscribe();
    }
  }

  nestedMenu(res) {
    let isSales = this.storage.getItem('fromSalesAcquisition');
    res.forEach(fl => {
      let pathname = window.location.pathname + "/";
      // Because opportunity have same origin with different module ex. opportunity in url
      if (pathname.toLowerCase().includes(CommonAppConstants.EditOpportunity) ||
        pathname.toLowerCase().includes(CommonAppConstants.AddOpportunity) ||
        pathname.toLowerCase().includes(CommonAppConstants.ViewOpportunity)) {
        pathname = pathname
          .replace(CommonAppConstants.EditOpportunity, CommonAppConstants.OpportunityManagement)
          .replace(CommonAppConstants.AddOpportunity, CommonAppConstants.OpportunityManagement)
          .replace(CommonAppConstants.ViewOpportunity, CommonAppConstants.OpportunityManagement);
      }
      if (pathname.toLowerCase().includes(CommonAppConstants.EditLead) ||
        pathname.toLowerCase().includes(CommonAppConstants.AddLead) ||
        pathname.toLowerCase().includes(CommonAppConstants.ViewLead)) {
        pathname = pathname
          .replace(CommonAppConstants.EditLead, CommonAppConstants.Leads)
          .replace(CommonAppConstants.AddLead, CommonAppConstants.Leads)
          .replace(CommonAppConstants.ViewLead, CommonAppConstants.Leads);
      }
      if (pathname.includes(fl.url + "/") && fl.url != null) {
        this.selectedIndex = fl.featureId;
        if (fl.parentId != null) {
          setTimeout(() => {
            this.loadSubMenu(fl.parentId);
          }, 1000);
          this.selectedParentIndex = fl.parentId;
        } else {
          this.selectedParentIndex = this.selectedIndex;
        }
      }
    });
    if (isSales || isSales == "true") {
      let ind = res.filter(x => x.uniqueName == "SideMenu.SalesAcquisition");
      if (ind != null && ind.length > 0)
        this.selectedParentIndex = ind[0].featureId;
    }
    this.featureList = res.filter(r => r.parentId == null);
    this.subfeatureList = res.filter(r => r.parentId != null && r.isMenu);

    // below code added for remove sales acquisition from sidemeu for Acquisition user OR Acquisition manager role start
    if (this.storage.getItem('selectedUserRole')) {
      const currentRole = JSON.parse(this.storage.getItem('selectedUserRole'));
      if (currentRole && (currentRole.role == UserRoleEnum.AcquisitionUserRole
        || currentRole.role == UserRoleEnum.AcquisitionManagerRole)) {
        this.featureList = this.featureList.filter(r => r.uniqueName != WorkflowFeatureName.SalesAcquisitionMenu);
      }
    }
    // Code added for remove sales acquisition from sidemeu for Acquisition user OR Acquisition manager role end

    // below code is to highlight menu on refresh the page
    this.featureList.forEach(fl => {
      fl.isSubClass = false;
      let subLength = this.subfeatureList.filter(x => x.parentId == fl.featureId).length;
      if (subLength > 0) {
        fl.isSubClass = true;
      }
    });
  }

  ngOnInit() {
    this.selectedIndex = -1;
    this.storage.removeItem('fromUser');
    this.storage.removeItem('fromCompany');
    this.storage.removeItem('quickSearch');
    this.storage.removeItem('quickSearchMan');
    this.storage.removeItem('quickSearchDealer');
    this.storage.removeItem('gridSearch');
    this.storage.removeItem('companyState');

    this.sendFeatureListSubscription = this.sharedService.currentFeaturelist.subscribe(res => {
      this.nestedMenu(res);
    });

    this.broadcast.listen('LoadFeatureListPage').subscribe(() => {
      this.selectedParentIndex = 100;
    });

    this.broadcast.listen('SelectDashboardMenu').subscribe(() => {
      this.selectedParentIndex = -1;
    });

    this.broadcast.listen('changeHighLightedMenu').subscribe((res) => {
      var feature = this.subfeatureList.find(x => x.featuresName == res);
      if (!isNullOrUndefined(feature)) {
        this.loadPage(feature.featuresName, feature.featureId, feature);
      }
    });

    $('.page-sidebar-menu').find('li.has-sub>a').on('click', function (e) {
      e.preventDefault();
      var $thisParent = $(this).parent();
      if ($thisParent.hasClass('sub-open')) {
        $thisParent.removeClass('sub-open').children('ul.sub').slideUp(150);
      } else {
        // Show the Submenu
        $thisParent.addClass('sub-open').children('ul.sub').slideDown(150);
        // Hide Others Submenu
        $thisParent.siblings('.sub-open').removeClass('sub-open').children('ul.sub').slideUp(150);
      }
    });

    this.broadcast.listen('loadPageBroadcaster').subscribe(() => {
      let item = JSON.parse(this.storage.getItem('loadPageitem'));
      let page = this.storage.getItem('loadPage');
      let index = this.storage.getItem('loadPageindex');
      this.loadPageData(page, index, item);
    });

  }

  menuhover() {
    if ($('.page-sidebar').hasClass('active')) {
      $('.page-sidebar').find('.page-sidebar-menu').children('.has-sub').hover(function () {
        var totalHeight = 0,
          $this = $(this),
          navSubmenuClass = 'nav-group-sub',
          navSubmenuReversedClass = 'nav-item-submenu-reversed';

        totalHeight += $this.find('.' + navSubmenuClass).filter(':visible').outerHeight();
        if ($this.children('.' + navSubmenuClass).length) {
          if (($this.offset().top + $this.find('.' + navSubmenuClass).filter(':visible').outerHeight()) + 50 > document.body.clientHeight) {
            $this.addClass(navSubmenuReversedClass)
          }
          else {
            $this.removeClass(navSubmenuReversedClass)
          }
        }
      });
    }
  }

  detectTouchscreen() {
    var result = false;
    if (window.PointerEvent && ('maxTouchPoints' in navigator)) {
      // if Pointer Events are supported, just check maxTouchPoints
      if (navigator.maxTouchPoints > 0) {
        result = true;
      }
    } else {
      // no Pointer Events...
      if ((window.matchMedia && window.matchMedia("(any-pointer:coarse)").matches) || (window.TouchEvent || ('ontouchstart' in window))) {
        // check for any-pointer:coarse which mostly means touchscreen OR last resort - check for exposed touch events API / event handler
        result = true;
      }
    }
    return result;
  }

  loadPage(page, index, item: any) {
    this.selectedIndex = index;
    this.routes.navigate(['./' + page]);
    // this.loadPageData(page, index, item);
  }

  loadPageData(page, index, item: any) {
    window.scroll(0, 0);
    if (item != null) {
      if (item.uniqueName == 'SideMenu.SalesAcquisition') {
        this.salesIndex = index;
        this.storage.removeItem('fromSalesAcquisition');
        this.storage.setItem('fromSalesAcquisition', 'true');
      }
      else {
        this.storage.removeItem('fromSalesAcquisition');
      }
      this.storage.setItem('selectedMenu', JSON.stringify(item));
      this.selectedParentIndex = item.featureId;
    } else {
      this.selectedParentIndex = index;
    }
    this.selectedIndex = index;
    this.routes.navigate(['./' + page]);
    if (this.detectTouchscreen()) {
      if ($('.page-sidebar').hasClass('active')) {
        $('.nav-item:not(.has-sub) > .nav-link > span').css("display", "none");
        $('.nav-item .sub').attr('style', 'display: none !important');
      } else {
        $('.nav-item:not(.has-sub) > .nav-link > span').css("display", "block");
        $('.nav-item .sub').attr('style', 'display: block !important');
      }
    }
  }

  mainMenuClick() {
    this.storage.removeItem('quickSearch');
    this.storage.removeItem('gridSearch');
    this.storage.removeItem('setContactDetails');
    this.storage.removeItem('companyState');
    this.storage.removeItem('fromUser');
    this.storage.removeItem('fromCompany');
    if (this.detectTouchscreen()) {
      if ($('.page-sidebar').hasClass('active')) {
        $('.nav-item.has-sub > .nav-link > span').removeAttr("style");
      }
    }
  }

  submenuClick() {
    this.storage.removeItem('fromUser');
    this.storage.removeItem('fromCompany');
    this.storage.removeItem('quickSearch');
    this.storage.removeItem('setContactDetails');
    this.storage.removeItem('companyState');
    if (this.detectTouchscreen()) {
      if ($('.page-sidebar').hasClass('active')) {
        $('.nav-item.has-sub > .nav-link > span').css("display", "none");
      } else {
        $('.nav-item.has-sub > .nav-link > span').css("display", "block");
      }
    }
  }

  loadSubMenu(index) {
    if ($('#sub' + index).css('display') == 'none') {
      $('#sub' + index).css("display", "block")
      $('#has-sub' + index).addClass('sub-open');
    } else {
      $('#sub' + index).css("display", "none")
      $('#has-sub' + index).removeClass('sub-open');
    }
  }

  /* MAIN MENU NEW APPROACH FOR SUB NAVIGATION *********/
  mainScrollTop: number = 0;
  subMenuOffsetPosition: number = 0;
  activeMenu: string;
  cstMenuhover(e) {
    this.subMenuOffsetPosition = ((this.mainScrollTop - e.srcElement.offsetTop) * -1);
  }
  mainScrollbar(e) {
    this.mainScrollTop = e.srcElement.scrollTop;
  }
  /* ENDED: MAIN MENU NEW APPROACH FOR SUB NAVIGATION *********/
}
