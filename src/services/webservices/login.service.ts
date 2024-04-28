import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginConstants, UserConstant } from '../../app/constants/apiUrl.constant';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { EncryptDecryptService } from './password-encryption.service';
import { UserType } from 'src/app/constants/app.constant';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class LoginService {
  fetchIpAddress = 'https://jsonip.com';

  constructor(private apiService: ApiService, private http: HttpClient,
    private pwdEncryption: EncryptDecryptService) {
  }

  setAccessToken(token: string) {
    this.apiService.accessToken = token;
  }

  userLogin(loginData): Observable<any> {
    const formData = {
      UserName: loginData.username,
      Password: loginData.password,
      IpAddress: null,
      Attempts: 0,
      IsRemember: true,
      UserType: UserType.AdminUser
    }
    return this.apiService.authPostData(UserConstant.LoginUser, formData);
  }

  forgotPassword(forgotEmail): Observable<any> {
    const obj = { UserName: forgotEmail };
    return this.apiService.post(LoginConstants.ForgotPassword, obj);
  }

  getIpAddress() {
    return this.http.get<{ ip: string }>(this.fetchIpAddress);
  }

  logoutHistory(loginHistoryId: any, userId: any, tenantId: any) {
    const obj = { LoginHistoryId: loginHistoryId, UserId: userId, TenantId: tenantId };
    return this.apiService.post(LoginConstants.LogoutHistory, obj);
  }
}
