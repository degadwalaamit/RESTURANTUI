import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import { LocalStorageService } from 'src/services/webservices/local-storage.service';
import { NgBroadcasterService } from 'ngx-broadcaster';
import { SharedService } from 'src/services/webservices/shared.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { Subscription } from 'rxjs';
declare var $: any;
declare global {
  interface Window {
    PointerEvent: typeof PointerEvent;
    TouchEvent: typeof TouchEvent;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Bandhan';
  isLoginUser = false;
  loading: boolean;
  isLoginSubscription: Subscription;
  showLoader: Subscription;
  hideLoader: Subscription;
  constructor(private localStorageService: LocalStorageService,
    private broadcaster: NgBroadcasterService,
    public sharedService: SharedService,
    private bnIdle: BnNgIdleService,
    private routes: Router) {
      this.bnIdle.startWatching(3600).subscribe((isTimedOut: boolean) => { // 20 * 60 = 1200 second (20 min) ideal then user will logout
        if (isTimedOut) {
          this.broadcaster.emitEvent('sessionexpire', '');
          this.sharedService.removeLocalStorageValue();
        }
      });
  }

  ngOnDestroy() {
    if (this.isLoginSubscription) {
      this.isLoginSubscription.unsubscribe();
    }
    if (this.showLoader) {
      this.showLoader.unsubscribe();
    }
    if (this.hideLoader) {
      this.hideLoader.unsubscribe();
    }
  }

  ngOnInit() {
    this.broadcaster.listen("hideSideMenu").subscribe(res=>{
      this.isLoginUser=false;
    })
    let isLogin = this.localStorageService.getItem('isloginuser');
    if (isLogin != null && isLogin != undefined) {
      if (isLogin == 'true') {
        this.isLoginUser = isLogin;
      }
    }
    this.isLoginSubscription = this.broadcaster.listen('islogin').subscribe(res => {
      this.isLoginUser = res;
    });
    this.showLoader = this.broadcaster.listen('showLoader').subscribe(Res => {
      this.loading = true;
    });
    this.hideLoader = this.broadcaster.listen('hideLoader').subscribe(res => {
      this.loading = false;
    })
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  //  key  press on body
  onKeyPress(event)
  {
    // if loader is enable then preventDefault
    if(this.loading)
    {
      event.preventDefault();
    }
  }



  ngAfterViewInit() {

    function detectTouchscreen() {
      var result = false;
      if (window.PointerEvent && ('maxTouchPoints' in navigator)) {
        // if Pointer Events are supported, just check maxTouchPoints
        if (navigator.maxTouchPoints > 0) {
          result = true;
        }
      } else {
        // no Pointer Events...
        if (window.matchMedia && window.matchMedia("(any-pointer:coarse)").matches
            || window.TouchEvent || ('ontouchstart' in window)) {
          // check for any-pointer:coarse which mostly means touchscreen
          result = true;
        }
      }
      return result;
    }

    // This code is for sidebar menu close on page change
     this.routes.events.subscribe(() => {
      if($(".page-sidebar.active").length==0) {
      $(".page-sidebar").addClass("active");
      }
      });

    $('.menu-toggler').click(function () {
      $(".page-logo").toggleClass("active");
      $(".page-sidebar").toggleClass("active");
      $(".page-content").toggleClass("active");
      $(".pageFooter").toggleClass("active");
      $(".vehicleConfigSumBox").toggleClass("active");
      $(".right-fix").toggleClass("active");
      $(".calculationBox").toggleClass("active");
      $(".page-header-inner").toggleClass("smallInner");
      if (detectTouchscreen()) {
        if ($('.page-sidebar').not('.active')) {
          $('.nav-item > .nav-link > span').removeAttr('style')
          $('.nav-item .sub').removeAttr('style');
          $('.nav-item.has-sub').removeClass('sub-open');
        }
      }
    });

    $(".page-logo").addClass("active");
    $(".page-sidebar").addClass("active");
    $(".page-content").addClass("active");
  }

  logout() {
    this.broadcaster.emitEvent('sessionexpire', '');
  }
}
