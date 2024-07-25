import { DatePipe } from '@angular/common';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { isNotNullOrUndefined } from '@microsoft/applicationinsights-core-js';
import { TranslateService } from '@ngx-translate/core';
import { GridOptions } from 'ag-grid-community';
import * as FileSaver from 'file-saver';
import * as _ from 'lodash';
import * as moment from 'moment';
import { NgBroadcasterService } from 'ngx-broadcaster';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CommonAppConstants, ConfirmationCode, DynamicTypeCode, UserType } from 'src/app/constants/app.constant';
import { L2ogConstants } from 'src/app/constants/l2og-constants';
import { Validation } from 'src/app/constants/Validationvalue.constant';
import { MessageType } from 'src/app/enums/message-type.enum';
import { StatusCode } from 'src/app/enums/status-code.enum';
import { AuditDetail, ColumnFilter, GridModule, SortFilter } from 'src/app/models/grid.model';
import { isNullOrUndefined } from 'util';
import * as XLSX from 'xlsx';
import { AppConstants, ListContants } from '../../app/constants/apiUrl.constant';
import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';
import { LoginService } from './login.service';
import { TableMaster } from 'src/app/models/user.model';
import { UserService } from './user.service';
import { Guid } from 'guid-typescript';
import { isValidList, isValidObject, isValidObjectWithBlank } from 'src/app/modules/common/app-helper-functions';
import { PwaOrderDetailMasterModel, PwaOrderMasterModel, TableOrderDetails } from 'src/app/models/cart.model';
import { DeliveryChargeMasterModel } from 'src/app/models/deliverychargemaster.model';
import { CustomOrderItemDetailMaster, MenuCategoryMasterModel, MenuItemMasterModel } from 'src/app/models/menu.model';
declare var $: any;

@Injectable(
  {
    providedIn: 'root'
  }
)
export class SharedService {

  public title = 'Delete Confirmation';
  public popupId = 'confirmationModal';
  public message = 'Are you sure you want to delete?';
  public cancelButtonTitle = "Cancel";
  public saveButtonTitle = "Confirm";
  public pageName = '';
  public typeOfPayment = '';
  public tableId = 0;

  public onlyNumberPattern = '[0-9]+';
  public dateFormat = 'DD/MM/YYYY';
  public calendarDateFormat = "dd/MM/yyyy";
  public onlyMonthYearFormat = "MMMM yyyy";
  public calendarDateTimeFormat = "dd/MM/yyyy hh:mm:ss";
  public oldCalendarDateFormat = 'yyyy-MM-dd';
  public checkExpandCollapse = new Subject();
  public NumbersWithOptionalDecimal = '^\\d*(\\.\\d{0,2})?$';
  public NumbersWithOptionalNoDecimal = Validation.NumbersWithOptionalDecimal;
  public percentagePattern = '[0-9]+';
  public currentDate = new Date();
  public setMinDateAsTodaysDate = new Date(new Date().setDate(new Date().getDate()));
  public tDate = this.currentDate.setDate(this.currentDate.getDate() + 1);
  public yesterDayDate = new Date(new Date().setDate(new Date().getDate() - 1));

  public tenDaysDate = this.currentDate.setDate(this.currentDate.getDate() + 9);
  public tenDaysPastDate = new Date(new Date().setDate(new Date().getDate() - 10));

  public validateEighteenYear = new Date(new Date().setDate(new Date().getUTCFullYear() - 18));
  private sendFeatureListSource = new Subject();

  public technicalData: any;
  public nextServiceDueDate: Date;
  public nextServiceDueMileage: number;
  public manufacturersWarrantyYears: number
  public manufacturersWarrantyMileage: number;
  public manufacturersWarrantyDate: Date;
  public serviceIntervalMonths: number;
  public serviceCapIntervalMonths: number;
  public serviceIntervalMileage: number;
  public serviceCapIntervalMileage: number;
  public remainingWarrantyYears: number;
  public remainingWarrantyMonths: number;
  public remainingWarrantyDays: number;
  public remainingWarrantyMileage: number;
  public isIntervalChange = false;
  public isMileageChange = false;
  public today: Date;
  public baseDegree = 167; // Retail matrix
  public baseDays = 60; // Retail matrix
  public showNextService = true;
  public menuCategoryMasterModel: MenuCategoryMasterModel[] = [];
  public menuCategoryMasterWithOutPModel: MenuCategoryMasterModel[] = [];
  public menuCustomItemMasterModel: MenuItemMasterModel[] = [];
  public menuGravyItemMasterModel: MenuItemMasterModel[] = [];
  public menuNaanItemMasterModel: MenuItemMasterModel[] = [];
  public menuSizlerItemMasterModel: MenuItemMasterModel[] = [];
  public menuSodaItemMasterModel: MenuItemMasterModel[] = [];
  public orderMasterModel = new PwaOrderMasterModel();
  public orderDetailMaster: PwaOrderDetailMasterModel[] = [];
  public deliveryChargeMasterModel: DeliveryChargeMasterModel[];
  currentFeaturelist = this.sendFeatureListSource.asObservable();
  public sendQuoteOverview = new Subject();
  currentQuoteOverview = this.sendQuoteOverview.asObservable();

  public minAgeSeventeenDate = new Date(new Date().setFullYear(new Date().getFullYear() - 17));
  addedCustomerContactPersonSubject = new Subject<any>();
  addedCustomerContactPerson = this.addedCustomerContactPersonSubject.asObservable();
  createOrderEvent: Subject<any> = new Subject<any>();
  loading = false;
  public DealerFormUploaded: Subject<any> = new Subject<any>();
  public isDealerFormUploaded = false;
  longTextPopupContent: string = null;
  longTextPopupId: string = null;
  public tableMaster: TableMaster = null;

  public totalTableArray = new Array();
  public totalTakeAwayTableArray = new Array();
  public currentSelectedObject: MenuItemMasterModel = new MenuItemMasterModel();
  public sendCartCountSubject = new Subject();
  sendCartCountObservable = this.sendCartCountSubject.asObservable();
  public tableOrderDetailModel: TableOrderDetails[] = [];
  checkExpnadCollapseUpdate() {
    return this.checkExpandCollapse.asObservable();
  }

  public validateBirthYear: any = {
    dateInputFormat: this.dateFormat,
    maxYear: new Date().getFullYear(),

    customTodayClass: 'customTodayClass',
    showWeekNumbers: false
  }

  public startdatewithoutminOptions: any = {
    dateInputFormat: this.dateFormat,
    customTodayClass: 'customTodayClass',
    showWeekNumbers: false
  };

  public startdateOptions: any = {
    dateInputFormat: this.dateFormat,
    minDate: new Date(),
    minYear: AppConstants.MinYear,
    customTodayClass: 'customTodayClass',
    showWeekNumbers: false
  };

  public quotedateOptions: any = {
    dateInputFormat: this.dateFormat,
    minDate: new Date(this.tDate),
    minYear: AppConstants.MinYear,
    customTodayClass: 'customTodayClass',
    showWeekNumbers: false
  };
  public gridCustomDate: any = {
    dateInputFormat: this.calendarDateFormat,
    todayHighlight: false,
    showWeekNumbers: false,
    placeHolder: 'dd/mm/yyyy'
  };
  public gridShowFromMonth: any = {
    minMode: 'month',
    adaptivePosition: true,
    dateInputFormat: 'MMMM yyyy',
    placeHolder: 'mm/yyyy'
  }
  public gridShowEndMonth: any = {
    minMode: 'month',
    adaptivePosition: true,
    dateInputFormat: 'MMMM yyyy',
    placeHolder: 'mm/yyyy'
  }
  public timePicker: any = {
    dateInputFormat: 'HH:mm',
    todayHighlight: false,
    showWeekNumbers: false,
    placeHolder: 'HH:mm'
  };
  public validityValidFrom: any = {
    dateInputFormat: this.dateFormat,
    minYear: AppConstants.MinYear,
    customTodayClass: 'customTodayClass',
    showWeekNumbers: false
  };

  public dateEstablished: any = {
    dateInputFormat: this.dateFormat,
    minYear: AppConstants.MinYear,
    maxDate: new Date(),
    customTodayClass: 'customTodayClass',
    showWeekNumbers: false,
  };

  public dateInvoiced: any = {
    dateInputFormat: this.dateFormat,
    minYear: AppConstants.MinYear,
    minDate: new Date(this.tenDaysPastDate),
    maxDate: new Date(this.tenDaysDate),
    customTodayClass: 'customTodayClass',
    showWeekNumbers: false,
  };

  public birthdateOptions: any = {
    dateInputFormat: this.dateFormat,
    maxDate: new Date(this.yesterDayDate),
    customTodayClass: 'customTodayClass',
    showWeekNumbers: false
  };
  //date not in the future
  public paymnetDateOptions: any = {
    dateInputFormat: this.dateFormat,
    maxDate: new Date(this.setMinDateAsTodaysDate),
    customTodayClass: 'customTodayClass',
    showWeekNumbers: false
  };
  public ageValidateMinSeventeenYear: any = {
    dateInputFormat: this.dateFormat,
    minYear: AppConstants.MinYear,
    maxDate: this.minAgeSeventeenDate,
    customTodayClass: 'customTodayClass',
    showWeekNumbers: false
  };

  public logStartDateOptions: any = {
    dateInputFormat: this.dateFormat,
    maxDate: new Date(),
    customTodayClass: 'customTodayClass',
    showWeekNumbers: false
  };

  public enddateOptions: any = {
    dateInputFormat: this.dateFormat,
    minYear: AppConstants.MinYear,
    customTodayClass: 'customTodayClass',
    showWeekNumbers: false
  };

  public hideTodayAndPreviousDate: any = {
    dateInputFormat: this.dateFormat,
    minDate: new Date(this.tDate),
    customTodayClass: 'customTodayClass',
    showWeekNumbers: false
  }

  public hidePreviousDates: any = {
    dateInputFormat: this.dateFormat,
    minDate: this.setMinDateAsTodaysDate,
    minYear: AppConstants.MinYear,
    customTodayClass: 'customTodayClass',
    showWeekNumbers: false
  };

  public orderConfirmationDate: any = {
    dateInputFormat: this.dateFormat,
    minYear: AppConstants.MinYear,
    customTodayClass: 'customTodayClass',
    showWeekNumbers: false
  };

  public gridOptions: Partial<GridOptions> = {
    cacheBlockSize: ListContants.DefaultPageSize,
    paginationPageSize: ListContants.DefaultPageSize,
    rowModelType: ListContants.DefaultRowModelType,
    infiniteInitialRowCount: 2,
    cacheOverflowSize: 2,
    maxConcurrentDatasourceRequests: 2,
    rowSelection: 'multiple',
    rowDeselection: true,
    rowBuffer: 0,
    maxColWidth: 150
  };

  public customGridOptions: Partial<GridOptions> = {
    rowModelType: ListContants.DefaultRowModelType,
    infiniteInitialRowCount: 2,
    cacheOverflowSize: 2,
    maxConcurrentDatasourceRequests: 2,
    rowSelection: 'multiple',
    rowDeselection: true,
    rowBuffer: 0,
    maxColWidth: 150
  };

  public financeDocumentconfig: any = {
    dateInputFormat: this.dateFormat,
    minYear: AppConstants.MinYear,
    customTodayClass: 'customTodayClass',
    showWeekNumbers: false
  };

  tempPageAcquisition = 0;
  pageFieldAcquisition = [];
  exactPageListAcquisition: any;
  tenantCompanyDetails;
  public isStockingPlanMenuSelected: boolean = false;
  public isCashPurchaseCompleted: boolean = false;
  private apiService: ApiService;
  private localStorageService: LocalStorageService;
  private broadcaster: NgBroadcasterService;
  private routes: Router;
  private loginService: LoginService;
  private translate: TranslateService;
  private toastr: ToastrService;
  public datepipe: DatePipe;
  public userService: UserService;

  constructor(injector: Injector) {
    this.apiService = injector.get<ApiService>(ApiService);
    this.localStorageService = injector.get<LocalStorageService>(LocalStorageService);
    this.broadcaster = injector.get<NgBroadcasterService>(NgBroadcasterService);
    this.routes = injector.get<Router>(Router);
    this.loginService = injector.get<LoginService>(LoginService);
    this.translate = injector.get<TranslateService>(TranslateService);
    this.toastr = injector.get<ToastrService>(ToastrService);
    this.datepipe = injector.get<DatePipe>(DatePipe);
    this.userService = injector.get<UserService>(UserService);
    this.today = new Date();
    this.currentSelectedObject = new MenuItemMasterModel();
  }



  validateImage(event) {
    const image = event.target.files[0];

    if (Number(image.size) > 5000000) {
      this.showMessage(MessageType.Warning, "Image size can't be more than 5 mb ");
      return false;
    }
    else if (image.type === "image/jpg" || image.type === "image/png" || image.type === "image/jpeg") {
      return true;
    }
    else {
      this.showMessage(MessageType.Warning, "Image can only be type of jpg , jpeg or png ");
      return false;
    }
  }

  logout(value) {
    this.logoutHistory(value);
  }

  logoutHistory(value) {
    this.removeLocalStorageValue();
    this.broadcaster.emitEvent('islogin', false);
    if (value == '') {
      this.routes.navigate(['']);
    } else {
      location.href = '/login';
    }
  }

  removeLocalStorageValue() {
    this.localStorageService.removeItem('isloginuser');
    this.localStorageService.removeItem('userdetails');
    this.localStorageService.removeItem('AccessToken');
    this.localStorageService.removeItem('userName');
    this.localStorageService.removeItem('AccessToken');
    this.localStorageService.removeItem('tenantId');
    this.localStorageService.removeItem('tenantshortcode');
    this.localStorageService.setItem('selectedlanguage', 'en');
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.localStorageService.removeItem('selectedUserRoleId');
    this.localStorageService.removeItem('roleFeatures');
    this.localStorageService.removeItem('getMenuByUserRole');
    this.localStorageService.removeItem('roleSubFeatures');
    this.localStorageService.removeItem('selectedUserRole');
    this.localStorageService.removeItem('isCalledUpdateFleetSelector');
    this.localStorageService.removeItem('OtrVat');
  }

  getLanguages() {
    return [
      { code: 'en', img: 'assets/images/en.png', language: 'EN' }
    ];
  }

  getUserDetails() {
    const userDetail = this.localStorageService.getItem('userdetails');
    if (isNotNullOrUndefined(userDetail) && userDetail !== '') {
      return JSON.parse(userDetail);
    }
    return null;
  }

  getUserName() {
    let userObject = this.getUserDetails();
    if (isNotNullOrUndefined(userObject)) {
      return (userObject.firstName + ' ' + userObject.lastName);
    }
    return '';
  }

  isUserLogin() {
    const userDetail = this.localStorageService.getItem('userdetails');
    if (userDetail != null && userDetail !== '' && userDetail !== undefined) {
      return true;
    }
    return false;
  }

