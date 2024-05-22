import { Injectable } from '@angular/core';
import { UserConstant } from '../../app/constants/apiUrl.constant';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../../app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userRetainSubject = new BehaviorSubject(null);
  constructor(private apiService: ApiService) { }

  getUserList(): Observable<any> {
    return this.apiService.post(UserConstant.GetUserList, "");
  }

  getMenuList(itemSeoName: string) {
    // if (!isValidObjectWithBlank(itemSeoName)) {
    itemSeoName = 'all';
    // }
    return this.apiService.get(UserConstant.GetMenuList + "/" + itemSeoName);
  }

  // addUser(user: UserModel) {
  //   return this.apiService.post(UserConstant.AddUser, user);
  // }

  // getUserByRole(roleId: any, tenantId: any) {
  //   const obj = { RoleId: roleId, TenantId: tenantId };
  //   return this.apiService.post(UserConstant.GetUserByRole, obj);
  // }

  // updateUser(userModel: any) {
  //   return this.apiService.post(UserConstant.UpdateUser, userModel);
  // }

  // getUserDetail(userId: any, tenantId: any) {
  //   const obj = { UserGuid: userId, TenantId: tenantId };
  //   return this.apiService.post(UserConstant.GetUserDetail, obj);
  // }

  // deleteUserAddress(userGuid: any, tenantId: any, userAddressGuidList: any) {
  //   const obj = { UserGuid: userGuid, TenantId: tenantId, UserAddressGuidList: userAddressGuidList };
  //   return this.apiService.post(UserConstant.DeleteUserAddress, obj);
  // }

  // getUserType(currentPage: number, pageSize: number, tenantId: any): Observable<any> {
  //   const obj = { CurrentPage: currentPage, PageSize: pageSize, TenantId: tenantId };
  //   return this.apiService.post(UserConstant.GetUserType, obj);
  // }

  // getUserRolesByUserType(userTypeId: any, tenantId: any) {
  //   const obj = { UserTypeId: userTypeId, TenantId: tenantId };
  //   return this.apiService.post(UserConstant.GetUserRolesByUserType, obj);
  // }

  // deleteUser(userGuid: any, statusCode: any, tenantId: any): Observable<any> {
  //   const obj = { UserGuid: userGuid, StatusCode: statusCode, TenantId: tenantId };
  //   return this.apiService.post(UserConstant.UpdateUserStatus, obj);
  // }

  // getUserStatus(tenantId: any, currentPage: number, pageSize: number): Observable<any> {
  //   const obj = { TenantId: tenantId, CurrentPage: currentPage, PageSize: pageSize };
  //   return this.apiService.post(UserConstant.GetUserStatus, obj);
  // }

  // getUsersByFeatureRole(postObj: any): Observable<any> {
  //   return this.apiService.post(UserConstant.GetUsersByFeatureRole, postObj);
  // }

  // passObjToRetainUserData(userData){
  //   this.userRetainSubject.next(userData);
  // }
}
