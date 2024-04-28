import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { OnInit,OnDestroy,Input } from 'src/app/common-imports/angular-core';
import { NgBroadcasterService,TranslateService,Router,CookieService } from 'src/app/common-imports/other-imports';
import { SharedService,LocalStorageService } from 'src/app/common-imports/webservices';
import { isNotNullOrUndefined } from '@microsoft/applicationinsights-core-js';
import { isNullOrUndefined } from 'util';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  @Input() isLoginUser;
  tenantName: string;
  userName: string;
  languages: any[];
  selectedLanguage: any = {};
  validUserlist = [];
  isShowRole = true;
  loading = false;
  isLogin = false;
  sessionExpireSubscription: Subscription;
  constructor(
    private localStorageService: LocalStorageService,
    private routes: Router,
    public sharedService: SharedService,
    private translate: TranslateService,
    private broadcast: NgBroadcasterService) { }

  ngOnInit() {
    this.sessionExpireSubscription = this.broadcast.listen('sessionexpire').subscribe(() => {
      this.logout();
    });

    if (this.isLoginUser) {
      this.loading = true;
      this.languages = this.sharedService.getLanguages();
      const objUser = this.sharedService.getUserDetails();
      this.isShowRole = false;
      // objUser.userRoles.forEach(element => {
      //   const validTo = isNotNullOrUndefined(element.validTo) ? new Date(element.validTo) : null;
      //   const currentDate = new Date();
      //   if (currentDate <= validTo || isNullOrUndefined(validTo)) {
      //     this.validUserlist.push(element);
      //   }
      // });

      this.selectedLanguage = this.languages.filter(l => l.language === objUser.languageCode);
      if(this.selectedLanguage.length == 0 && this.languages.length > 0)
      {
        this.selectedLanguage = this.languages;
      }
      this.useLanguage(this.selectedLanguage[0].code); // used [0] because we need only first code

      if (objUser != null || objUser !== '') {
        this.tenantName = objUser.tenantShortCode;
        this.userName = objUser.firstName+ ' ' + objUser.lastName;
        this.loading = false;
        this.isLogin = true;
        // Once we got details from login user, will set language here
      }
    }
  }

  openDropdown(id){
    $('#' + id).click();
  }

  toggleMenu(){
      $(".page-logo").toggleClass("active");
      $(".page-sidebar").toggleClass("active");
      $(".page-content").toggleClass("active");
      $(".pageFooter").toggleClass("active");
      $(".vehicleConfigSumBox").toggleClass("active");
      $(".right-fix").toggleClass("active");
      $(".calculationBox").toggleClass("active");
      $(".page-header-inner").toggleClass("smallInner");
  }

  logout() {
    this.sharedService.logout('logout');
    this.loading = true;
    this.isLogin = false;
    $('#logoutModal').modal('hide');
    this.localStorageService.removeItem('isloginuser');
    this.localStorageService.removeItem('IsShowAllQuotesVisible');
    this.localStorageService.removeItem('aquisitionShowAllQuote');
    this.localStorageService.removeItem('saleShowAllQuote');
    this.sharedService.logoutHistory('');
    this.loading = false;
  }

  useLanguage(code: string) {
    this.selectedLanguage = this.languages.filter(l => l.code === code)[0]; // static [0] passed as we need only 1st array
    this.translate.setDefaultLang(code);
    this.translate.use(code);
    this.localStorageService.setItem('selectedlanguage', code);
  }

  changePassword() {
      this.routes.navigate(['./myprofile']);
  }

  cancelRequest() {
    $('#vehicle_confirmation_selector_popup').modal('hide');
  }

  openLogoutModal() {
    $('#logoutModal').modal('show');
  }

  goToDashboard() {
    this.broadcast.emitEvent('SelectDashboardMenu', '');
    this.routes.navigate(['./dashboard']);
  }

  ngOnDestroy() {
    if (this.sessionExpireSubscription) {
      this.sessionExpireSubscription.unsubscribe();
    }
  }

  acceptRequest() {
    
  }
}