  getAuditListObject(CurrentPage: number, PageSize: number, startDate, endDate,
    searchText, columnFilter = [], sortFilter = [], isHidden = false) {
    let gridObject = this.getListObject(CurrentPage, PageSize,
      columnFilter, sortFilter, searchText, isHidden);

    if (searchText != undefined) {
      gridObject.ColumnFilter = gridObject.ColumnFilter.filter(x => x.ColumnName != 'all');
      gridObject.searchText = searchText;
    }
    if (startDate != null) {
      gridObject.startDate = startDate;
    }
    if (endDate != null) {
      gridObject.endDate = endDate;
    }
    return gridObject;
  }

  getAuditDetailListObject(entity, entityRefId, creationDate) {
    let gridObject = new AuditDetail();

    gridObject.entity = entity;
    gridObject.entityRefId = entityRefId;
    gridObject.creationDate = creationDate;

    return gridObject;
  }

  getListObject(CurrentPage: number, PageSize: number,
    columnFilter = [], sortFilter = [], searchText, isHidden = false, isFromAcquisition = false) {
    let gridModule = new GridModule();
    gridModule.CurrentPage = CurrentPage;
    gridModule.PageSize = PageSize;
    gridModule.IsHidden = isHidden;
    let userDetail = this.getUserDetails();
    if (userDetail != null) {
      gridModule.TenantId = userDetail.tenantId;
    }
    if ((Object.keys(columnFilter).length > 0) && (searchText == undefined || searchText == '')) {
      const columnFilterList = Object.keys(columnFilter).map(key => ({ type: key, value: columnFilter[key] }));
      columnFilterList.forEach(element => {
        let filterValue = element.value.filter;
        if (element.value.filterType == 'date') {
          if (element.value.type == 'inRange') {
            filterValue = element.value.dateFrom + '~' + element.value.dateTo;
          } else {
            filterValue = element.value.dateFrom;
          }
        }
        let columnFilterObject = this.getColumnFilterObject(element.type, filterValue, element.value.filterType, element.value.type);
        gridModule.ColumnFilter.push(columnFilterObject);
      });
    }
    if (searchText != undefined && gridModule.ColumnFilter.length == 0) {
      let columnFilterObject = this.getColumnFilterObject('all', searchText, '', '');
      gridModule.ColumnFilter.push(columnFilterObject);
    }

    gridModule = this.nestedGetListObject(sortFilter, gridModule, isFromAcquisition);
    return gridModule;
  }

  nestedGetListObject(sortFilter, gridModule, isFromAcquisition) {
    if (sortFilter.length > 0) {
      sortFilter.forEach(element => {
        let sortingOrder = element.sort == 'asc' ? 1 : 0;
        let columnObject = this.getSortFilterObject(element.colId, sortingOrder, 0)
        gridModule.SortFilter.push(columnObject);
      });
    } else {
      let columnObject;
      if (!isFromAcquisition) {
        columnObject = this.getSortFilterObject("creationDate", 0, 0)
      } else {
        columnObject = this.getSortFilterObject("modifiedDate", 0, 0)
      }
      gridModule.SortFilter.push(columnObject);
    }
    return gridModule;
  }

  getColumnFilterObject(columnName = "", columnValue = "", columnType = "", operator = "") {
    let columnFilter = new ColumnFilter();
    columnFilter.ColumnName = columnName;
    columnFilter.ColumnValue = columnValue;
    columnFilter.ColumnType = this.getColumnTypeFilter(columnType);
    columnFilter.Operator = this.getColumnFilterOperator(operator);
    if (columnFilter.ColumnName == 'creationDate' || columnFilter.ColumnName == 'modifiedDate') {
      columnFilter.OffSet = new Date().getTimezoneOffset() / 60;
    }
    return columnFilter;
  }

  getSortFilterObject(columnName = "", sortingOrder = 0, priority = 0) {
    let sortFilter = new SortFilter();
    sortFilter.ColumnName = columnName;
    sortFilter.SortingOrder = sortingOrder;
    sortFilter.Priority = priority;
    return sortFilter;
  }

  getColumnFilterOperator(operatortext: string) {
    let returnValue = 0;
    switch (operatortext.toLowerCase()) {
      case 'equals':
        break;
      case 'notequals':
      case 'notequal':
        returnValue = 1;
        break;
      case 'contains':
        returnValue = 2;
        break;
      case 'notcontains':
        returnValue = 3;
        break;
      case 'startswith':
        returnValue = 4;
        break;
      case 'endswith':
        returnValue = 5;
        break;
      case 'lessthan':
        returnValue = 6;
        break;
      case 'lessthanorequal':
        returnValue = 7;
        break;
      case 'greaterthan':
        returnValue = 8;
        break;
      case 'greaterthanorequal':
        returnValue = 9;
        break;
      case 'inrange':
        returnValue = 10;
        break;
      default:
        returnValue = 2;
        break;
    }
    return returnValue;
  }

  getColumnTypeFilter(columntypetext: string) {
    let returnValue = 0;
    switch (columntypetext.toLowerCase()) {
      case 'text':
        returnValue = 0;
        break;
      case 'number':
        returnValue = 1;
        break;
      case 'date':
        returnValue = 2;
        break;
      case 'datetime':
        returnValue = 3;
        break;
      default:
        returnValue = 0;
        break;
    }
    return returnValue;
  }

  // Export to excel
  exportToExcel(data) {
    this.exportExcel(data, Date.now().toString());
  }

  exportExcel(jsonData: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }

