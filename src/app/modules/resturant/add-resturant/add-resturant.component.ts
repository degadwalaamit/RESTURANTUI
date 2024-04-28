import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnDestroy, OnInit } from 'src/app/common-imports/angular-core';
import { Validation } from 'src/app/constants/Validationvalue.constant';
import { MessageType } from 'src/app/enums/message-type.enum';
import { checkValidObject } from 'src/app/functions/util.functions';
import { AddressModel } from 'src/app/models/address.model';
import { ResturantMasterModel } from 'src/app/models/resturant.model';
import { UserModel } from 'src/app/models/user.model';
import { ResturantService } from 'src/services/webservices/resturant.service';
import { SharedService } from 'src/services/webservices/shared.service';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'app-add-resturant',
  templateUrl: './add-resturant.component.html'
})
export class AddResturantComponent implements OnInit, OnDestroy {
  resturantMasterModel = new ResturantMasterModel();
  NamePattern: any;
  loginUser: any;
  loading = false;
  resturantId: any;
  constructor(
    private routes: Router,
    private activatedRoute: ActivatedRoute,
    public sharedService: SharedService,
    private resturantService: ResturantService
  ) {
    this.resturantId = this.activatedRoute.snapshot.params.resturantId;
  }

  ngOnInit() {
    this.NamePattern = Validation.AlphaNumericName;
    this.loginUser = this.sharedService.getUserDetails();
    // if(!checkValidObject(this.resturantMasterModel.addressMaster)){
    //   this.resturantMasterModel.addressMaster = [];
    // }
    if (this.resturantId != undefined) {
      this.getResturant();
    }
  }

  getResturant() {
    this.loading = true;
    this.resturantMasterModel.resturantId = this.resturantId;
    let that = this;
    this.resturantService.getResturantList(this.resturantMasterModel).subscribe(res => {
      if (res.stateModel.statusCode === 200 && res.result != null) {
        that.loading = false;
        that.resturantMasterModel = res.result[0];
      } else {
        that.loading = false;
        that.sharedService.showMessage(MessageType.Error, res.stateModel.errorMessage);
      }
    }, () => {
      that.loading = false;
      that.sharedService.showMessage(MessageType.Error, 'ResetPassword.SomethingWrongApi');
    });
  }

  onCancel() {
    window.scroll(0, 0);
    this.routes.navigate(['/resturant']);
  }

  isValidForm() {
    // if (isNullOrUndefined(this.resturantMasterModel.categoryName)
    //   || this.resturantMasterModel.categoryName == ''
    //   || !new RegExp(this.NamePattern).test(this.resturantMasterModel.categoryName)) {
    //   return false;
    // } else {
    //   return true;
    // }
    // return true;

    if (
      !checkValidObject(this.resturantMasterModel.name)
      || this.resturantMasterModel.name == ''
      || !checkValidObject(this.resturantMasterModel.mobileNo)
      || this.resturantMasterModel.mobileNo == '') {
      return false;
    } else {
      return true;
    }
  }

  onSubmit(existCategory: boolean = false) {
    let isAddOperation = isNullOrUndefined(this.resturantId);
    if (!this.resturantId) {
      this.resturantMasterModel.createdBy = this.loginUser.userId;
      this.resturantMasterModel.isDeleted = false;
    }
    this.resturantMasterModel.modifyBy = this.loginUser.userId;
    this.loading = true;
    this.resturantService.addResturant(this.resturantMasterModel).subscribe(res => {
      if (res.stateModel.statusCode === 200) {
        this.resturantId = res.result.resturantId;
        //this.getCategory();
        this.loading = false;
        if (isAddOperation) {
          this.sharedService.showMessage(MessageType.Success, 'ResturantManagement.ResturantAdded');
        } else {
          this.sharedService.showMessage(MessageType.Success, 'ResturantManagement.ResturantUpdated');
        }
        if (existCategory) {
          this.onCancel();
        }
      } else if (res.stateModel.statusCode === 208) {
        this.loading = false;
        this.sharedService.showMessage(MessageType.Warning, 'ResturantManagement.ResturantExist');
      } else {
        this.loading = false;
        this.sharedService.showMessage(MessageType.Error, res.stateModel.successMessage);
      }
    }, () => {
      this.loading = false;
      this.sharedService.showMessage(MessageType.Error, 'ResetPassword.SomethingWrongApi');
    });
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
