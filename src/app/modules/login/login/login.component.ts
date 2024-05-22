import { Component } from '@angular/core';
import { OnInit,OnDestroy,ViewChild } from 'src/app/common-imports/angular-core';
import { NgBroadcasterService,MessageType, Router,ViewMessageComponent, TranslateService } from 'src/app/common-imports/other-imports';
import { Login } from 'src/app/common-imports/model-imports';
import { Validation } from 'src/app/common-imports/constant-imports';
import { SharedService,LocalStorageService,LoginService } from 'src/app/common-imports/webservices';
import { Title } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginModel = new Login();
  @ViewChild(ViewMessageComponent, { static: false }) msgComponent;
  msgModelClass: any;
  msgModelMessage: any;
  forgotEmail: any;
  ipAddress: string;
  EmailPattern: any;
  loading = false;
  stopTime: any;
  @ViewChild('forgotPasswordForm', { static: false }) forgotPasswordForm;
  maxLoginAttempts: any;
  constructor(private routes: Router,
    private titleService: Title,
    private loginService: LoginService,
    private translate: TranslateService,
    private localStorageService: LocalStorageService,
    private broadcaster: NgBroadcasterService,
    public sharedService: SharedService) {
    let logintitle = this.translate.instant('PageTitles.Login');
    if (logintitle == 'PageTitles.Login') {
      logintitle = this.translate.instant('Resturant management');
    }
    this.titleService.setTitle(logintitle);
  }
  ngOnDestroy() {
  }

  ngOnInit() {
    this.EmailPattern = Validation.EmailPattern;
    this.maxLoginAttempts = Validation.MaxLoginAttempts;
    let isLogin = this.localStorageService.getItem('isloginuser');
    if (isLogin != null) {
      if (isLogin == 'true') {
        window.location.href = '/dashboard';
      } else {
        this.sharedService.logout('');
      }
    }

    if (this.localStorageService.getItem('userrememerdetails') && !isLogin) {
      const cookieData = this.localStorageService.getItem('userrememerdetails');
      const result = JSON.parse(cookieData);

      if (result && result.isremember) {
        this.loginModel = {
          username: result.username,
          password: result.password,
          isremember: result.isremember
        };
      }
    }
  }
  ngAfterViewInit() {
    $('.loginBgImg').parent().parent().removeClass("page-content");
  }

  getIpAddress() {
    this.loginService.getIpAddress()
      .subscribe(res => {
        this.ipAddress = res.ip;
      });
  }

  onSubmit() {
    this.loading = true;
    this.loginService.userLogin(this.loginModel).subscribe(res => {
      if (res.stateModel.statusCode === 200) {
        debugger
        if (res.result.isTempPassword) {
          this.routes.navigate(['./login/resetpassword']);
          this.localStorageService.setItem('userName', res.result.userName);
          this.localStorageService.setItem('tenantId', res.result.tenantId);
        } else {
          this.localStorageService.setItem('isloginuser', true);
          this.localStorageService.setItem('userdetails', JSON.stringify(res.result));
          //this.localStorageService.setItem('tenantshortcode', res.result.tenantShortCode);
          this.loginService.setAccessToken(res.result.accessToken);
          this.broadcaster.emitEvent('islogin', true);
          this.loading = false;
          if (this.loginModel && this.loginModel.isremember) {
            this.localStorageService.setItem('userrememerdetails', JSON.stringify(this.loginModel));
          } else {
            this.localStorageService.removeItem('userrememerdetails');
          }
          window.location.href = '/dashboard';
        }
      } else if (res.stateModel.statusCode === 401) {
        this.loading = false;
        this.sharedService.showMessage(MessageType.Error, 'Entered username/password is incorrect.');
        // let tempAttempts = this.maxLoginAttempts - res.result.attempts;
        // if (tempAttempts <= 0) {
        //   this.sharedService.showMessage(MessageType.Error, 'Your account is blocked. Please reset your password');
        // } else {
        //   this.sharedService.showMessage(MessageType.Error, 'Entered username/password is incorrect. ' + tempAttempts + ' attempts left');
        // }
      } else {
        this.loading = false;
        this.sharedService.showMessage(MessageType.Error, res.stateModel.errorMessage);
      }
    }, () => {
      this.loading=false;
      this.sharedService.showMessage(MessageType.Error, 'ResetPassword.SomethingWrongApi');
    });
  }
  checkPassword() {
    if (this.loginModel.password) {
      this.loginModel.password = null;
      this.loginModel.isremember = false;
    }
  }
  onForgotPasswordSubmit() {
    this.loading = true;
    this.loginService.forgotPassword(this.forgotEmail).subscribe(res => {
      this.loading = false;
      this.sharedService.showMessage(MessageType.Success, 'Login.ForgotPasswordMsg');
      this.stopTime = setTimeout(() => {
        this.forgotEmail = '';
        this.forgotPasswordForm.form.controls.forgetmail.touched = false;
        $('#pwdModal').modal('hide');
      }, 5000);
    });
  }

  onClose() {
    this.forgotEmail = '';
    this.forgotPasswordForm.form.controls.forgetmail.touched = false;
    this.msgModelClass = '';
    this.msgModelMessage = '';
    clearTimeout(this.stopTime);
  }
}
