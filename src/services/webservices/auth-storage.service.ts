import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { CookieService } from 'ngx-cookie-service';
import { EncryptDecryptService } from './password-encryption.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService extends LocalStorageService {
  constructor(@Inject(PLATFORM_ID) platformId: Object, passwordEncryption: EncryptDecryptService, private cookie: CookieService) {
    super(platformId, passwordEncryption);
  }

  getAccessToken() {
    return super.getItem('accesstoken');
  }

  getRightsToken(path) {
    let token: any;
    let userFeatures: any[];
    userFeatures = JSON.parse(this.cookie.get('userFeatures'));
    if (userFeatures) {
      token = userFeatures.find(t => t.path === path);
      if (token) {
        return token.rights;
      } else {
        return '';
      }
    }
    return super.getItem(path);
  }
}