  saveExcelFile(buffer: any, fileName: string): void {
    let fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let fileExtension = '.xlsx';
    const data: Blob = new Blob([buffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }
  // End Export to excel

  clickOnOptions(e) {
    this.broadcaster.emitEvent('showSelectedOptions', e.rowData.fleetSelectorOption);
  }

  clickOnQuotes(e) {
    this.broadcaster.emitEvent('showSelectedQuotes', e.rowData);
  }

  clickOnQuotesForAcqUser(e) {
    this.broadcaster.emitEvent('showSelectedQuotesForAcqUser', e.rowData);
  }
  clickOnCreateOrder(e) {
    this.createOrderEvent.next(e.rowData);
  }
  approvedUserValue(params) {
    if (params.getValue('approvedUser') != null && params.getValue('assignedRole') != null) {
      return params.getValue('approvedUser') + ' , ' + params.getValue('assignedRole');
    }
    return '-';
  }

  approvedByValue(params) {
    if (params.getValue('approvedBy') != null && params.getValue('assignedRole2') != null) {
      return params.getValue('approvedBy') + ' , ' + params.getValue('assignedRole2');
    }
    return '-';
  }

  getColumnDefs(pageName) {
    let columnDefs = [];
    switch (pageName) {
      case 'approvalRequestAssignment':
        {
          columnDefs = [
            {
              headerName: this.translate.instant('Otr.Vehicle'), field: 'vehicle', sortable: true, filter: true, minWidth: 700,
              filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
            },
            {
              headerName: this.translate.instant('Approval.RequesterRole'), field: 'requesterRole', sortable: true, filter: true, minWidth: 180,
              filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
            },
            {
              headerName: this.translate.instant('Approval.RequestedDate'), field: 'requestedDate2', sortable: true, filter: 'agDateColumnFilter', minWidth: 150,
              filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.dateFormatter
            },
            {
              headerName: this.translate.instant('Approval.DueDate'), field: 'dueDate2', sortable: true, filter: 'agDateColumnFilter', minWidth: 150,
              filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.dateFormatter
            },
            { field: 'approvedBy', hide: true },
            { field: 'assignedRole2', hide: true },
            {
              headerName: this.translate.instant('Approval.ApprovedBy'), sortable: true, filter: true, minWidth: 300,
              filterParams: { resetButton: true, suppressAndOrCondition: true }, colId: 'approvedBy & assignedRole2',
              valueGetter: this.approvedByValue
            },
            {
              headerName: this.translate.instant('Approval.Status'), field: 'statusName2', sortable: true, filter: true, minWidth: 200,
              filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
            },
          ];
        }
        break;

      case 'approvalRequest':
        {
          columnDefs = [
            {
              headerName: this.translate.instant('Otr.Vehicle'), field: 'vehicle', sortable: true, filter: true, minWidth: 700,
              filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
            },
            {
              headerName: this.translate.instant('Approval.AssignedTo'), field: 'assignedRole', sortable: true, filter: true, minWidth: 180,
              filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
            },
            {
              headerName: this.translate.instant('Approval.RequestedDate'), field: 'requestedDate', sortable: true, filter: 'agDateColumnFilter', minWidth: 120,
              filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.dateFormatter
            },
            {
              headerName: this.translate.instant('Approval.DueDate'), field: 'dueDate', sortable: true, filter: 'agDateColumnFilter', minWidth: 120,
              filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.dateFormatter
            },
            { field: 'approvedUser', hide: true },
            { field: 'assignedRole', hide: true },
            {
              headerName: this.translate.instant('Approval.ApprovedUser'), sortable: true, filter: true, minWidth: 300,
              filterParams: { resetButton: true, suppressAndOrCondition: true }, colId: 'approvedUser & assignedRole',
              valueGetter: this.approvedUserValue
            },
            {
              headerName: this.translate.instant('Approval.Status'), field: 'statusName', sortable: true, filter: true, minWidth: 200,
              filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
            },
          ];
        }
        break;

      case 'emailTemplate':
        {
          columnDefs = [
            {
              headerName: this.translate.instant('EmailNotification.Name'), field: 'name', sortable: true, filter: true,
              filterParams: { resetButton: true, suppressAndOrCondition: true },
              minWidth: 300, valueFormatter: this.valueFormatter
            },
            {
              headerName: this.translate.instant('EmailNotification.EntityType'), field: 'entityType', sortable: true, filter: true, minWidth: 250,
              filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
            },
            {
              headerName: this.translate.instant('EmailNotification.ContractType'), field: 'contractType', sortable: true, filter: true, minWidth: 250,
              filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
            },
            {
              headerName: this.translate.instant('EmailNotification.SenderEmail'), field: 'senderEmail', sortable: true, filter: true, minWidth: 250,
              filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
            },
          ];
        }
        break;

      case 'alertTemplate':
        {
          columnDefs = [
            {
              headerName: this.translate.instant('AlertTemplate.Name'), field: 'name', sortable: true, filter: true,
              filterParams: { resetButton: true, suppressAndOrCondition: true },
              minWidth: 300, valueFormatter: this.valueFormatter
            },
            {
              headerName: this.translate.instant('AlertTemplate.AlertType'), field: 'alertType', sortable: true, filter: true, minWidth: 250,
              filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
            },
            {
              headerName: this.translate.instant('AlertTemplate.ContractType'), field: 'contractType', sortable: true, filter: true, minWidth: 250,
              filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
            },
            {
              headerName: this.translate.instant('AlertTemplate.IsAlert'), field: 'isAlert', sortable: true,
              cellRenderer: params => {
                return `<input type='checkbox' disabled ${params.value ? 'checked' : ''} />`;
              },
              filterParams: { resetButton: true, suppressAndOrCondition: true },
              minWidth: 200, valueFormatter: this.valueFormatter
            },
            {
              headerName: this.translate.instant('AlertTemplate.Status'), field: 'status', sortable: true,
              cellRenderer: params => {
                return `<label class="switch">
                <input type="checkbox"  ${params.value ? 'checked' : ''}/>
                <span class="slider round"></span>
              </label>`;
              },
              filterParams: { resetButton: true, suppressAndOrCondition: true },
              minWidth: 150, valueFormatter: this.valueFormatter
            }
          ];
        }
        break;

      case 'documentmanagement':
        {
          columnDefs = [
            {
              headerName: this.translate.instant('DocumentManagement.Name'), field: 'name', sortable: true, filter: true,
              filterParams: { resetButton: true, suppressAndOrCondition: true },
              minWidth: 300, valueFormatter: this.valueFormatter
            },
            {
              headerName: this.translate.instant('DocumentManagement.DocumentType'), field: 'documentType', sortable: true, filter: true,
              filterParams: { resetButton: true, suppressAndOrCondition: true },
              minWidth: 250, valueFormatter: this.valueFormatter
            },
            {
              headerName: this.translate.instant('DocumentManagement.SubEntityType'), field: 'contractType', sortable: true, filter: true,
              filterParams: { resetButton: true, suppressAndOrCondition: true },
              minWidth: 250, valueFormatter: this.valueFormatter
            },
            {
              headerName: this.translate.instant('DocumentManagement.FileType'), field: 'fileType', sortable: true, filter: true,
              filterParams: { resetButton: true, suppressAndOrCondition: true },
              minWidth: 150, valueFormatter: this.valueFormatter
            }
          ];
        }
        break;
      case 'locationmanagement':
        {
          columnDefs = [
            {
              headerName: this.translate.instant('LocationManagement.LocationName'), field: 'locationName', sortable: true, filter: true,
              filterParams: { resetButton: true, suppressAndOrCondition: true },
              minWidth: 300, valueFormatter: this.valueFormatter
            },
            {
              headerName: this.translate.instant('LocationManagement.PropertyName'), field: 'propertyName', sortable: true, filter: true,
              filterParams: { resetButton: true, suppressAndOrCondition: true },
              minWidth: 300, valueFormatter: this.valueFormatter
            },
            {
              headerName: this.translate.instant('LocationManagement.PostCode'), field: 'postCode', sortable: true, filter: true,
              filterParams: { resetButton: true, suppressAndOrCondition: true },
              minWidth: 250, valueFormatter: this.valueFormatter
            },
            {
              headerName: this.translate.instant('LocationManagement.TownCity'), field: 'townCity', sortable: true, filter: true,
              filterParams: { resetButton: true, suppressAndOrCondition: true },
              minWidth: 250, valueFormatter: this.valueFormatter
            },
            {
              headerName: this.translate.instant('LocationManagement.Country'), field: 'country', sortable: true, filter: true,
              filterParams: { resetButton: true, suppressAndOrCondition: true },
              minWidth: 150, valueFormatter: this.valueFormatter
            }
          ];
        }
        break;
      case 'acquisition-list': {
        columnDefs = [
          {
            headerName: 'fleetSelectorId',
            field: 'fleetSelectorId', sortable: true, filter: true, hide: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            valueFormatter: this.valueFormatter
          },
          {
            headerName: 'Quote Ref',
            field: 'quoteRef', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            width: 120, valueFormatter: this.valueFormatter, tooltipField: 'quoteRef'
          },
          {
            headerName: 'Asset type',
            field: 'assettype', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }, hide: true,
            width: 120, valueFormatter: this.valueFormatter, tooltipField: 'assettype'
          },
          {
            headerName: 'Vehicle',
            field: 'vehicleName', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 673, valueFormatter: this.valueFormatter, tooltipField: 'vehicleName',
            cellRenderer: this.replaceContentWithGivinContent,
            replacableContent: [
              { replaceWithStart: "<span @@class >", replaceWithEnd: '</span>', customClass: 'green-text-bg', contentToReplace: 'Reserved' },
              { replaceWithStart: "<span @@class >", replaceWithEnd: '</span>', customClass: 'red-text-bg', contentToReplace: 'Vehicle Sold' }
            ]
          },
          {
            headerName: 'Options',
            width: 80,
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
              onClick: this.clickOnOptions.bind(this),
              label: 'Show options'
            }
          },
          {
            headerName: 'Condition',
            field: 'vehicleType', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            width: 130, valueFormatter: this.valueFormatter, tooltipField: 'vehicleType'
          },
          {
            headerName: 'Acquisition contract',
            field: 'acquisitionType', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 230, valueFormatter: this.valueFormatter, tooltipField: 'acquisitionType'
          },
          {
            headerName: 'Customer contract',
            field: 'contractType', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 230, valueFormatter: this.valueFormatter, tooltipField: 'contractType'
          },
          {
            headerName: 'Option',
            field: 'options', sortable: true, filter: true, hide: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 100, valueFormatter: this.valueFormatter, tooltipField: 'options'
          },
          {
            headerName: 'Monthly payment',
            field: 'monthlyPayment', sortable: true, filter: true, hide: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 111, valueFormatter: this.valueFormatter, tooltipField: 'monthlyPayment'
          },
          {
            headerName: 'Status',
            field: 'status', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 200, valueFormatter: this.valueFormatter, tooltipField: 'status'
          },
          {
            headerName: 'published',
            field: 'isPublished', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            width: 130, valueFormatter: this.valueFormatter, tooltipField: 'isPublished'
          },
          {
            headerName: 'Created date',
            field: 'creationDate', sortable: true, filter: 'agDateColumnFilter', hide: false,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 170, valueFormatter: this.utcToLocalDateFormatter, tooltipValueGetter: this.utcToLocalDateFormatter
          },
          {
            headerName: 'Modified date',
            field: 'modifiedDate', sortable: true, filter: 'agDateColumnFilter', hide: false,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 170, valueFormatter: this.utcToLocalDateFormatter, tooltipValueGetter: this.utcToLocalDateFormatter
          },
          {
            headerName: 'Expiry date',
            field: 'expiredOn', sortable: true, filter: 'agDateColumnFilter', hide: false,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 120, valueFormatter: this.dateFormatter, tooltipValueGetter: this.dateFormatter
          },
          {
            headerName: 'OTR',
            field: 'otrOfVehicle', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            width: 120, valueFormatter: this.currencyFormatter, tooltipValueGetter: this.currencyFormatter
          },
          {
            headerName: 'Created By',
            field: 'displayName', sortable: true, filter: true, hide: !this.getShowAllQuoteStatus(),
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 150, valueFormatter: this.valueFormatter, tooltipField: 'displayName'
          },
          {
            headerName: 'Overview',
            width: 91,
            cellRenderer: 'quoteButtonRenderer',
            cellRendererParams: {
              onClick: this.clickOnQuotesForAcqUser.bind(this),
              label: 'Show quotes'
            }
          },
          {
            headerName: 'Vehicle Source',
            field: 'capVehicleId', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }, hide: true,
            minWidth: 70, valueFormatter: this.valueFormatter, tooltipField: 'capVehicleId'
          },
          {
            headerName: 'Create Order',
            width: 150,
            field: 'convertToOrderBtn',
            cellRenderer: 'quoteButtonRenderer',
            cellRendererParams: {
              onClick: this.clickOnCreateOrder.bind(this),
              label: 'Create order'
            }
          },
        ]
      }
        break;
      case 'acquisition': {
        columnDefs = [
          {
            headerName: 'Id',
            field: 'vehicleId', sortable: true, filter: true, hide: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
          },
          {
            headerName: 'Make',
            field: 'makeName', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
          },
          {
            headerName: 'Range',
            field: 'rangeName', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 210, valueFormatter: this.valueFormatter
          },
          {
            headerName: 'Model',
            field: 'modelName', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 300, valueFormatter: this.valueFormatter
          },
          {
            headerName: 'Type',
            field: 'derivativeName', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 350, valueFormatter: this.valueFormatter
          }
        ]
      }
        break;
      case 'otr': {
        columnDefs = [
          {
            headerName: this.translate.instant('Otr.AcquisitionId'),
            field: 'AcquisitionId', hide: true
          },
          {
            headerName: this.translate.instant('Otr.Vehicle'),
            field: 'vehicle', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Otr.Options'),
            field: 'options', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Otr.AcquisitionContract'),
            field: 'acquisitionContract', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Otr.CustomerContract'),
            field: 'customerContract', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Otr.Discount'),
            field: 'discount', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Otr.OtrValue'),
            field: 'otrPrice', sortable: true, filter: false, valueFormatter: this.valueFormatter
          }
        ]
      }
        break;
      case 'supplier-discount-type': {
        columnDefs = [
          {
            headerName: this.translate.instant('SupplierDiscountType.SupplierAgreementTypeMainId'),
            field: 'supplierAgreementTypeMainId', hide: true
          },
          {
            headerName: this.translate.instant('SupplierDiscountType.SupplierAgreementTypeMain'),
            field: 'supplierAgreementTypeMain', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 200, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('SupplierDiscountType.PossibleCombintions'),
            field: 'discountTypeList', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 500, valueFormatter: this.valueFormatter
          }
        ];
      }
        break;
      case 'person': {
        columnDefs = [
          {
            headerName: this.translate.instant('Person.PersonId'), field: 'personId', hide: true
          },
          {
            headerName: this.translate.instant('Person.DisplayName'), field: 'displayName', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 350, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Person.PersonType'), field: 'personType', sortable: true, filter: true, hide: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Person.MobileTelephone'), field: 'mobileNo', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 250, valueFormatter: this.phoneNumberMasking
          }, {
            headerName: this.translate.instant('Login.Email'), field: 'email', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 400, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Person.PersonStatus'), field: 'personStatus', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 200, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Person.TenantId'), field: 'tenantId', hide: true
          }
        ];
      }
        break;
      case 'contractType': {
        columnDefs = [
          {
            headerName: this.translate.instant('ContractType.Name'), field: 'contractType', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 300, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('ContractType.AssetType'), field: 'assetType', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 250, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('ContractType.BusinessOrCustomer'), field: 'businessCustomer', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 300, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('ContractType.contractTypeId'), field: 'contractTypeId', sortable: true, filter: true, hide: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 250, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('ContractType.IsHidden'), field: 'IsHidden', sortable: true, filter: true, hide: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 250, valueFormatter: this.valueFormatter
          },
        ];
      }
        break;
      case 'user': {
        columnDefs = [
          {
            headerName: this.translate.instant('User.UserId'), field: 'userId', hide: true
          },
          {
            headerName: this.translate.instant('User.FirstName'), field: 'firstName', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 200, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('User.LastName'), field: 'lastName', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 200, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Login.Email'), field: 'email', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 350, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('User.Role'), field: 'userRoles', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 450, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('LocationManagement.Division'), field: 'departmentList', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 300, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('User.SignableUserName'), field: 'signableUserName', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 200, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('User.SignableEmail'), field: 'signableEmail', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 350, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Role.Status'), field: 'status', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 150, valueFormatter: this.valueFormatter
          }
        ];
      }
        break;
      case 'role': {
        columnDefs = [
          {
            headerName: this.translate.instant('Role.RoleId'), field: 'roleId', hide: true
          },
          {
            headerName: "Type", field: 'userType', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 150, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Role.Role'), field: 'role', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 250, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Role.Description'), field: 'description', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 400, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Role.Status'), field: 'status', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 150, valueFormatter: this.valueFormatter
          },
          {
            headerName: "Validity From", field: 'validFrom', sortable: true, filter: 'agDateColumnFilter', hide: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 150, valueFormatter: this.dateFormatter
          },
          {
            headerName: "Validity To", field: 'validTo', sortable: true, filter: 'agDateColumnFilter', hide: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 150, valueFormatter: this.dateFormatter
          },
          {
            headerName: this.translate.instant('Role.CreationDate'), field: 'creationDate', sortable: true,
            filter: 'agDateColumnFilter',
            minWidth: 150, filterParams: { resetButton: true, suppressAndOrCondition: true },
            valueFormatter: this.dateFormatter
          }
        ];
      }
        break;
      case 'vehicle':
        {
          columnDefs = [
            {
              headerName: this.translate.instant('Vehicle.VehicleId'), field: 'vehicleId', hide: true
            },
            {
              headerName: this.translate.instant('Vehicle.Make'), field: 'makeName', sortable: true, filter: true,
              filterParams: { resetButton: true, suppressAndOrCondition: true },
              minWidth: 200, valueFormatter: this.valueFormatter
            },
            {
              headerName: this.translate.instant('Vehicle.Model'), field: 'modelName', sortable: true, filter: true,
              filterParams: { resetButton: true, suppressAndOrCondition: true },
              minWidth: 350, valueFormatter: this.valueFormatter
            },
            {
              headerName: this.translate.instant('Vehicle.Type'), field: 'typeName', sortable: true, filter: true,
              filterParams: { resetButton: true, suppressAndOrCondition: true },
              minWidth: 400, valueFormatter: this.valueFormatter
            },
            {
              headerName: this.translate.instant('Vehicle.LicensePlate'), field: 'currentLicensePlate', sortable: true, filter: true,
              filterParams: { resetButton: true, suppressAndOrCondition: true },
              minWidth: 150, valueFormatter: this.valueFormatter
            },
            {
              headerName: this.translate.instant('Vehicle.Status'), field: 'status', sortable: true, filter: true,
              filterParams: { resetButton: true, suppressAndOrCondition: true },
              minWidth: 150, valueFormatter: this.valueFormatter
            }
          ];
        }
        break;
      case 'customer': {
        columnDefs = [
          {
            headerName: this.translate.instant('Customer.CustomerID'), field: 'customerId', hide: true
          },
          {
            headerName: this.translate.instant('Person.TenantId'), field: 'tenantId', hide: true
          },
          {
            headerName: this.translate.instant('Customer.PersonID'), field: 'personId', hide: true
          },
          {
            headerName: this.translate.instant('Customer.CompanyID'), field: 'companyId', hide: true
          },
          {
            headerName: this.translate.instant('Customer.CustomerStatusId'), field: 'customerStatusId', hide: true
          },
          {
            headerName: this.translate.instant('Customer.BusinessConsumer'), field: 'businessConsumer', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 250, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Person.DisplayName'), field: 'displayName', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 300, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Customer.PhoneNumber'), field: 'phoneNumber', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 250, valueFormatter: this.phoneNumberMasking
          },
          {
            headerName: this.translate.instant('Customer.CustomerStatus'), field: 'customerStatus', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 170, valueFormatter: this.valueFormatter
          }
        ];
      }
        break;
      case 'company': {
        columnDefs = [
          {
            headerName: this.translate.instant('Company.CompanyName'), field: 'name', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 250, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Company.CompanyType'), field: 'companyType', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 350, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Company.City'), field: 'city', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 150, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Company.Email'), field: 'email', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 250, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Company.Telephone'), field: 'telephone', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 170, valueFormatter: this.phoneNumberMasking
          },
          {
            headerName: this.translate.instant('Company.Status'), field: 'companyStatus', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 150, valueFormatter: this.valueFormatter
          }
        ];
      }
        break;
      case 'AMTGroupcompany': {
        columnDefs = [
          {
            headerName: this.translate.instant('Company.CompanyName'), field: 'name', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 250, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Company.RegistrationNo'), field: 'companyRegistrationNumber', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 350, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Company.VATNo'), field: 'vatNumber', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 150, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Company.Status'), field: 'companyStatus', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 150, valueFormatter: this.valueFormatter
          }
        ];
      }
        break;
      case 'supplier': {
        columnDefs = [
          {
            headerName: "Supplier Id", field: 'supplierId', hide: true
          },
          {
            headerName: "Tenant Id", field: 'tenantId', hide: true
          },
          {
            headerName: "Company Id", field: 'companyId', hide: true
          },
          {
            headerName: "Status Id", field: 'supplierStatusId', hide: true
          },
          {
            headerName: "Supplier Name", field: 'name', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 250, valueFormatter: this.valueFormatter
          },
          {
            headerName: "Supplier Type", field: 'supplierType', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 250, valueFormatter: this.valueFormatter
          },
          {
            headerName: "Email", field: 'email', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 250, valueFormatter: this.valueFormatter
          },
          {
            headerName: "Phone Number", field: 'phoneNumber', sortable: true,
            filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 150, valueFormatter: this.phoneNumberMasking
          },
          {
            headerName: "Validity From", field: 'validFrom', sortable: true, filter: 'agDateColumnFilter', hide: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 150, valueFormatter: this.dateFormatter
          },
          {
            headerName: "Validity To", field: 'validTo', sortable: true, filter: 'agDateColumnFilter', hide: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 150, valueFormatter: this.dateFormatter
          },
          {
            headerName: "Status", field: 'supplierStatus', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            maxWidth: 140, valueFormatter: this.valueFormatter
          }
        ];
      }
        break;
      case 'supplierAgreementDealer':
      case 'supplierAgreement': {
        columnDefs = [
          {
            headerName: this.translate.instant('Supplier.SupplierAgreementId'), field: 'supplierAgreementId', sortable: true, filter: true, hide: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }
          },
          {
            headerName: this.translate.instant('Supplier.SupplierAgreementType'), field: 'supplierAgreementType', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Supplier.SupplierAgreementStatus'), field: 'supplierAgreementStatus', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Supplier.Remarks'), field: 'remarks', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Person.ValidFrom'), field: 'validFrom', sortable: true, filter: 'agDateColumnFilter', hide: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            valueFormatter: this.dateFormatter
          },
          {
            headerName: this.translate.instant('Person.ValidTo'), field: 'validTo', sortable: true, filter: 'agDateColumnFilter', hide: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            valueFormatter: this.dateFormatter
          }
        ];
      }
        break;
      case 'componenttype': {
        columnDefs = [
          {
            headerName: this.translate.instant('ComponentType.ComponentId'), field: 'componentId', sortable: true, filter: true, hide: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }
          },
          {
            headerName: this.translate.instant('ComponentType.Name'), field: 'name', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 500, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('ComponentType.ComponentType'), field: 'componentType', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 500, valueFormatter: this.valueFormatter
          }
        ];
      }
        break;
      case 'subcomponenttype': {
        columnDefs = [
          {
            headerName: this.translate.instant('SubComponentType.SubComponentId'), field: 'SubComponentId', sortable: true, filter: true, hide: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }
          },
          {
            headerName: this.translate.instant('SubComponentType.Name'), field: 'subComponentName', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 250, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('SubComponentType.AssetType'), field: 'assetType', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 250, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('SubComponentType.FirstDimension'), field: 'firstDimension', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 250, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('SubComponentType.SecondDimension'), field: 'secondDimension', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 250, valueFormatter: this.valueFormatter
          }
        ];
      }
        break;
      case 'multi-tenent-company': {
        columnDefs = [
          {
            headerName: this.translate.instant('MultiTenantCompany.CompanyId'), field: 'companyId', sortable: true, filter: true, hide: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }
          },
          {
            headerName: this.translate.instant('MultiTenantCompany.Name'), field: 'name', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 200, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('MultiTenantCompany.LegalEntity'), field: 'legalEntity', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 250, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('MultiTenantCompany.Telephone'), field: 'telephone', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 150, valueFormatter: this.phoneNumberMasking
          },
          {
            headerName: this.translate.instant('MultiTenantCompany.Email'), field: 'email', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 210, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('MultiTenantCompany.AccountManager'), field: 'accountManager', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 200, valueFormatter: this.valueFormatter
          },
        ];
      }
        break;
      case 'AuditTrail': {
        columnDefs = [
          {
            headerName: 'Entity Reference', field: 'entityRefId', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            valueFormatter: this.valueFormatter, minWidth: 300
          },
          {
            headerName: 'Entity', field: 'entity', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            valueFormatter: this.valueFormatter
          },
          {
            headerName: 'Entity name', field: 'logEntityName', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            valueFormatter: this.valueFormatter
          },
          {
            headerName: 'User', field: 'user', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            valueFormatter: this.valueFormatter, minWidth: 250
          },
          {
            headerName: 'Action', field: 'action', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            valueFormatter: this.valueFormatter
          },
          {
            headerName: 'Activity time', field: 'creationDate', sortable: true, filter: 'agDateColumnFilter',
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            valueFormatter: this.datetimeFormatter, minWidth: 180
          }
        ];
      }
        break;
      case 'accessories': {
        columnDefs = [
          {
            headerName: 'Name', field: 'name', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 300, valueFormatter: this.valueFormatter
          },
          {
            headerName: 'Accessories Type', field: 'accessoryType', sortable: true, filter: true, minWidth: 250,
            filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
          },
          {
            headerName: 'Description', field: 'description', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 450, valueFormatter: this.valueFormatter
          },
          {
            headerName: this.translate.instant('Accessories.SalesPrice'), field: 'salesPrice', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 150, valueFormatter: this.currencyFormatter
          }
        ];
      }
        break;
      case 'accessoriestypes': {
        columnDefs = [
          {
            headerName: 'accessoriesTypesID', field: 'accessoryTypeId', sortable: true, filter: true, hide: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }
          },
          {
            headerName: 'Name', field: 'accessoryType', sortable: true, filter: true, minWidth: 350,
            filterParams: { resetButton: true, suppressAndOrCondition: true }
          },
          {
            headerName: 'Description', field: 'accessoryDescription', sortable: true, filter: true, minWidth: 800,
            filterParams: { resetButton: true, suppressAndOrCondition: true }, valueFormatter: this.valueFormatter
          },
          {
            headerName: 'Status', field: 'statusName', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 150
          },


        ];
      }
        break;
      case 'vat': {
        columnDefs = [
          {
            headerName: 'VatRuleId', field: 'vatRuleId', sortable: true, filter: true, hide: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }
          },
          {
            headerName: this.translate.instant('VatRule.Jurisdiction'), field: 'jurisdiction', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }, minWidth: 280
          },
          {
            headerName: this.translate.instant('VatRule.TaxCode'), field: 'taxCode', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }, minWidth: 250
          },
          {
            headerName: this.translate.instant('VatRule.TaxRegime'), field: 'taxRegime', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }, minWidth: 330
          },
          {
            headerName: this.translate.instant('VatRule.VATTariff'), field: 'percentage', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }, minWidth: 250
          },
          {
            headerName: this.translate.instant('VatRule.ValidFrom'), field: 'validFrom', sortable: true, filter: 'agDateColumnFilter',
            filterParams: { resetButton: true, suppressAndOrCondition: true }, minWidth: 280,
            valueFormatter: this.dateFormatter
          },
          {
            headerName: this.translate.instant('VatRule.ValidTo'), field: 'validTo', sortable: true, filter: 'agDateColumnFilter',
            filterParams: { resetButton: true, suppressAndOrCondition: true }, minWidth: 230,
            valueFormatter: this.dateFormatter
          }
        ];
      }
        break;
      case 'sale-acquisition-list': {
        columnDefs = [
          {
            headerName: 'fleetSelectorId',
            field: 'fleetSelectorId', sortable: true, filter: true, hide: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            valueFormatter: this.valueFormatter
          },
          {
            headerName: 'Quote Ref',
            field: 'quoteRef', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            width: 120, valueFormatter: this.valueFormatter, tooltipField: 'quoteRef'
          },
          {
            headerName: 'Asset type',
            field: 'assettype', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }, hide: true,
            width: 120, valueFormatter: this.valueFormatter, tooltipField: 'assettype'
          },
          {
            headerName: 'Vehicle',
            field: 'vehicleName', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 673, valueFormatter: this.valueFormatter, tooltipField: 'vehicleName'
          },
          {
            headerName: 'Options',
            width: 80,
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
              onClick: this.clickOnOptions.bind(this),
              label: 'Show options'
            }
          },
          {
            headerName: 'Condition',
            field: 'vehicleType', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            width: 130, valueFormatter: this.valueFormatter, tooltipField: 'vehicleType'
          },
          {
            headerName: 'Customer contract',
            field: 'contractType', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 230, valueFormatter: this.valueFormatter, tooltipField: 'contractType'
          },
          {
            headerName: 'Status',
            field: 'status', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 200, valueFormatter: this.valueFormatter, tooltipField: 'status'
          },
          {
            headerName: 'published',
            field: 'isPublished', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            width: 130, valueFormatter: this.valueFormatter, tooltipField: 'isPublished'
          },
          {
            headerName: 'Created date',
            field: 'creationDate', sortable: true, filter: 'agDateColumnFilter', hide: false,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 170, valueFormatter: this.utcToLocalDateFormatter, tooltipValueGetter: this.utcToLocalDateFormatter
          },
          {
            headerName: 'Modified date',
            field: 'modifiedDate', sortable: true, filter: 'agDateColumnFilter', hide: false,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 170, valueFormatter: this.utcToLocalDateFormatter, tooltipValueGetter: this.utcToLocalDateFormatter
          },
          {
            headerName: 'Expiry date',
            field: 'expiredOn', sortable: true, filter: 'agDateColumnFilter', hide: false,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 68, valueFormatter: this.dateFormatter, tooltipValueGetter: this.dateFormatter
          },
          {
            headerName: 'OTR',
            field: 'otrOfVehicle', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            width: 120, valueFormatter: this.currencyFormatter, tooltipValueGetter: this.currencyFormatter
          },
          {
            headerName: 'Created By',
            field: 'displayName', sortable: true, filter: true, hide: !this.getShowAllQuoteStatus(),
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 150, valueFormatter: this.valueFormatter, tooltipField: 'displayName'
          },
          {
            headerName: 'Overview',
            width: 91,
            cellRenderer: 'quoteButtonRenderer',
            cellRendererParams: {
              onClick: this.clickOnQuotes.bind(this),
              label: 'Show quotes'
            }
          },
          {
            headerName: 'Added By',
            field: 'addedBy', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 100, valueFormatter: this.valueFormatter, tooltipField: 'addedBy'
          },
          {
            headerName: 'Vehicle Source',
            field: 'capVehicleId', sortable: true, filter: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true }, hide: true,
            minWidth: 70, valueFormatter: this.valueFormatter, tooltipField: 'capVehicleId'
          },
          {
            headerName: 'Option',
            field: 'options', sortable: true, filter: true, hide: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 100, valueFormatter: this.valueFormatter, tooltipField: 'options'
          },
          {
            headerName: 'Monthly payment',
            field: 'monthlyPayment', sortable: true, filter: true, hide: true,
            filterParams: { resetButton: true, suppressAndOrCondition: true },
            minWidth: 111, valueFormatter: this.valueFormatter, tooltipField: 'monthlyPayment'
          }
        ]
      }
        break;

      default:
        break;
    }
    return columnDefs;
  }

  dateFormatter(params, isParmsNotHavingValue: boolean = false) {
    if (!isParmsNotHavingValue && params.value != null && params.value != '') {
      return moment(params.value).format('DD/MM/YYYY');
    } else if (params != null && params != '' && isParmsNotHavingValue) {
      return moment(params).format('DD/MM/YYYY');
    }
    else {
      return '-';
    }
  }

  utcToLocalDateFormatter(params) {
    if (params.value != null && params.value != '') {
      var newDate = new Date(new Date(params.value).getTime() - new Date(params.value).getTimezoneOffset() * 60 * 1000);
      return moment(newDate).format('DD/MM/YYYY, h:mm a');
    }
    else {
      return '-';
    }
  }
  getUTCToLocalDate(date) {
    return new DatePipe("en-US").transform(date, 'dd/MM/yyyy, h:mm a')
  }
  getShowAllQuoteStatus(): boolean {
    if (this.localStorageService.getItem('IsShowAllQuotesVisible') == 'true') {
      return true;
    }
    return false;
  }

  dateFormatterForComment(date) {
    return moment(date).format('h:mm a MMM DD,YYYY');
  }
  currencyFormatter(params) {
    if (params.value != null && params.value != undefined && params.value != '') {
      return '£ ' + parseFloat(params.value).toFixed(2);
    }
    else {
      return '-';
    }
  }

  currencyFormat(params) {
    if (isNotNullOrUndefined(params) && params != '') {
      return this.setCurrencySymbol() + ' ' + parseFloat(params).toFixed(2);
    } else {
      return this.setCurrencySymbol() + ' ' + parseFloat('0').toFixed(2);
    }
  }

  valueFormatter(params) {
    if (params.value != null && params.value != '' && params.value != undefined) {
      return params.value;
    } else {
      return '-';
    }
  }

  replaceContentWithGivinContent(params) {
    if (isNotNullOrUndefined(params.value)) {
      if (isNotNullOrUndefined(params.colDef.replacableContent)) {
        params.colDef.replacableContent.forEach(element => {
          if (params.value.includes(element.contentToReplace)) {
            element.replaceWithStart = element.replaceWithStart.replace(CommonAppConstants.ReplaceClassAt, isNotNullOrUndefined(element.customClass) ? CommonAppConstants.AppendClassStr + "" + element.customClass + "" : '')
            params.value = params.value.replace(element.contentToReplace, element.replaceWithStart + element.contentToReplace + element.replaceWithEnd);
          }
        });
      }
    }
    return params.value;
  }

  convertToFloat(value) {
    if (value == null || value.toString() == '') {
      return 0;
    }
    else {
      let res = parseFloat(parseFloat(value).toFixed(10));
      return !isNaN(res) ? res : 0;
    }
  }

  phoneNumberMasking(params, isFromHtml: boolean = false) {
    if (isFromHtml) {
      params = { value: params }
    }
    if (params.value != null && params.value != '' && params.value != undefined) {
      let firstPart = params.value.substring(0, 5);
      let secondPart = params.value.substring(5, 11);
      params.value = (firstPart + ' ' + secondPart);
      return params.value;
    } else {
      return '-';
    }
  }

  toFixed2(value) {
    if (value == undefined || value == null || value == '') {
      value = 0;
    }
    return parseFloat(parseFloat(value).toFixed(2));
  }

  toFixed4(value) {
    if (value == undefined || value == null || value == '') {
      value = 0;
    }
    return parseFloat(parseFloat(value).toFixed(4));
  }

  toFixed2String(value) {
    if (value == undefined || value == null || value == '') {
      value = 0;
    }
    return parseFloat(value).toFixed(2);
  }

  datetimeFormatter(params) {
    if (params.value != undefined)
      return moment(params.value).format('DD/MM/YYYY hh:mm:ss');
    else
      return '-';
  }

  // convert today's date into 'yyyy-mm-dd' format
  modifyTodayDate() {
    const today = new Date();
    const date = ('0' + (today.getDate())).slice(-2);
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const year = today.getFullYear();
    return year + '-' + month + '-' + date;
  }

  modifyTodayDateTime() {
    const today = new Date();
    const date = ('0' + (today.getDate())).slice(-2);
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const year = today.getFullYear();
    const hours = today.getHours();
    const mins = today.getMinutes();
    const sec = today.getSeconds();
    return year + '-' + month + '-' + date + ' ' + hours + ':' + mins + ':' + sec;
  }

  setAccordianCollapse() {
    $('.collapse.show').each(function () {
      $(this).prev('.card-header').find('.ic').removeClass('btn-icon-plus').addClass('btn-icon-minus');
      $(this).prev('.card-header').find('.showmore').removeClass('d-block').addClass('d-none');
      $(this).prev('.card-header').find('.showless').removeClass('d-none').addClass('d-block');
    });

    $('.collapse')
      .on('show.bs.collapse', function () {
        $(this).prev('.card-header').find('.ic').removeClass('btn-icon-plus').addClass('btn-icon-minus');
        $(this).prev('.card-header').find('.showmore').removeClass('d-block').addClass('d-none');
        $(this).prev('.card-header').find('.showless').removeClass('d-none').addClass('d-block');
      })
      .on('hide.bs.collapse', function () {
        $(this).prev('.card-header').find('.ic').removeClass('btn-icon-minus').addClass('btn-icon-plus');
        $(this).prev('.card-header').find('.showmore').removeClass('d-none').addClass('d-block');
        $(this).prev('.card-header').find('.showless').removeClass('d-block').addClass('d-none');
      });
  }

  showMessage(type, message, title = '') {
    message = this.translate.instant(message);
    switch (type) {
      case MessageType.Success:
        this.showSuccess(message, title);
        break;
      case MessageType.Error:
        this.showError(message, title);
        break;
      case MessageType.Warning:
        this.showWarning(message);
        break;
      case MessageType.Information:
        this.showInfo(message);
        break;
    }
  }

  showSuccess(message, title = '') {
    this.toastr.success(message, title, {
      progressBar: true
    });
  }

  showError(message, title = '') {
    this.toastr.error(message, title, {
      progressBar: true
    });
  }

  showInfo(message) {
    this.toastr.info(message, '', {
      progressBar: true
    });
  }

  showWarning(message) {
    this.toastr.warning(message, '', {
      progressBar: true
    });
  }

  showMoreOnTab(basicInfoId, iconId, showMoreId, showLessId) {
    if (document.getElementById(basicInfoId) != null)
      document.getElementById(basicInfoId).className = 'collapse show';
    if (document.getElementById(iconId) != null)
      document.getElementById(iconId).className = 'ic btn-icon-minus';
    if (document.getElementById(showMoreId) != null)
      document.getElementById(showMoreId).className = 'showmore float-right d-none';
    if (document.getElementById(showLessId) != null)
      document.getElementById(showLessId).className = 'showless float-right d-block';
  }

  showLessOnTab(targetId, iconId, showMoreId, showLessId) {
    if (document.getElementById(targetId) != null)
      document.getElementById(targetId).classList.remove("show");

    if (document.getElementById(iconId) != null)
      document.getElementById(iconId).className = 'ic btn-icon-plus';

    if (document.getElementById(showMoreId) != null) {
      document.getElementById(showMoreId).classList.remove('d-none');
      document.getElementById(showMoreId).classList.add('d-block');
    }

    if (document.getElementById(showLessId) != null) {
      document.getElementById(showLessId).classList.remove('d-block');
      document.getElementById(showLessId).classList.add('d-none');
    }
  }

  getFiteredObject(object: any, filterObect, searchText) {
    let returnObject = object;
    if (Object.keys(filterObect).length > 0) {
      const columnFilterList = Object.keys(filterObect).map(key => ({ type: key, value: filterObect[key] }));
      columnFilterList.forEach(element => {
        switch (element.type.toLowerCase()) {
          case 'makename':
            returnObject = this.getFilterForMakeName(returnObject, element);
            break;
          case 'rangename':
            returnObject = this.getFilterForRangeName(returnObject, element);
            break;
          case 'modelname':
            returnObject = this.getFilterForModelName(returnObject, element);
            break;
          case 'derivativename':
            returnObject = this.getFilterForDerivativeName(returnObject, element);
            break;
          default:
            break;
        }
      });
    } else if (searchText != '' && searchText != undefined) {
      searchText = this.getTrimAndLower(searchText);
      returnObject = returnObject.
        filter(x => ((this.getTrimAndLower(x.makeName).indexOf(searchText) > -1)
          || (this.getTrimAndLower(x.rangeName).indexOf(searchText) > -1)
          || (this.getTrimAndLower(x.modelName).indexOf(searchText) > -1)
          || (this.getTrimAndLower(x.derivativeName).indexOf(searchText) > -1)));
    }
    return returnObject;
  }


  getSortObject(object: any, sortObect) {
    let returnObject = object;
    if (Object.keys(sortObect).length > 0) {
      const columnSortList = Object.keys(sortObect).map(key => ({ type: key, value: sortObect[key] }));
      columnSortList.forEach(element => {
        switch (element.value.colId.toLowerCase()) {
          case 'rangename':
            {
              if (element.value.sort == 'asc')
                returnObject = _.sortBy(object, o => this.getTrimAndLower(o.rangeName))
              else
                returnObject = _.sortBy(object, o => this.getTrimAndLower(o.rangeName)).reverse()
            }
            break;
          case 'modelname':
            {
              if (element.value.sort == 'asc')
                returnObject = _.sortBy(object, o => this.getTrimAndLower(o.modelName))
              else
                returnObject = _.sortBy(object, o => this.getTrimAndLower(o.modelName)).reverse()
            }
            break;
          case 'derivativename':
            {
              returnObject = this.nestedGetListObject(element, returnObject, object);
            }
            break;
          default:
            break;
        }
      });
    }
    return returnObject;
  }

  nestedGetSortObj(element, returnObject, object) {
    if (element.value.sort == 'asc')
      returnObject = _.sortBy(object, o => this.getTrimAndLower(o.derivativeName))
    else
      returnObject = _.sortBy(object, o => this.getTrimAndLower(o.derivativeName)).reverse()
    return returnObject;
  }

  getTrimAndLower(inputString: string) {
    inputString = inputString.toLowerCase().trim();
    return inputString;
  }

  getFilterForMakeName(returnObject: any, filterObect) {
    let searchText = filterObect.value.filter.toLowerCase();
    let operatorText = filterObect.value.type;
    switch (operatorText.toLowerCase()) {
      case 'equals':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.makeName) == searchText);
        break;
      case 'notequals':
      case 'notequal':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.makeName) !== searchText);
        break;
      case 'contains':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.makeName).indexOf(searchText) > -1);
        break;
      case 'notcontains':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.makeName).indexOf(searchText) == -1);
        break;
      case 'startswith':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.makeName).startsWith(searchText));
        break;
      case 'endswith':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.makeName).endsWith(searchText));
        break;
    }
    return returnObject;
  }

  getFilterForRangeName(returnObject: any, filterObect) {
    let searchText = filterObect.value.filter.toLowerCase();
    let operatorText = filterObect.value.type;
    switch (operatorText.toLowerCase()) {
      case 'equals':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.rangeName) == searchText);
        break;
      case 'notequals':
      case 'notequal':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.rangeName) !== searchText);
        break;
      case 'contains':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.rangeName).indexOf(searchText) > -1);
        break;
      case 'notcontains':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.rangeName).indexOf(searchText) == -1);
        break;
      case 'startswith':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.rangeName).startsWith(searchText));
        break;
      case 'endswith':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.rangeName).endsWith(searchText));
        break;
    }
    return returnObject;
  }

  getFilterForModelName(returnObject: any, filterObect) {
    let searchText = filterObect.value.filter.toLowerCase();
    let operatorText = filterObect.value.type;
    switch (operatorText.toLowerCase()) {
      case 'equals':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.modelName) == searchText);
        break;
      case 'notequals':
      case 'notequal':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.modelName) !== searchText);
        break;
      case 'contains':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.modelName).indexOf(searchText) > -1);
        break;
      case 'notcontains':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.modelName).indexOf(searchText) == -1);
        break;
      case 'startswith':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.modelName).startsWith(searchText));
        break;
      case 'endswith':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.modelName).endsWith(searchText));
        break;
    }
    return returnObject;
  }

  getFilterForDerivativeName(returnObject: any, filterObect) {
    let searchText = filterObect.value.filter.toLowerCase();
    let operatorText = filterObect.value.type;
    switch (operatorText.toLowerCase()) {
      case 'equals':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.derivativeName) == searchText);
        break;
      case 'notequals':
      case 'notequal':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.derivativeName) !== searchText);
        break;
      case 'contains':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.derivativeName).indexOf(searchText) > -1);
        break;
      case 'notcontains':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.derivativeName).indexOf(searchText) == -1);
        break;
      case 'startswith':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.derivativeName).startsWith(searchText));
        break;
      case 'endswith':
        returnObject = returnObject.filter(x => this.getTrimAndLower(x.derivativeName).endsWith(searchText));
        break;
    }
    return returnObject;
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  setMinimumSelectionDate(validFrom: Date) {
    let nDate = new Date(validFrom);
    let endDateDisable = new Date(
      nDate.getFullYear(),
      nDate.getMonth(),
      nDate.getDate()
    );
    this.enddateOptions = {
      dateInputFormat: this.dateFormat,
      minDate: endDateDisable,
      minYear: AppConstants.MinYear,
      customTodayClass: 'customTodayClass',
      showWeekNumbers: false
    }
  }

  convertUTC(date) {
    if (date == null)
      return null;
    else if (date == 'Invalid Date')
      return undefined;
    date = new Date(date);
    var now_utc = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    return new Date(now_utc.getTime() - date.getTimezoneOffset() * 60 * 1000);
  }

  convertUTCDateTime(date) {
    if (date == null)
      return null;
    date = new Date(date);
    var now_utc = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
    return new Date(now_utc.getTime() - date.getTimezoneOffset() * 60 * 1000);
  }

  getUtcDateTimeFromCurrent(date) {
    if (date == null) {
      return null;
    }
    return (<Date>date).toISOString()
  }

  convertUTCDateTimeToLocal(date) {
    date = this.replaceZInString(date);
    return this.convertUTCDateTime(date)
  }

  public formatDate2(date: any) {
    if (date) {
      let d1 = new Date(date);
      return Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours(), d1.getMinutes(), d1.getSeconds());
    }
  }

  transformDateFormat(inputDate) {
    if (inputDate != 'Invalid Date') {
      return this.datepipe.transform(inputDate, 'yyyy-MM-dd');
    }
  }

  convertUTCToLocal(date: Date): Date | null {
    if (date == null) return null;
    let newDate = new Date(date);
    newDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return newDate;
  }

  acquisitionFleetSelectorPagination() {
    if (this.tempPageAcquisition == 0) {
      this.pageFieldAcquisition = [];
      for (let a = 0; a < this.exactPageListAcquisition; a++) {
        this.pageFieldAcquisition[a] = this.tempPageAcquisition + 1;
        this.tempPageAcquisition = this.tempPageAcquisition + 1;
      }
    }
  }

  convertUTCDateIfNotnull(date: Date) {
    if (!isNullOrUndefined(date)) {
      return this.convertUTC(date);
    }
    return null;
  }

  convertUTCDateTimeIfNotnull(date: Date) {
    if (!isNullOrUndefined(date)) {
      return new Date(date);
    }
    return null;
  }

  dateColumnFilterParams(filterLocalDateAtMidnight, cellValue) {
    const dateAsString = cellValue;
    const dateParts = dateAsString.split('/');
    const cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  }

  getOptionBasicAndVatAmount(subCatId, optionId) {
    let optionbvlaue = 0;
    let optionvvalue = 0;
    let objectValue = this.localStorageService.getItem('optionPricedDetails');
    if (objectValue != undefined && objectValue != null && objectValue != '') {
      let jObject = JSON.parse(objectValue);
      jObject.forEach(category => {
        category.optionSubCategory.forEach(subcategory => {
          if (subcategory.catCode == subCatId) {
            subcategory.optionDetail.forEach(option => {
              if (option.optionCode == optionId) {
                optionbvlaue = option.optionBasic
                optionvvalue = option.optionVAT;
              }
            });
          }
        });
      });
    }
    return optionbvlaue + "~" + optionvvalue;
  }

  numberMobile(e) {
    e.target.value = e.target.value.replace(/[^\d]/g, '');
    return false;
  }

  onlyNumberKey(event) {
    return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  numbersWithOptionalDecimal(e1, event) {
    const indexOfDash = event.target.value.indexOf('-');
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;
    if (event.target.value.substr(start, end - start) != '' && start == 0) {
      // if whole textbox value is selected and you enter any digit then textbox will be reset first
      e1 = '';
      event.target.value = '';
    } else if (event.target.value.substr(start, end - start) != '' && start != 0) {
      // if some textbox value is selected and you enter any digit then that value will be reset first
      e1 = e1.toString().substr(0, start);
      event.target.value = event.target.value.substr(0, start);
    }
    if (e1 == null) {
      e1 = event.target.value;
    }
    var valid = event.charCode == 46 ||
      event.charCode == 45 || (event.charCode >= 48 && event.charCode <= 57);
    if (!valid) {
      event.stopPropagation();
      event.preventDefault();
    }
    if (e1 !== null && e1 != "" && valid && e1.toString().indexOf('.') > -1) {
      this.nestedNumbersWithOptionalDecimal(e1, event);
    }
    // remove dash or minus sign from input
    if (start != 0 && event.target.value.match('-') && indexOfDash == 0) { // remove minus or dash from first position
      e1 = event.target.value.substring(1);
      event.target.value = event.target.value.substring(1);
    } else if (start != 0 && event.target.value.match('-') && indexOfDash != 0) { // remove minus or dash from any position
      e1 = event.target.value.replace('-', '');
      event.target.value = event.target.value.replace('-', '');
    }
  }

  nestedNumbersWithOptionalDecimal(e1, event) {
    var number = e1.toString().split('.');
    if (number != undefined || number != null) {
      if (number.length > 1 && event.charCode == 46) {
        event.stopPropagation();
        event.preventDefault();
      }
      if (number[1] !== undefined || number[1] != null) {
        if (number[1].length > 1) {
          event.stopPropagation();
          event.preventDefault();
        }
      }
    }
  }

  TruncatDecimal(num) {
    var isDecimal = num.toString().indexOf(".");
    if (isDecimal > 0) {
      num = num.toString(); //If it's not already a String
      num = num.slice(0, (num.indexOf(".")) + 3);
    }
    return this.convertToFloat(num);
  }

  getPriceFromPercentage(discountPercentage: any, ListingPrice: number) {
    const percent = this.convertToFloat(discountPercentage);
    const price = this.convertToFloat(ListingPrice);
    return ((price * percent) / 100);
  }

  pasteData(event) {
    var clipboardData, pastedData;
    // Get pasted data via clipboard API
    clipboardData = event.clipboardData;
    pastedData = clipboardData.getData('Text');
    var trimData = pastedData.trim();
    if (trimData === "") {
      // Stop data actually being pasted into input
      event.stopPropagation();
      event.preventDefault();
    }
  }

  toFixFloor(value) {
    return Math.floor(Number(value) * Math.pow(10, 2)) / Math.pow(10, 2);
  }


  pasteOnlyPositiveNumber(event) {
    var clipboardData, pastedData;
    // Get pasted data via clipboard API
    clipboardData = event.clipboardData;
    pastedData = clipboardData.getData('Text');
    var trimData = pastedData.trim();
    if (Number(trimData) < 0) {
      // Stop data actually being pasted into input
      event.stopPropagation();
      event.preventDefault();
    }
  }


  pasteOnlyNumber(event) {
    var clipboardData, pastedData;
    // Get pasted data via clipboard API
    clipboardData = event.clipboardData;
    pastedData = clipboardData.getData('Text');
    var trimData = pastedData.trim();
    trimData = Number(trimData);
    if (Number.isNaN(trimData)) {
      event.stopPropagation();
      event.preventDefault();
    } else {
      if (trimData.indexOf(".") != -1) {
        event.stopPropagation();
        event.preventDefault();
      }
      let minusIndex = trimData.indexOf("-");
      if (minusIndex != -1) {
        event.stopPropagation();
        event.preventDefault();
      }
    }
  }

  pasteDecimalNumber(event) {
    var clipboardData, pastedData;
    // Get pasted data via clipboard API
    clipboardData = event.clipboardData;
    pastedData = clipboardData.getData('Text');
    var trimData = pastedData.trim();
    if (Number.isNaN(Number(trimData))) {
      event.stopPropagation();
      event.preventDefault();
    } else {
      if (trimData.indexOf(".") > -1) {
        var number = trimData.split('.');
        if (number[1] !== undefined || number[1] != null) {
          if (number[1].length > 2) {
            event.stopPropagation();
            event.preventDefault();
          }
        }
      }
      let minusIndex = trimData.indexOf("-");
      if (minusIndex != -1) {
        event.stopPropagation();
        event.preventDefault();
      }
    }
  }


  checkMaxLength(totalDiscount, price, min, max) {
    const tmpValue = totalDiscount / price;
    const totalDiscountPercent = this.toFixed2(tmpValue * 100);
    if (totalDiscountPercent < min || totalDiscountPercent > max) {
      return true;
    }
  }

  validateMinMaxValue(event: any, keyName: any, filter: any, formName: any, formErrorsObj: any) {
    return;
    if (event.hasOwnProperty('value')) {
      event.value = Number(event.value);
    } else {
      event.value = Number(event.currentTarget.value);
    }
    const limit: any = event.value >= filter.minRange && event.value <= filter.maxRange ? true : false;
    if (!limit) {
      formErrorsObj[keyName] = null;
      if (formName.form.controls[keyName]) {
        formName.form.controls[keyName].setErrors({ incorrect: true });
      }
      if (!filter.isApproval) {
        this.nestedIfFilterIsNotApproval(filter, formErrorsObj, keyName, event);
      } else {
        this.nestedElseFilterIsApproval(filter, formErrorsObj, keyName, event);
      }
    } else {
      formName.form.controls[keyName].setErrors(null);
      formErrorsObj[keyName] = null;
    }
  }

  nestedIfFilterIsNotApproval(filter, formErrorsObj, keyName, event) {
    if (filter.minRange && filter.maxRange) {
      formErrorsObj[keyName] = 'Value should be ' + filter.minRange + ' To ' + filter.maxRange;
    } else if (filter.minRange && event.value < filter.minRange) {
      formErrorsObj[keyName] = 'Value should be more than ' + filter.minRange;
    } else if (filter.maxRange && event.value > filter.maxRange) {
      formErrorsObj[keyName] = 'Value should be less than ' + filter.maxRange;
    }
  }

  nestedElseFilterIsApproval(filter, formErrorsObj, keyName, event) {
    if (filter.minRange && filter.maxRange) {
      formErrorsObj[keyName] = 'Value should be ' + filter.minRange + ' to ' + filter.maxRange + ', else it will be sent to approval';
    } else if (filter.minRange && event.value < filter.minRange) {
      formErrorsObj[keyName] = 'Value should not be less than ' + filter.minRange + ' ,else it will be sent to approval';
    } else if (filter.maxRange != null && event.value > filter.maxRange) {
      formErrorsObj[keyName] = 'Value should not be more than ' + filter.maxRange + ' ,else it will be sent to approval';
    }
  }
  validatePercentageMinMaxValue(event: any, keyName: any, filter: any, formName: any, formErrorsObj: any) {
    if (event.hasOwnProperty('value')) {
      event.value = Number(event.value);
    } else {
      event.value = Number(event.currentTarget.value);
    }
    var per: any;
    if (filter.OriginalValue > 0) {
      per = (((filter.OriginalValue - event.value) * 100) / filter.OriginalValue);
    } else {
      per = event.value;
    }
    const limit: any = per >= filter.minRange && per <= filter.maxRange ? true : false;
    if (!limit) {
      formErrorsObj[keyName] = null;
      if (formName.form.controls[keyName]) {
        formName.form.controls[keyName].setErrors({ incorrect: true });
      }
      if (filter.isApproval) {
        this.nestedIfFilterForMinMaxValueIsApproval(filter, formErrorsObj, keyName, per);
      }
      else {
        this.nestedElseFilterForMinMaxValueIsNotApproval(filter, formErrorsObj, keyName, per);
      }
    } else {
      formName.form.controls[keyName].setErrors(null);
      formErrorsObj[keyName] = null;
    }
  }

  nestedIfFilterForMinMaxValueIsApproval(filter, formErrorsObj, keyName, per) {
    if (filter.minRange != undefined && filter.minRange != null && filter.maxRange != undefined && filter.maxRange != null) {
      formErrorsObj[keyName] = 'Value changes will be sent for approval';
    } else if ((filter.minRange != undefined && filter.minRange != null && per < filter.minRange)
      || (filter.maxRange != undefined && filter.maxRange != null && per > filter.maxRange)) {
      formErrorsObj[keyName] = 'Value changes will be sent for approval';
    }
  }

  nestedElseFilterForMinMaxValueIsNotApproval(filter, formErrorsObj, keyName, per) {
    if (filter.minRange != undefined && filter.minRange != null && filter.maxRange != undefined && filter.maxRange != null) {
      formErrorsObj[keyName] = 'Value changes not allowed';
    } else if ((filter.minRange != undefined && filter.minRange != null && per < filter.minRange)
      || (filter.maxRange != undefined && filter.maxRange != null && per > filter.maxRange)) {
      formErrorsObj[keyName] = 'Value changes not allowed';
    }
  }

  checkRole(controlName, fieldValidityList) {
    if (fieldValidityList) {
      const result = fieldValidityList.find(role => role.uniqueName === controlName);
      if (result) {
        return result.isView ? result.isView : false;
      }
    }
    return true;
  }
  checkDisabled(controlName, fieldValidityList) {
    if (fieldValidityList) {
      const result = fieldValidityList.find(role => role.uniqueName === controlName);
      if (result) {
        return result.isUpdate ? false : result.isUpdate;
      }
    }
    return false;
  }

  valueWithDecimalValue(event) {
    var str = event.target.value;
    let cntrolName = event.currentTarget.name;
    var x = parseFloat(str);
    if (isNaN(x)) {
      $("#" + cntrolName).val(null);
    }
    return true;
  }

  valueWithDecimalValue0(event) {
    var str = event.target.value;
    let cntrolName = event.currentTarget.name;
    if (str.match(/[a-z]/i)) {
      $("#" + cntrolName).val(0);
    }
    return true;
  }

  valueWithDecimalPercentage0(event) {
    var str = event.target.value;
    let cntrolName = event.currentTarget.name;

    var x = parseFloat(str);
    if (x < 0 || x > 100 || str.match(/[a-z]/i)) {
      $("#" + cntrolName).val(0);
      return false;
    }
    else {
      var decimalSeparator = ".";
      var val = "" + x;
      if (val.indexOf(decimalSeparator) < val.length - 3 && val.indexOf(decimalSeparator) > -1
        || str.match(/[a-z]/i)) {
        $("#" + cntrolName).val(0);
        return false;
      }

      return true;
    }

  }

  valueWithDecimalPercentage(event) {
    var str = event.target.value;
    let cntrolName = event.currentTarget.name;

    var x = parseFloat(str);
    if (isNaN(x) || x < 0 || x > 100) {
      $("#" + cntrolName).val('');
      return false;
    }
    else {
      var decimalSeparator = ".";
      var val = "" + x;
      if (val.indexOf(decimalSeparator) < val.length - 3 && val.indexOf(decimalSeparator) > -1) {
        $("#" + cntrolName).val('');
        return false;
      }

      return true;
    }
  }

  validateInput(event) {
    const str = event.key;
    const reg = /[~`!#$%\^&*()+=\-\[\]\\';,{}|\\":<>\?]/g;
    return (new RegExp(reg).test(str)) ? event.preventDefault() : '';
  }
  OrdervalidateInput(event) {
    const str = event.key;
    const reg = /[~`!@#$%\^&*()+=_\-\[\]\\';,{}|\\":<>\?]/g;
    return (new RegExp(reg).test(str)) ? event.preventDefault() : '';
  }

  validateInputAvoidHyphen(event) {
    const str = event.key;
    const reg = /[~`!#$%\^&*()+=\\[\]\\';,{}|\\":<>\?]/g;
    return (new RegExp(reg).test(str)) ? event.preventDefault() : '';
  }

  validateInputAvoidAmpersandAndHyphen(event) {
    const str = event.key;
    const reg = /[~`!#$%\^*()+=\\[\]\\';,{}|\\":<>\?]/g;
    return (new RegExp(reg).test(str)) ? event.preventDefault() : '';
  }

  validateInputAvoidAmpersandAndHyphenWithDoller(event) {
    const str = event.key;
    const reg = /[~`!%\^*()+=\\[\]\\'{}|\\"<>\?]/g;
    return (new RegExp(reg).test(str)) ? event.preventDefault() : '';
  }

  validateCompanyName(event) {
    const str = event.key;
    const reg = /[~`!%\^*()+=\[\]\'{}|\"<>\?]/g;
    return (new RegExp(reg).test(str)) ? event.preventDefault() : '';
  }

  validateWebsiteInput(event) {
    const str = event.key;
    const reg = /[~`!#$%\^*()+=\\[\]\\';,{}|\\"<>\?]/g;
    return (new RegExp(reg).test(str)) ? event.preventDefault() : '';
  }

  validateWebsiteAddress(event) {
    const str = event.key;
    const reg = /^(http:\/\/www\.|https:\/\/www\.|www\.)+([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return (new RegExp(reg).test(str)) ? event.preventDefault() : '';
  }

  validateCopyInputAvoidHyphen(event, value) {
    const reg = /^[\w-!#$%&'*+\/=?`{|}~^\.]+@([\w-]+\.)+[\w\-]{2,10}$/g;
    const result = (new RegExp(reg).test(value)) ? event.preventDefault() : '';
    if (result === undefined) {
      event.target.value = '';
    }
    return result;
  }

  validateCopyInputAvoidAmpersandAndHyphen(event, value) {
    const reg = /[~`!#$%\^*()+=\\[\]\\';,{}|\\":<>\?]/g;
    const result = (new RegExp(reg).test(value)) ? event.preventDefault() : '';
    if (result === undefined) {
      event.target.value = '';
    }
    return result;
  }
  trimFormInput(input) {
    input = input.trim();
  }
  validateCopyInput(event, value) {
    const reg = /[~`!#$%\^&*()+=\-\[\]\\';,{}|\\":<>\?]/g;
    const result = (new RegExp(reg).test(value)) ? event.preventDefault() : '';
    if (result === undefined) {
      event.target.value = '';
    }
    return result;
  }

  validateCopyInputForVehicle(event, value) {
    const reg = /[~`!\^=\\\\';{}|\\"<>\?]/g;
    const result = (new RegExp(reg).test(value)) ? event.preventDefault() : '';
    if (result === undefined) {
      event.target.value = '';
    }
    return result;
  }

  validateAddress(event) {
    const str = event.key;
    const reg = /[~`!#$%\^*()+=\\[\]\\';,{}|\\":<>\?]/g;
    return (new RegExp(reg).test(str)) ? event.preventDefault() : '';
  }

  validateCopyAddress(event, value) {
    const reg = /[~`!#$%\^&*()+=\\[\]\\';,{}|\\":<>\?]/g;
    const result = (new RegExp(reg).test(value)) ? event.preventDefault() : '';
    if (result === undefined) {
      event.target.value = '';
    }
    return result;
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  setCurrencySymbol() {
    return 'DKK';
  }

  setPercentageSymbol() {
    return '%';
  }

  setFunderSummaryResidual(holdingCostInfo: any) {
    return this.convertToFloat(holdingCostInfo.capResidualDisplay);
  }

  validateCommentInput(event) {
    const str = event.key;
    const reg = Validation.ValidInputForComment;
    return (new RegExp(reg).test(str)) ? event.preventDefault() : '';
  }

  getMaxMilesPerAnnum(term: number) {
    let maxMileage = 0;
    /* need to calculate max mileage when user change duration or contract mile
    as mileage field is dependent on those two fields. If it goes to more
    than max mileage, then store max mileage in mileage input field */
    maxMileage = Math.round(Number(Validation.MaxContractMile
      / (Number(term) / Validation.MonthOfYear)));
    if (maxMileage > Validation.MaxMile) {
      maxMileage = Validation.MaxMile;
    }
    return maxMileage;
  }

  getMinContract(term: number) {
    return Math.round((Number(term) * Validation.MinMile) /
      Validation.MonthOfYear);
  }

  isTermValid(term) {
    if (Number(term) < Validation.MinTerm || Number(term) > Validation.MaxTerm) {
      return false;
    } else {
      return true;
    }
  }

  getVehicleTaxIncludedText(item) {
    let returnText = null;
    if (item == 1) { // 1 = yes
      returnText = this.translate.instant('Common.Yes');
    } else if (item == 2) { // 2 = first year only
      returnText = this.translate.instant('Common.FirstYearOnly');
    } else if (item == 3) { // 3 = no
      returnText = this.translate.instant('Common.No');
    }
    return returnText;
  }

  // pervent data with space
  perventSpace(event) {
    if (event.type == 'paste') {
      let data = event.clipboardData.getData('text');
      let isspace = /^\s/.test(data);
      if (isspace) {  // discuss with dhanpat
        event.preventDefault();
      }
    }
    else if (event.keyCode == 32) {  // discuss with dhanpat
      event.preventDefault();
    }
  }

  //#region vehicle
  viewSubData(index) {
    let subId = '#subCat_' + index;
    let parentId = '#mainCatTech_' + index;
    let flag = $(subId).hasClass("hide");
    if (flag) {
      $(".subCatTechHide").addClass('hide');
      $(".mainCatTechHide").removeClass('arrowdown').removeClass('active');
      $(subId).removeClass('hide');
      $(parentId).addClass('active');
    }
    else {
      $(subId).addClass('hide');
      $(parentId).removeClass('active');
    }
    $(parentId).toggleClass("arrowdown");

  }
  avoidSpace(event) {
    if (event.which === 32 && event.target.value === "") {
      var k = event ? event.which : event.charCode;
      if (k == 32) return false;
    }
  }
  avoidSpaceInText(event) {
    if (event.which === 32) {
      var k = event ? event.which : event.charCode;
      if (k == 32) return false;
    }
  }
  //#endregion vehicle

  //#region expand and collapse
  expandAll() {
    $('.acc-style-new .collapse').collapse('show');
  }
  collapseAll() {
    $('.acc-style-new').children().find('.collapse').first().addClass('first-acc');
    $(".acc-style-new .collapse:not('.first-acc')").collapse('hide');
  }
  //#endregion expand and collaps

  isViewModeVehicleRequest(vehicleRequest) {
    if (vehicleRequest && vehicleRequest.isViewMode) {
      return true;
    }
    return false;
  }
  expandGridData(leadId) {
    setTimeout(function () {
      if ($('#FirstOpen' + leadId).length)
        $('#FirstOpen' + leadId)[0].click();
    }, 1000);
  }

  public formatDate(date: any) {
    if (date) {
      var utcDate = date.toString().replace(/T/, ' ').replace(/\..+/, '');
      utcDate = utcDate + " UTC";
      return utcDate.toLocaleString();
    }
  }

  validateNullUndefinedAndEmpty(value) {
    if (value != null && value != undefined && value !== '' && value !== 'undefined') {
      return true;
    }
    return false;
  }

  validateMonths(months) {
    if (months >= CommonAppConstants.TotalMonthInYear || months < 0) {
      return false;
    }
    return true;
  }

  validateRetiredYear(year) {
    if (year > 1800 || year <= 0) {
      return false;
    }
    return true;
  }
  validateYear(year) {
    if (year < 1800) {
      return false;
    }
    return true;
  }

  markAsInvalid(elementId) {
    $('#' + elementId).addClass('invalid-input');
  }

  markAsValid(elementId) {
    $('#' + elementId).removeClass('invalid-input');
  }

  markFieldAsInvalid(elementId, className) {
    $('#' + elementId).addClass(className);
  }

  markFieldAsValid(elementId, className) {
    $('#' + elementId).removeClass(className);
  }

  validateDocumentFormat(selectedFile: File) {
    if ((selectedFile.type === 'application/pdf') ||
      (selectedFile.type === 'application/vnd.ms-excel') ||
      (selectedFile.type === 'application/excel') ||
      (selectedFile.type === 'application/x-excel') ||
      (selectedFile.type === 'application/x-msexcel') ||
      (selectedFile.type === 'application/msword') ||
      (selectedFile.type === 'application/doc') ||
      (selectedFile.type === 'application/ms-doc') ||
      (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ||
      (selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      return true;
    }
    return false;
  }

  isDocumentOrExcel(selectedFile: File) {
    if ((selectedFile.type === 'application/msword') ||
      (selectedFile.type === 'application/doc') ||
      (selectedFile.type === 'application/ms-doc') ||
      (selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') ||
      (selectedFile.type === 'application/vnd.ms-excel') ||
      (selectedFile.type === 'application/excel') ||
      (selectedFile.type === 'application/x-excel') ||
      (selectedFile.type === 'application/x-msexcel') ||
      (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      return true;
    }
    return false;
  }

  bindAddress(c) {
    return (c.line_1 ? c.line_1 : '') + (c.line_2 ? ', ' + c.line_2 : '') +
      (c.post_town ? ', ' + c.post_town : '') + (c.county ? ', ' + c.county : '') + (c.country ? ', ' + c.country : '');
  }
  bindRegistrationAddress(c) {
    return (c.line_1 ? c.line_1 : '') + (c.line_2 ? ', ' + c.line_2 : '') +
      (c.post_town ? ', ' + c.post_town : '') + (c.county ? ', ' + c.county : '') + (c.country ? ', ' + c.country : '');
  }

  removeFirstZeroFromWhatsApp(data) {
    const isFirstZero = data.charAt(0);
    if (isFirstZero == 0 || isFirstZero == '0') {
      data = data.substring(1);
    }
    return data;
  }
  returnFormattedAddress(address: any) {
    var string = ((address.propertyName ? address.propertyName : '') + (address.addition ? address.addition : '') +
      (address.street ? (', ' + address.street) : '') +
      (address.city ? (', ' + address.city) : '') +
      (address.county ? (', ' + address.county) : ''));

    if (string && string.charAt(0) == ',') {
      string = string.substring(1);
    }
    if (string && string.charAt(string.length - 1) == ',') {
      string = string.substring(0, string.length - 1);
    }
    return string;
  }
  transformDateDDMMYY(date) {
    return this.datepipe.transform(date, 'dd/MM/yyyy').toString();
  }
  /*accessories accordian show hide*/
  showhide() {
    if ($('#child-collapse').hasClass('hide-collapse')) {
      $('#child-collapse').removeClass('hide-collapse');
      $('#header-collapse').addClass('collapse-minus');
      $('#header-collapse').removeClass('collapse-pluse');
    } else {
      $('#child-collapse').addClass('hide-collapse');
      $('#header-collapse').addClass('collapse-pluse');
      $('#header-collapse').removeClass('collapse-minus');
    }
  }

  isStringContainsNumber(value) {
    const reg = /\d/g;
    return new RegExp(reg).test(value);
  }
  getWeekDays(number) {
    let day;
    switch (number) {
      case 0:
        day = this.translate.instant('LocationManagement.Monday');
        break;
      case 1:
        day = this.translate.instant('LocationManagement.Tuesday');
        break;
      case 2:
        day = this.translate.instant('LocationManagement.Wednesday');
        break;
      case 3:
        day = this.translate.instant('LocationManagement.Thursday');
        break;
      case 4:
        day = this.translate.instant('LocationManagement.Friday');
        break;
      case 5:
        day = this.translate.instant('LocationManagement.Saturday');
        break;
      case 6:
        day = this.translate.instant('LocationManagement.Sunday');
        break;
    }
    return day;
  }


  focusOuterDiv() {
    $("#uploadContainer").addClass("uploadboxfocus");
  }

  focusOutOuterDiv() {
    $("#uploadContainer").removeClass("uploadboxfocus");
  }

  convertValuesForInvoices(value) {
    return isNullOrUndefined(value) ? 0 : Number(value);
  }

  vatValuesofGivenAmount(amount) {
    let amountWithVat = 0;
    if (!isNullOrUndefined(amount)) {
      amountWithVat = (Validation.DefaultVatPercentage / 100) * amount;
    }
    return amountWithVat;
  }

  calculateTotalWithAllAmounts(amounts: number[]) {
    let totalAmount = 0;
    if (!isNullOrUndefined(amounts)) {
      amounts.forEach(element => {
        totalAmount = totalAmount + element;
      });
    }
    return totalAmount;
  }

  isStringNullOrWhiteSpaces(value: string) {
    return isNullOrUndefined(value) || (!isNullOrUndefined(value) && value.trim() === '')
  }

  isPipelineFlow() {
    return this.routes.url.includes('pipeline-vehicle');
  }

  getDaysDifference(date1, date2) {
    let diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  showRemainingWarrantyInRed() {
    if (this.remainingWarrantyMileage < L2ogConstants.ThresholdMileage || (!isNullOrUndefined(this.manufacturersWarrantyDate)
      && this.remainingWarrantyDays < L2ogConstants.ThresholdDays)) {
      return true;
    }
    return false;
  }

  removeLastComma(strng) {
    strng = strng.trim();
    const n = strng.lastIndexOf(',');
    const a = strng.substring(0, n);
    return a;
  }

  convertStringTONumber(value) {
    if (isNotNullOrUndefined(value) && value != "") {
      return Number(value);
    }
    return value;
  }

  convertBytesToMB(bytes: number) {
    return bytes / (1024 * 1024);
  }

  returnRattingInDegree(ratingValue) {
    return Math.round((ratingValue * this.baseDegree) / 100);
  }

  returnRattingDayToSellInPercentage(dayToSell) {
    return Math.round((dayToSell * 100) / this.baseDays);
  }

  returnInPercentage(value) {
    let returnValue = Math.round(value * 100);
    if (returnValue < 0) {
      returnValue = 0;
    }
    return returnValue;
  }

  returnRatingLabel(value) {
    let returnValue = '';
    // Poor Band (0.0 - 0.33)
    // Fair Band (0.34 - 0.66)
    // Good Band (0.67 - 1.00)
    if (value <= 0.33) {
      returnValue = this.translate.instant('Common.Poor');
    } else if (value > 0.33 && value <= 0.66) {
      returnValue = this.translate.instant('Common.Fair');
    } else if (value > 0.66 && value <= 1.00) {
      returnValue = this.translate.instant('Common.Good');
    }
    return returnValue;
  }
  getClassByValue(value) {
    let returnValue = '';
    if (value <= 33) {
      returnValue = 'red';
    } else if (value > 33 && value <= 66) {
      returnValue = 'orange';
    } else if (value > 66 && value <= 100) {
      returnValue = 'green';
    }
    return returnValue;
  }

  setValidFromDate() {
    let validFrom = new Date();
    return validFrom;
  }
  setValidToDate(statusCode) {
    let validTo = null;
    if (statusCode != StatusCode.Active) {
      validTo = new Date();
    } else {
      validTo = null;
    }
    return validTo;
  }

  setTimeToZeroAndConvertToUTC(dateInput) {
    return this.convertUTC(new Date(dateInput.getFullYear(), dateInput.getMonth(), dateInput.getDate(), 0, 0, 0));
  }

  concatenateAddressLine(addressObj) {
    if (addressObj && addressObj.line_2 && addressObj.line_3) {
      return addressObj.line_2 + ', ' + addressObj.line_3
    } else if (addressObj && addressObj.line_2) {
      return addressObj.line_2;
    } else if (addressObj && addressObj.line_3) {
      return addressObj.line_3;
    }
  }

  registerToolTip() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  replaceZInString(date) {
    if (isNullOrUndefined(date)) { return date }
    else {
      return date.replace('Z', '');
    }
  }

  isReturnedVehicle() {
    return this.routes.url.includes('returned-vehicles');
  }

  isInstockVehicle() {
    return this.routes.url.includes('stocklist-vehicle');
  }

  isPipelineVehicle() {
    return this.routes.url.includes('pipeline-vehicle');
  }

  isSoldVehicle() {
    return this.routes.url.includes('sold-vehicle');
  }

  isInContractVehicle() {
    return this.routes.url.includes('in-contract-vehicle');
  }

  viewChildAccessories(index) {
    const child1 = '#child1_' + index;
    const childAcc2 = '#childAcc2_' + index;
    const child1AccButton = '#child1AccButton_' + index;
    const child2Flag = $(childAcc2).hasClass('hide');
    if (child2Flag) {
      $(childAcc2).removeClass('hide');
      $(child1AccButton).addClass('active');
    } else {
      $(childAcc2).addClass('hide');
      $(child1AccButton).removeClass('active');
    }
    $(child1).toggleClass('arrowdown');
    $(child1AccButton).toggleClass('arrowdown');
  }

  contentReplace(contentArray, contentToReplace: string) {
    if (contentArray) {
      contentArray.forEach(element => {
        if (contentToReplace.includes(element.contentToReplace)) {
          element.replaceWithStart = element.replaceWithStart.replace(CommonAppConstants.ReplaceClassAt, isNotNullOrUndefined(element.customClass) ? CommonAppConstants.AppendClassStr + "" + element.customClass + "" : '');
          contentToReplace = contentToReplace.replace(element.contentToReplace, element.replaceWithStart + element.contentToReplace + element.replaceWithEnd);
        }
      });
    }
    return contentToReplace;
  }

  viewLongDescription(id, desc) {
    this.longTextPopupContent = desc;
    this.longTextPopupId = id;
    setTimeout(() => {
      $('#' + this.longTextPopupId).modal('show');
    }, 0);
  }

  showLoader() {
    this.loading = true;
  }

  hideLoader() {
    this.loading = false;
  }

  redirectUrl(url, params = null) {
    if (isValidObjectWithBlank(params)) {
      this.routes.navigate(["/" + url + "/" + params]);
    } else {
      this.routes.navigate(["/" + url]);
    }
  }

  openLogoutModal() {
    $('#logoutModal').modal('show');
  }

  async getMenuMaster(itemSeoName: string = '') {
    this.loading = true;
    this.menuCustomItemMasterModel = [];
    this.menuGravyItemMasterModel = [];
    this.menuNaanItemMasterModel = [];
    this.menuSizlerItemMasterModel = [];
    this.menuSodaItemMasterModel = [];
    await (this.userService.getMenuList(itemSeoName))
      .toPromise().then((res: any) => {
        this.loading = false;
        if (res.stateModel.statusCode === 200) {
          let resultData = res.result.filter(x => x.isPOS);
          resultData.forEach(element => {
            element.menuItemMaster = element.menuItemMaster.filter(x => x.isPOS);
            element.menuItemMaster.filter(x => x.isPOS).forEach(elementItem => {
              if (elementItem.isItemCustom) {
                this.menuCustomItemMasterModel.push(elementItem);
              }
              if (element.code == 'B.11' && elementItem.isAvailableForTakeaway) { //Naan Bread
                this.menuNaanItemMasterModel.push(elementItem);
              }
              if (element.code == 'C.1' && elementItem.isAvailableForTakeaway) { //Sizlers
                this.menuSizlerItemMasterModel.push(elementItem);
              }
              if (element.code == 'C.2' && elementItem.isAvailableForTakeaway) { //Sizlers
                this.menuSodaItemMasterModel.push(elementItem);
              }
              if (element.categoryName.includes('Main Course') && elementItem.isAvailableForTakeaway) { //Naan Bread
                this.menuGravyItemMasterModel.push(elementItem);
              }
              elementItem.quantity = 1;
            });
          });

          this.menuCategoryMasterWithOutPModel = resultData
            .filter(x => (x.code != CommonAppConstants.PackingCode
              && x.code != CommonAppConstants.DeliveryCode
              && x.code != 'C.1'
              && x.code != 'C.2') && !x.isAvailableForChristmas);
          this.menuCategoryMasterModel = resultData;
          // if (this.menuCategoryMasterModel.length > 0) {
          //   if (this.menuCategoryMasterModel[0].menuItemMaster.length > 0) {
          //     this.currentSelectedObject = this.menuCategoryMasterModel[0].menuItemMaster[0];
          //   }
          // }
        }
        else {
          this.showMessage(MessageType.Error, res.stateModel.successMessage);
        }
      });
  }

  dialogBoxOpen(item: MenuItemMasterModel) {
    // if (!this.validateDay(new Date())) {
    //   this.showMessage(MessageType.Error, this.setLabel('AdditionalText.Invaliddate'));
    // } else {
    this.currentSelectedObject = null;
    item.spicyType = '';
    item.comment = '';
    item.customMenuItemId = null
    item.customItemName = '';
    // if (item.quantity > 0) {
    // if (item.isSpiceLevelAvailable) {
    if (isValidObject(item.customMenuItemId)) {
      $("#idCustomSelection").val(item.customMenuItemId);
    } else {
      $("#idCustomSelection").val('');
    }
    if (isValidObjectWithBlank(item.spicyType)) {
      $("#spiciness").val(item.spicyType);
      // $("input[name='spiciness'][value='" + item.spicyType + "']").prop('checked', true);
    } else {
      $("#spiciness").val('Mild');
      // $("input[name='spiciness']").prop('checked', false);
    }
    $("#txtComment").val(item.comment);
    if (item.noOfGrayOption != null && item.noOfGrayOption > 0) {
      for (let i = 0; i < item.noOfGrayOption; i++) {
        $("#idGravySelection_" + i).val('');
        var spid = 'spiciness_' + i;
        $("#" + spid).val('Mild');
        // $("input[name='" + spid + "']").prop('checked', false);
        $("#txtComment_" + i).val('');
      }
    }
    if (item.noOfNaanOption != null && item.noOfNaanOption > 0) {
      for (let i = 0; i < item.noOfNaanOption; i++) {
        $("#idNaanSelection_" + i).val('');
      }
    }
    if (item.noOfSizlerOption != null && item.noOfSizlerOption > 0) {
      for (let i = 0; i < item.noOfSizlerOption; i++) {
        $("#idSizlerSelection_" + i).val('');
      }
    }
    if (item.noOfSodaOption != null && item.noOfSodaOption > 0) {
      for (let i = 0; i < item.noOfSodaOption; i++) {
        $("#idSodaSelection_" + i).val('');
      }
    }
    item.customOrderItemDetailMaster = [];
    this.currentSelectedObject = item;
    $('#itemModal').modal('show');
    // } else {
    // this.addtocart(item, 1, 0)
    // }
    // }
  }

  addSpicy(spycyOption) {
    spycyOption = '';
    var x = $("#spiciness");//$("input[name='spiciness']:checked");
    if (x.length > 0) {
      spycyOption = $("#spiciness").val()
      this.currentSelectedObject.spicyType = spycyOption;
    }
    this.currentSelectedObject.comment = $("#txtComment").val();

    var selectedCustomObject = $("#idCustomSelection").val();
    this.currentSelectedObject.customMenuItemId = null
    this.currentSelectedObject.customItemName = '';

    this.currentSelectedObject.customOrderItemDetailMaster = [];

    if (selectedCustomObject != null && selectedCustomObject != 'null' && selectedCustomObject != '') {
      var selectedCustomObjectFilter = this.menuCustomItemMasterModel
        .filter(p => p.menuItemId == selectedCustomObject)[0];
      this.currentSelectedObject.customMenuItemId = selectedCustomObjectFilter.menuItemId;
      this.currentSelectedObject.customItemName = selectedCustomObjectFilter.itemName;
    }

    if (this.currentSelectedObject.noOfGrayOption != null && this.currentSelectedObject.noOfGrayOption > 0) {
      for (let i = 0; i < this.currentSelectedObject.noOfGrayOption; i++) {
        var selectedGrayObject = $("#idGravySelection_" + i).val();
        if (selectedGrayObject != null && selectedGrayObject != 'null') {
          var selectedGrayObjectFilter = this.menuGravyItemMasterModel
            .filter(p => p.menuItemId == selectedGrayObject)[0];

          let dynModel = new CustomOrderItemDetailMaster();
          dynModel.menuItemId = this.currentSelectedObject.menuItemId;
          dynModel.customMenuItemId = selectedGrayObjectFilter.menuItemId;
          dynModel.customItemName = selectedGrayObjectFilter.itemName;
          dynModel.customType = DynamicTypeCode.Gravity;
          dynModel.customSpicyType = $("#spiciness_" + i).val(); //$("input[name='spiciness_" + i + "']:checked")[0].value;
          dynModel.customComment = $("#txtComment_" + i).val();
          this.currentSelectedObject.customOrderItemDetailMaster.push(dynModel);
        }
      }
    }

    if (this.currentSelectedObject.noOfNaanOption != null && this.currentSelectedObject.noOfNaanOption > 0) {
      for (let i = 0; i < this.currentSelectedObject.noOfNaanOption; i++) {
        var selectedNaanObject = $("#idNaanSelection_" + i).val();
        if (selectedNaanObject != null && selectedNaanObject != 'null') {
          var selectedNaanObjectFilter = this.menuNaanItemMasterModel
            .filter(p => p.menuItemId == selectedNaanObject)[0];

          let dynModel = new CustomOrderItemDetailMaster();
          dynModel.menuItemId = this.currentSelectedObject.menuItemId;
          dynModel.customMenuItemId = selectedNaanObjectFilter.menuItemId;
          dynModel.customItemName = selectedNaanObjectFilter.itemName;
          dynModel.customType = DynamicTypeCode.Naan;
          dynModel.customSpicyType = '';
          dynModel.customComment = '';
          this.currentSelectedObject.customOrderItemDetailMaster.push(dynModel);
        }
      }
    }

    if (this.currentSelectedObject.noOfSizlerOption != null && this.currentSelectedObject.noOfSizlerOption > 0) {
      for (let i = 0; i < this.currentSelectedObject.noOfSizlerOption; i++) {
        var selectedSizlerObject = $("#idSizlerSelection_" + i).val();
        if (selectedSizlerObject != null && selectedSizlerObject != 'null') {
          var selectedSizlerObjectFilter = this.menuSizlerItemMasterModel
            .filter(p => p.menuItemId == selectedSizlerObject)[0];

          let dynModel = new CustomOrderItemDetailMaster();
          dynModel.menuItemId = this.currentSelectedObject.menuItemId;
          dynModel.customMenuItemId = selectedSizlerObjectFilter.menuItemId;
          dynModel.customItemName = selectedSizlerObjectFilter.itemName;
          dynModel.customType = DynamicTypeCode.Sizler;
          dynModel.customSpicyType = '';
          dynModel.customComment = '';
          this.currentSelectedObject.customOrderItemDetailMaster.push(dynModel);
        }
      }
    }

    if (this.currentSelectedObject.noOfSodaOption != null && this.currentSelectedObject.noOfSodaOption > 0) {
      for (let i = 0; i < this.currentSelectedObject.noOfSodaOption; i++) {
        var selectedSodaObject = $("#idSodaSelection_" + i).val();
        if (selectedSodaObject != null && selectedSodaObject != 'null') {
          var selectedSodaObjectFilter = this.menuSodaItemMasterModel
            .filter(p => p.menuItemId == selectedSodaObject)[0];

          let dynModel = new CustomOrderItemDetailMaster();
          dynModel.menuItemId = this.currentSelectedObject.menuItemId;
          dynModel.customMenuItemId = selectedSodaObjectFilter.menuItemId;
          dynModel.customItemName = selectedSodaObjectFilter.itemName;
          dynModel.customType = DynamicTypeCode.Soda;
          dynModel.customSpicyType = '';
          dynModel.customComment = '';
          this.currentSelectedObject.customOrderItemDetailMaster.push(dynModel);
        }
      }
    }

    this.addtocart(this.currentSelectedObject, 1, 0);
    // this.dialogBoxOpen(this.currentSelectedObject);
    $('#itemModal').modal('hide');
  }

  returnImageUrl(item: MenuItemMasterModel) {
    if (item.imageMaster.length > 0 && item.imageMaster.filter(x => x.isPrimary).length > 0) {
      return item.imageMaster.filter(x => x.isPrimary)[0].imageUrl;
    }
    return 'assets/images/item-img.jpg';
  }

  addtocart(itemdetails: any, isAdd, isRemove) {
    if (!isRemove) {
      var categoryObject = this.menuCategoryMasterModel.filter(x => x.menuCategoryId == itemdetails.menuCategoryId);
      if (categoryObject.length > 0) {
        var objOrderDetailMasterModel = new PwaOrderDetailMasterModel();
        objOrderDetailMasterModel.orderDetailId = Guid.create()["value"];
        objOrderDetailMasterModel.menuCategoryId = itemdetails.menuCategoryId;
        objOrderDetailMasterModel.categoryName = categoryObject[0].categoryName;
        objOrderDetailMasterModel.mcode = categoryObject[0].code;
        objOrderDetailMasterModel.menuItemId = itemdetails.menuItemId;
        objOrderDetailMasterModel.code = itemdetails.code;
        objOrderDetailMasterModel.itemName = itemdetails.itemName;
        objOrderDetailMasterModel.itemDescription = itemdetails.itemDescription;
        objOrderDetailMasterModel.isAvailableForTakeaway = itemdetails.isAvailableForTakeaway;
        objOrderDetailMasterModel.price = itemdetails.price;
        objOrderDetailMasterModel.quantity = itemdetails.quantity;
        objOrderDetailMasterModel.spicyType = isValidObject(itemdetails.spicyType) ? itemdetails.spicyType : null;
        objOrderDetailMasterModel.comment = isValidObject(itemdetails.comment) ? itemdetails.comment : null;
        objOrderDetailMasterModel.customMenuItemId = isValidObject(itemdetails.customMenuItemId) ? itemdetails.customMenuItemId : null;
        objOrderDetailMasterModel.customItemName = itemdetails.customItemName;
        objOrderDetailMasterModel.imageUrl = this.returnImageUrl(itemdetails);
        objOrderDetailMasterModel.cartSequence = 1;
        if (itemdetails.code == CommonAppConstants.PackingCode) {
          objOrderDetailMasterModel.cartSequence = 100;
        }
        if (itemdetails.code == CommonAppConstants.DeliveryCode) {
          objOrderDetailMasterModel.cartSequence = 101;
        }
        objOrderDetailMasterModel.customOrderItemDetailMaster = itemdetails.customOrderItemDetailMaster;
        this.orderDetailMaster.push(objOrderDetailMasterModel);
      }
    } else {
      this.orderDetailMaster = this.orderDetailMaster
        .filter(x => x.orderDetailId != itemdetails.orderDetailId)
    }
    this.setQuantityMenuItem();
    this.sendCartCountSubject.next('');
  }

  setQuantityMenuItem() {
    this.menuCategoryMasterModel.forEach(element => {
      element.menuItemMaster.forEach(elementItem => {
        elementItem.quantity = 1;
      });
    });
  }

  addPackingCharge() {
    if (isValidList(this.menuCategoryMasterModel)) {
      let itemDetails = this.menuCategoryMasterModel
        .filter(x => x.code == CommonAppConstants.PackingCode)[0].menuItemMaster[0];
      var existObject = this.orderDetailMaster
        .filter(x => x.menuItemId == itemDetails.menuItemId);
      if (existObject.length == 0) {
        itemDetails.quantity = 1;
        this.addtocart(itemDetails, true, false);
      }
    }
  }

  refreshPackingPrice() {
    if (isValidList(this.deliveryChargeMasterModel)) {
      let deliveryChargeObject = this.deliveryChargeMasterModel.filter(x => x.postalCode == this.orderMasterModel.addressMaster.postalCode);
      let deliveryCharge = 0;
      if (isValidList(deliveryChargeObject)) {
        deliveryCharge = deliveryChargeObject[0].price;
      }
      this.orderMasterModel.orderDetailMaster.forEach(element => {
        if (element.cartSequence == 101) {
          element.price = deliveryCharge;
        }
      });
    }
  }

  getOrderCalculation() {
    this.orderMasterModel.userType = UserType.WebUser;
    this.orderMasterModel.orderDetailMaster = _.cloneDeep(this.orderDetailMaster);
    let subAmount = 0;
    this.refreshPackingPrice();
    this.orderMasterModel.orderDetailMaster.forEach(element => {
      subAmount = subAmount + (element.price * element.quantity);
    });
    this.orderMasterModel.subAmount = subAmount;
    this.orderMasterModel.discountAmount = ((subAmount * this.orderMasterModel.discountPercentage) / 100);
    this.orderMasterModel.totalAmount = this.orderMasterModel.subAmount - this.orderMasterModel.discountAmount;
    this.orderMasterModel.isPaid = false;
    this.orderMasterModel.orderStatus = 'Pending';
    this.orderMasterModel.addressMaster.isActive = true;
    this.orderMasterModel.addressMaster.isDeleted = false;
  }

  async addTableOrderDetails(tableId) {
    let tblObject = this.tableOrderDetailModel.filter(x => x.tableId == tableId);
    if (!isNullOrUndefined(tblObject) && tblObject.length > 0) {
      tblObject[0].orderMaster = this.orderMasterModel;
    } else {
      let tObject = new TableOrderDetails();
      tObject.tableId = tableId;
      tObject.orderMaster = this.orderMasterModel;
      this.tableOrderDetailModel.push(tObject);
    }
    await this.placeOrder(tableId)
  }

  getTableDetails(tableId) {
    let tblObject = this.tableOrderDetailModel.filter(x => x.tableId == tableId);
    if (!isNullOrUndefined(tblObject) && tblObject.length > 0) {
      this.orderMasterModel = tblObject[0].orderMaster;
      this.orderDetailMaster = tblObject[0].orderMaster.orderDetailMaster;
      return tblObject[0].orderMaster;
    }
    this.orderMasterModel = new PwaOrderMasterModel();
    this.orderDetailMaster = [];
    return new PwaOrderMasterModel();
  }

  updateTableDetails(tableId, objPwaOrderMasterModel: PwaOrderMasterModel) {
    let tblObject = this.tableOrderDetailModel.filter(x => x.tableId == tableId);
    if (!isNullOrUndefined(tblObject) && tblObject.length > 0) {
      tblObject[0].orderMaster = objPwaOrderMasterModel;
      tblObject[0].orderMaster.orderDetailMaster = objPwaOrderMasterModel.orderDetailMaster;
    }
  }

  removeOrderDetailsFromOrder(tableId, objOrderDetail) {
    let tblObject = this.tableOrderDetailModel.filter(x => x.tableId == tableId);
    if (!isNullOrUndefined(tblObject) && tblObject.length > 0) {
      tblObject[0].orderMaster.orderDetailMaster = objOrderDetail;
    }

    this.orderMasterModel.orderDetailMaster =
      _.cloneDeep(this.orderMasterModel.orderDetailMaster.filter(x => x != objOrderDetail));

    //this.setQuantityMenuItem();
    //this.sendCartCountSubject.next('');
  }

  updateOrderDetailsFromOrder(tableId, objOrderDetail) {

  }

  async handleEmitConfirmationEvent(event, pagename) {
    switch (pagename) {
      case ConfirmationCode.TablePage: {
        if (event == ConfirmationCode.Yes) {
          this.orderMasterModel.paymentMode = this.typeOfPayment;
          await this.addTableOrderDetails(this.tableId);
          this.tableOrderDetailModel = this.tableOrderDetailModel.filter(x => x.tableId != this.tableId);
          this.redirectUrl('dashboard');
        } else {
          $('#' + this.popupId).modal('hide');
        }
        break;
      }
    }
  }

  setConfirmationPopup(title, popupId, message, cancelButtonTitle, saveButtonTitle, pageName) {
    this.title = title;
    this.popupId = popupId;
    this.message = message;
    this.cancelButtonTitle = cancelButtonTitle;
    this.saveButtonTitle = saveButtonTitle;
    this.pageName = pageName;
  }

  async sentTOPOS(typeOfPayment, tableId) {
    this.typeOfPayment = typeOfPayment;
    this.tableId = tableId;
    $('#' + this.popupId).modal('show');
  }

  isTableOccupied(tableId) {
    return this.tableOrderDetailModel.filter(x => x.tableId == tableId).length > 0;
  }

  isAssignToTable() {
    if (this.orderMasterModel && this.orderMasterModel.orderDetailMaster) {
      return this.orderMasterModel.orderDetailMaster.length <= 0;
    }
    return false;
  }

  async placeOrder(tableId) {
    this.orderMasterModel = this.getTableDetails(tableId);
    if (this.orderDetailMaster.length > 0) {
      this.loading = true;
      await this.userService.addPwaOrder(this.orderMasterModel).toPromise()
        .then((res: any) => {
          this.loading = false;
          if (res.stateModel.statusCode === 200 && res.result != null) {
            if (isValidObject(res.result.orderId)) {
              this.updateTableDetails(tableId, res.result);
              this.orderMasterModel = new PwaOrderMasterModel();
              this.orderDetailMaster = [];
              this.sendCartCountSubject.next('');
              // this.router.navigate(["/ordersummary/" + res.result.orderNo]);
              this.routes.navigate(['./dashboard']);
              this.showMessage(MessageType.Success, 'Messages.OrderSuccessfully');
            } else {
              this.showMessage(MessageType.Error, res.stateModel.errorMessage);
            }
          } else if (res.stateModel.statusCode === 401) {
            this.showMessage(MessageType.Error, 'Messages.OrderFailed');
          } else if (res.stateModel.statusCode === 204) {
            this.showMessage(MessageType.Warning, 'Messages.OrderFailed');
          } else {
            this.showMessage(MessageType.Error, res.stateModel.errorMessage);
          }
          this.routes.navigate(['./dashboard']);
        }
        );
    }
  }
}
