import { Component } from '@angular/core';
import { OnDestroy, OnInit } from 'src/app/common-imports/angular-core';
import { SharedService } from 'src/app/common-imports/webservices';
import { GridData } from '../../common/grid/models/grid-data.model';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { MessageType } from 'src/app/enums/message-type.enum';
import { ColumnFormatEnum } from '../../common/grid/models/grid-column.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ResturantService } from 'src/services/webservices/resturant.service';
import { ResturantMasterModel } from 'src/app/models/resturant.model';
import { ChildToParent } from '../../common/grid/models/child-to-parent.model';
import { ActionEnum } from 'src/app/enums/aquisition.enum';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'app-resturant',
  templateUrl: './resturant.component.html'
})
export class ResturantComponent implements OnInit, OnDestroy {
  loading = false;
  actualData: GridData = new GridData();
  title;
  message;
  yes;
  no;
  active;
  inactive;
  cancelButtonTitle;
  saveButtonTitle;
  loggedInUserDetails: any;
  getResturantListSubscription: Subscription;
  resturants: any = [];
  resturantId: any;
  resturantMasterModel: ResturantMasterModel = new ResturantMasterModel();
  constructor(
    public sharedService: SharedService,
    private translateService: TranslateService,
    private titleService: Title,
    private resturantService: ResturantService,
    private routes: Router) {
  }

  ngOnInit() {
    this.setLabel();
    this.loggedInUserDetails = this.sharedService.getUserDetails();
    this.getResturantList();

  }

  setLabel() {
    this.yes = this.translateService.instant('Common.Yes');
    this.no = this.translateService.instant('Common.No');
    this.active = this.translateService.instant('Accessories.ActiveStatus');
    this.inactive = this.translateService.instant('Accessories.InActiveStatus');
    this.titleService.setTitle(this.translateService.instant('SideMenu.CategoryManagement'));
  }

  getResturantList() {
    this.loading = true;
    this.resturantMasterModel = new ResturantMasterModel();
    this.getResturantListSubscription = this.resturantService.getResturantList(this.resturantMasterModel).subscribe(results => {
      this.resturants = results.result;
      this.Senddata();
      this.loading = false;
    }, () => {
      this.loading = false;
      this.sharedService.showMessage(MessageType.Error, 'ResetPassword.SomethingWrongApi');
    });
  }

  private Senddata() {
    this.actualData.Data = this.resturants;
    this.actualData.FirstLevelColumnNames = [
      {
        ColumnClass: 'resturantId', isSortable: true, Name: 'resturantId',
        DisplayName: 'category Id', Format: ColumnFormatEnum.Id, ShowColumn: false, IsFilterable: false,
        IsPrimaryKey: true
      },
      {
        ColumnClass: 'name', isSortable: true, Name: 'name',
        DisplayName: "name",
        Format: ColumnFormatEnum.String, ShowColumn: true, IsFilterable: true
      },
      {
        ColumnClass: 'text-center', Name: 'isActive', Format: ColumnFormatEnum.Status, isSortable: true,
        DisplayName: this.translateService.instant('ItemConfigurationManagement.Status'), ShowColumn: true, IsFilterable: true,
        CssRule: [
          { html: '<span>' + this.active + '</span>', condition: true },
          { html: '<span>' + this.inactive + '</span>', condition: false }
        ]
      }
    ];
    this.actualData.IsSearchVisible = true;
    this.actualData.IsDataAgeingFilterVisible = false;
    this.actualData.IsColumnFilterVisible = false;
    this.actualData.DataAgeingFilterColumn = 'modifiedDate';
    this.actualData.addButtonName = this.translateService.instant('ResturantManagement.AddResturant');
    this.actualData.enableRowDoubleClick = true;
    this.actualData.useHoveringRow.enable = true;
    this.actualData.IsColumnFilterVisible = false;
    this.actualData.TableCssClass = 'table-striped';
    this.actualData.StaticImagePath = '../../assets/images/opportunity/';
    this.actualData.TableCssClass = 'table-striped';
    this.actualData.FirstLevelActions = {
      ActionClass: '', ActionIcons: [
        { Name: 'Delete', IconImage: 'delete.svg' }
      ]
    };
    this.actualData = { ...this.actualData, Data: this.resturants };
  }

  ngOnDestroy() {
    if (this.getResturantListSubscription) {
      this.getResturantListSubscription.unsubscribe();
    }
  }

  addResturant() {
    window.scroll(0, 0);
    this.routes.navigate(['/resturant/add-resturant']);
  }

  // actionData(value) {

  // }

  actionData(childToParent: ChildToParent) {
    this.resturantId = childToParent.id;
    // this.childToParent = childToParent;
    if (childToParent.action == ActionEnum.RowDoubleClicked) {
      window.scroll(0, 0);
      this.routes.navigate(['/resturant/edit-resturant/' + this.resturantId]);
    }
    if (childToParent.action == ActionEnum.Delete) {
      this.IsItemDeletable();
    }
  }

  handleEmitConfirmationEvent(event) {

  }

  IsItemDeletable() {
    this.resturantMasterModel.resturantId = this.resturantId;
    this.resturantMasterModel.isActive = false;
    this.resturantMasterModel.isDeleted = true;
    this.resturantMasterModel.modifyBy = this.loggedInUserDetails.userId;
    this.loading = true;
    this.resturantService.addResturant(this.resturantMasterModel).subscribe(res => {
      if (res.stateModel.statusCode === 200) {
        this.resturantId = res.result.resturantId;
        this.getResturantList();
        this.loading = false;
        this.sharedService.showMessage(MessageType.Success, 'ResturantManagement.ResturantDeleted');
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
}
