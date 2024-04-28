import { Component } from '@angular/core';
import { OnDestroy, OnInit } from 'src/app/common-imports/angular-core';
import { SharedService, UserService } from 'src/app/common-imports/webservices';
import { GridData } from '../../common/grid/models/grid-data.model';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { MessageType } from 'src/app/enums/message-type.enum';
import { ColumnFormatEnum } from '../../common/grid/models/grid-column.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-User',
  templateUrl: './User.component.html'
})
export class UserComponent implements OnInit, OnDestroy {
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
  getUserListSubscription: Subscription;
  users: any = [];
  userId: any;
  constructor(
    public sharedService: SharedService,
    private translateService: TranslateService,
    private titleService: Title,
    private userService: UserService,
    private routes: Router) {
  }

  ngOnInit() {
    this.setLabel();
    this.loggedInUserDetails = this.sharedService.getUserDetails();
    this.getUserList();

  }

  setLabel() {
    this.yes = this.translateService.instant('Common.Yes');
    this.no = this.translateService.instant('Common.No');
    this.active = this.translateService.instant('Accessories.ActiveStatus');
    this.inactive = this.translateService.instant('Accessories.InActiveStatus');
    this.titleService.setTitle(this.translateService.instant('SideMenu.CategoryManagement'));
  }

  getUserList() {
    this.loading = true;
    this.getUserListSubscription = this.userService.getUserList().subscribe(results => {
      this.users = results.result;
      this.Senddata();
      this.loading = false;
    }, () => {
      this.loading = false;
      this.sharedService.showMessage(MessageType.Error, 'ResetPassword.SomethingWrongApi');
    });
  }

  private Senddata() {
    this.actualData.Data = this.users;
    this.actualData.FirstLevelColumnNames = [
      {
        ColumnClass: 'userId', isSortable: true, Name: 'userId',
        DisplayName: 'category Id', Format: ColumnFormatEnum.Id, ShowColumn: false, IsFilterable: false,
        IsPrimaryKey: true
      },
      {
        ColumnClass: 'firstName', isSortable: true, Name: 'firstName',
        DisplayName: "firstName",
        Format: ColumnFormatEnum.String, ShowColumn: true, IsFilterable: true
      },
      {
        ColumnClass: 'lastName', isSortable: true, Name: 'lastName',
        DisplayName: "lastName",
        Format: ColumnFormatEnum.String, ShowColumn: true, IsFilterable: true
      },
      {
        ColumnClass: 'email', isSortable: true, Name: 'email',
        DisplayName: "email",
        Format: ColumnFormatEnum.String, ShowColumn: true, IsFilterable: true
      },
      {
        ColumnClass: 'mobileNo', isSortable: true, Name: 'mobileNo',
        DisplayName: "mobileNo",
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
    this.actualData.addButtonName = this.translateService.instant('User.AddUser');
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
    this.actualData = { ...this.actualData, Data: this.users };
  }

  ngOnDestroy() {
    if (this.getUserListSubscription) {
      this.getUserListSubscription.unsubscribe();
    }
  }

  addUser() {
    window.scroll(0, 0);
    this.routes.navigate(['/user/add-user']);
  }

  actionData(value) {

  }

  handleEmitConfirmationEvent(event) {

  }
}
