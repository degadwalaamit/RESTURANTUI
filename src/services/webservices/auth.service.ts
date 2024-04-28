import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from 'src/app/constants/apiUrl.constant';
import { AuthStorageService } from './auth-storage.service';
import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private storageService: AuthStorageService,
    private httpService: ApiService,
    private localStorageService: LocalStorageService) { }

  private getAccessRightsFromServer(path, token): Observable<any> {
    return this.httpService.get(AppConstants.BaseApiUrl + 'tenant/getAccessRights' + '?path=' + path + '&token=' + token);
  }

  getUserFeatures() {
    return this.httpService.get(AppConstants.BaseApiUrl + 'tenant/GetUserFeatures');
  }

  returnAccessValue(rights: any, type: any) {
    if (rights === undefined) {
      return false;
    } else {
      if (type != undefined && type != '') {
        let returnValue = false;
        switch (type) {
          case 'vi':
            returnValue = rights.isView;
            break;
          case 'cr':
            returnValue = rights.isCreate;
            break;
          case 'rd':
            returnValue = rights.isRead;
            break;
          case 'up':
            returnValue = rights.isUpdate;
            break;
          case 'de':
            returnValue = rights.isDelete;
            break;
          case 'sh':
            returnValue = rights.isShow;
            break;
          case 'ex':
            returnValue = rights.isExport;
            break;
          default:
            break;
        }
        return returnValue;
      }
      return true;
    }
  }

  validateAccessRights(path, type): boolean {
    if (this.localStorageService.getItem('roleFeatures') != undefined) {
      let rights = JSON.parse(this.localStorageService.getItem('roleFeatures'));
      if (type != '' && type != undefined) {
        if (type.indexOf('~') != -1) {
          path = type.split('~')[0];
          type = type.split('~')[1];
        }
      }
      rights = rights.filter(r =>  r.uniqueName != null && r.uniqueName.toLowerCase().includes(path.toLowerCase()))[0];
      return this.returnAccessValue(rights, type);
    }
    return false;
  }

  validateAccessSubRights(path, type): boolean {
    if (this.localStorageService.getItem('roleSubFeatures') != undefined) {
      let rights = JSON.parse(this.localStorageService.getItem('roleSubFeatures'));
      if (type != '' && type != undefined) {
        if (type.indexOf('~') != -1) {
          path = type.split('~')[0];
          type = type.split('~')[1];
        }
      }
      rights = rights.filter(r => r.uniqueName === path)[0];
      if (rights == undefined) { //because some of the components are not configurable so it should be pass directly.
        return true;
      }
      return this.returnAccessValue(rights, type);
    }
    return false;
  }
}
