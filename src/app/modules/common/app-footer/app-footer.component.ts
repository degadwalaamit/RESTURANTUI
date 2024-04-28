import { Component, OnInit } from '@angular/core';
import { TranslateService,Router } from 'src/app/common-imports/other-imports';
import { SharedService,LocalStorageService } from 'src/app/common-imports/webservices';
declare var $: any;
@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html'
})
export class AppFooterComponent implements OnInit {
  tenantName: string;
  userName: string;
  languages: any[];
  selectedLanguage: any = {};

  constructor(
    private localStorageService: LocalStorageService,
    private routes: Router,
    public sharedService: SharedService,
    private translate: TranslateService) { }

    ngOnInit() {  
        
    this.languages = this.sharedService.getLanguages();
    const objUser = this.sharedService.getUserDetails();

    this.selectedLanguage = this.languages.filter(l => l.language === objUser.languageCode);
    this.useLanguage(this.selectedLanguage[0].code); // used [0] because we need only first code

    if (objUser != null || objUser !== '') {
      this.tenantName = objUser.tenantShortCode;
      this.userName = objUser.userName;
    }
  }
  
  useLanguage(code: string) {
    this.selectedLanguage = this.languages.filter(l => l.code === code)[0]; // static [0] passed as we need only 1st array
    this.translate.setDefaultLang(code);
    this.translate.use(code);
    this.localStorageService.setItem('selectedlanguage', code);
  }
 
}
