import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnDestroy, OnInit } from 'src/app/common-imports/angular-core';
import { Validation } from 'src/app/constants/Validationvalue.constant';
import { UserModel } from 'src/app/models/user.model';
import { SharedService } from 'src/services/webservices/shared.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit, OnDestroy {
  addUserModel = new UserModel();
  NamePattern: any;
  loginUser: any;
  loading = false;
  userId: any;
  constructor(
    private routes: Router,
    public sharedService: SharedService
  ) {
  }

  ngOnInit() {
    this.NamePattern = Validation.AlphaNumericName;
    this.loginUser = this.sharedService.getUserDetails();
    if (this.userId != undefined) {
      this.getUser();
    }
  }

  getUser() {
    // this.loading = true;
    // this.itemConfigurationMgtService.getCategoryById({ tenantId: this.loginUser.tenantId, categoryId: this.categoryId }).subscribe(res => {
    //   if (res.stateModel.statusCode === 200) {
    //     this.loading = false;
    //     this.addL2ogCategoryModel = res.result;
    //   } else {
    //     this.loading = false;
    //     this.sharedService.showMessage(MessageType.Error, res.stateModel.errorMessage);
    //   }
    // }, () => {
    //   this.loading = false;
    //   this.sharedService.showMessage(MessageType.Error, 'ResetPassword.SomethingWrongApi');
    // });
  }

  onCancel() {
    window.scroll(0, 0);
    this.routes.navigate(['/user']);
  }

  isValidForm() {
    // if (isNullOrUndefined(this.addL2ogCategoryModel.categoryName)
    //   || this.addL2ogCategoryModel.categoryName == ''
    //   || !new RegExp(this.NamePattern).test(this.addL2ogCategoryModel.categoryName)) {
    //   return false;
    // } else {
    //   return true;
    // }
    return true;
  }

  onSubmit(existCategory: boolean = false) {
    // let isAddOperation=isNullOrUndefined(this.categoryId);
    // this.addL2ogCategoryModel.tenantId = this.loginUser.tenantId;
    // if (!this.categoryId) {
    //   this.addL2ogCategoryModel.creationUser = this.loginUser.userId;
    //   this.addL2ogCategoryModel.isDeleted = false;
    // }
    // this.addL2ogCategoryModel.modificationUser = this.loginUser.userId;
    // this.loading = true;
    // this.itemConfigurationMgtService.addUpdateCategory(this.addL2ogCategoryModel).subscribe(res => {
    //   if (res.stateModel.statusCode === 200) {
    //     this.categoryId =res.result.categoryId;
    //     this.getCategory();
    //     this.loading = false;
    //     if (isAddOperation) {
    //       this.sharedService.showMessage(MessageType.Success, 'ItemConfigurationManagement.CategoryAdded');
    //     } else {
    //       this.sharedService.showMessage(MessageType.Success, 'ItemConfigurationManagement.CategoryUpdated');
    //     }
    //     if (existCategory) {
    //       this.onCancel();
    //     }
    //   } else if (res.stateModel.statusCode === 208) {
    //     this.loading = false;
    //     this.sharedService.showMessage(MessageType.Warning, 'ItemConfigurationManagement.CategoryExist');
    //   } else {
    //     this.loading = false;
    //     this.sharedService.showMessage(MessageType.Error, res.stateModel.successMessage);
    //   }
    // }, () => {
    //   this.loading = false;
    //   this.sharedService.showMessage(MessageType.Error, 'ResetPassword.SomethingWrongApi');
    // });
  }


  setLabel() {

  }

  getUserList() {
  }

  private Senddata() {

  }

  ngOnDestroy() {

  }

  addUser() {

  }

}
