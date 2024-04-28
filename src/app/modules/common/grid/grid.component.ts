import { ExportToExcelService } from './shared/export-to-excel.service';
import { GridConfiguration } from './Configuration/grid-configuration.model';
import { ChildToParent } from './models/child-to-parent.model';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Action, ExportTo, GridData } from './models/grid-data.model';
import { AdvanceSearch, ColumnFormatEnum, ColumnModel, StatusToSearch } from './models/grid-column.model';
import * as moment from 'moment';
import { ExportToPDFService } from './shared/export-to-pdf.service';
declare var $: any;
import { FavouriteDuration, FavouriteFilter, FavouriteSearch } from 'src/app/modules/common/grid/models/favourite-search.model';
import { Router } from '@angular/router';
import { SharedService } from 'src/services/webservices/shared.service';
import { DatePipe } from '@angular/common';
import { Guid } from 'guid-typescript';
import { MessageType } from 'src/app/common-imports/other-imports';
import { isNullOrUndefined } from 'util';
import { AMTGridDataService } from './services/amt-grid-data-broadcaster.service';
import { Subscription } from 'src/app/common-imports/rxjs-imports';
import { ActionEnum } from 'src/app/enums/aquisition.enum';
import { isNotNullOrUndefined } from '@microsoft/applicationinsights-core-js';
import { CommonAppConstants } from 'src/app/constants/app.constant';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnChanges {
  @Input() gridData: GridData;
  @Input() removeActionIcon: boolean;
  @Output() valueToParent = new EventEmitter<ChildToParent>();
  @Output() favouriteSearchItem = new EventEmitter<FavouriteSearch>();
  @Output() updateFavouriteSearchItem = new EventEmitter<FavouriteSearch>();
  @Output() addButton = new EventEmitter<string>();
  @Output() removeFavourite = new EventEmitter<string>();
  @Output() selectCheckBox = new EventEmitter<string>();
  customHeader: string;
  IsValidate: boolean = false;
  showCheckBox: boolean = false;
  showHeaderCheckBox: boolean = false;
  searchItems: string[] = [];
  dataForShow: any;
  originalData: any;
  unFilterData: any;
  firstLevelToggle = [];
  secondLevelToggle = [];
  memberOrderby = [];
  TrimTextSize = 25;
  totalPages: number;
  pages = [];
  currentPage: number;
  pageSize = new GridConfiguration().defaultRowCount;
  firstLevelColumns: ColumnModel[];
  secondLevelColumns: ColumnModel[];
  thirdLevelColumns: ColumnModel[];
  favouriteSearch: FavouriteSearch[] = [];
  currentDataAgingOption: number;
  addButtonName: string;
  firstLevelFilterColumn = [];
  firstLevelHiddenColumn = [];
  firstLevelFilterData = [];
  secondLevelFilterColumn = [];
  secondLevelHiddenColumn = [];
  thirdLevelFilterColumn = [];
  thirdLevelHiddenColumn = [];
  IsDataAgeingFilterVisible: boolean;
  IsSearchVisible: boolean;
  IsPaginationVisible: boolean;
  DataAgeingFilterColumn: string;
  ChangeDefaultFilterOption: number;
  FirstLevelActions: Action = null;
  SecondLevelActions: Action = null;
  ThirdLevelActions: Action = null;
  IsColumnFilterVisible: boolean = false;
  IsExportOptionVisible: ExportTo = { Excel: false, PDF: false };
  Tablenames = [];
  trimColumnName = 'Header';
  trimColumnValue = 'This is a dummy text';
  TableCssClass: string = '';
  primaryKeyColumns = [];
  pageSizeOptions = new GridConfiguration().pageSize;
  maxPages = new GridConfiguration().MaxPageCount;
  fileName = 'ExcelSheet.xlsx';
  StaticImagePath: string;
  openFilterBlockName: string;
  pageName: string;
  CurrencySign = new GridConfiguration().currencyType;
  hamburgerImage = new GridConfiguration().HamberIcon;
  favouriteItem: FavouriteSearch;
  favouriteItemFilter: FavouriteFilter;
  favouriteItemFilterDuration: FavouriteDuration;
  favouriteItemSort = [];
  selectedValidFrom = '';
  selectedValidEnd = '';
  showCustomDateFilter = true;
  dateFormat = new GridConfiguration().gridDateFormat;
  dateWithoutTime = new GridConfiguration().dateWithoutTime;
  fromCustomDateCalenderConfig: any;
  endCustomDateCalenderConfig: any;
  favouriteSearchId: any;
  advanceSearchFilters: AdvanceSearch[] = [];
  removedAdvanceSearchIndex = 0;
  statusesToSearch: StatusToSearch[] = [];
  subscriptions = new Array<Subscription>();
  actionEnum = ActionEnum;
  actionEnumAdd = ActionEnum.Add;
  actionEnumRemove = ActionEnum.Remove;
  actionEnumCancel = ActionEnum.Cancel;
  actionEnumDetails = ActionEnum.Details;
  descriptionContent: any;
  descriptionPopupId : any;
  constructor(public router: Router,
    private gridBroadcaster: AMTGridDataService,
    public sharedService: SharedService) {
    this.advanceSearchFilters.push({ columnName: 'Select field', operator: 'Select operator', searchString: '' });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['gridData']) {
      this.gridData = changes.gridData.currentValue;
      if(!isNullOrUndefined(this.gridData) && isNullOrUndefined(this.gridData.Data)){
        this.gridData.Data = [];
      }
      this.adaptData(this.gridData);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }
  ngOnInit(): void {
    this.subscriptions.push(this.gridBroadcaster.passSearchCriteriObs.subscribe(res => {
      this.statusesToSearch = res;
      this.applyCombination();
    }));

    this.subscriptions.push(this.gridBroadcaster.firstLevelRowClickObs.subscribe(res => {
      if (this.gridData.enableRowDoubleClick) {
        if (res.level == ActionEnum.First) {
          let firstLevelPrimaryKeyValue = res.firstLevel[this.firstLevelColumns[this.primaryKeyColumns[0]].Name];

          this.valueToParent.emit(
            {
              id: firstLevelPrimaryKeyValue,
              level: ActionEnum.First,
              action: ActionEnum.RowDoubleClicked,
              data: res.firstLevel,
              wholeRow: res.firstLevel,
              allPrimaryKeyValue: [firstLevelPrimaryKeyValue.toString()],
              currentPage: this.currentPage
            });
        }
        else if (res.level == ActionEnum.Second) {
          let firstLevelPrimaryKeyValue = res.firstLevel[this.firstLevelColumns[this.primaryKeyColumns[0]].Name];
          let secondLevelPrimaryKeyValue = res.secondLevel[this.secondLevelColumns[this.primaryKeyColumns[1]].Name];

          this.valueToParent.emit(
            {
              id: secondLevelPrimaryKeyValue,
              level: ActionEnum.Second,
              action: ActionEnum.RowDoubleClicked,
              data: res.secondLevel,
              wholeRow: res.firstLevel,
              allPrimaryKeyValue: [firstLevelPrimaryKeyValue.toString(), secondLevelPrimaryKeyValue.toString()],
              currentPage: this.currentPage
            });
        }
        else if (res.level == ActionEnum.Third) {
          let firstLevelPrimaryKeyValue = res.firstLevel[this.firstLevelColumns[this.primaryKeyColumns[0]].Name];
          let secondLevelPrimaryKeyValue = res.secondLevel[this.secondLevelColumns[this.primaryKeyColumns[1]].Name];
          let thirdLevelPrimaryKeyValue = res.thirdLevel[this.thirdLevelColumns[this.primaryKeyColumns[2]].Name]

          this.valueToParent.emit(
            {
              id: thirdLevelPrimaryKeyValue,
              level: ActionEnum.Third,
              action: ActionEnum.RowDoubleClicked,
              data: res.thirdLevel,
              wholeRow: res.firstLevel,
              allPrimaryKeyValue: [
                firstLevelPrimaryKeyValue.toString(),
                secondLevelPrimaryKeyValue.toString(),
                thirdLevelPrimaryKeyValue.toString()
              ],
              currentPage: this.currentPage
            });
        }
      }
    }));
  }

  doubleClickFunction(lvl, flvlresponse, slvlresponse, tlvlresponse) {
    const res = {
      level: lvl,
      firstLevel: flvlresponse,
      secondLevel: slvlresponse,
      thirdLevel: tlvlresponse
    };
    if (this.gridData.enableRowDoubleClick) {
      if (res.level == ActionEnum.First) {
        let firstLevelPrimaryKeyValue = res.firstLevel[this.firstLevelColumns[this.primaryKeyColumns[0]].Name];
        this.valueToParent.emit(
          {
            id: firstLevelPrimaryKeyValue,
            level: ActionEnum.First,
            action: ActionEnum.RowDoubleClicked,
            data: res.firstLevel,
            wholeRow: res.firstLevel,
            allPrimaryKeyValue: [firstLevelPrimaryKeyValue.toString()],
            currentPage: this.currentPage
          });
      }
      else if (res.level == ActionEnum.Second) {
        let firstLevelPrimaryKeyValue = res.firstLevel[this.firstLevelColumns[this.primaryKeyColumns[0]].Name];
        let secondLevelPrimaryKeyValue = res.secondLevel[this.secondLevelColumns[this.primaryKeyColumns[1]].Name];
        this.valueToParent.emit(
          {
            id: secondLevelPrimaryKeyValue,
            level: ActionEnum.Second,
            action: ActionEnum.RowDoubleClicked,
            data: res.secondLevel,
            wholeRow: res.firstLevel,
            allPrimaryKeyValue: [firstLevelPrimaryKeyValue.toString(), secondLevelPrimaryKeyValue.toString()],
            currentPage: this.currentPage
          });
      }
      else if (res.level == ActionEnum.Third) {
        let firstLevelPrimaryKeyValue = res.firstLevel[this.firstLevelColumns[this.primaryKeyColumns[0]].Name];
        let secondLevelPrimaryKeyValue = res.secondLevel[this.secondLevelColumns[this.primaryKeyColumns[1]].Name];
        let thirdLevelPrimaryKeyValue = res.thirdLevel[this.thirdLevelColumns[this.primaryKeyColumns[2]].Name]
        this.valueToParent.emit(
          {
            id: thirdLevelPrimaryKeyValue,
            level: ActionEnum.Third,
            action: ActionEnum.RowDoubleClicked,
            data: res.thirdLevel,
            wholeRow: res.firstLevel,
            allPrimaryKeyValue: [
              firstLevelPrimaryKeyValue.toString(),
              secondLevelPrimaryKeyValue.toString(),
              thirdLevelPrimaryKeyValue.toString()
            ],
            currentPage: this.currentPage
          });
      }
    }
  }
  // Get the data from parent and organise them to show
  adaptData(grid: GridData) {
    let status = this.fillColumnsAndTableName(grid);
    if (status) { // All the things are good and grid can be rendered
      this.IsValidate = true;
      this.unFilterData = grid.Data;
      if (grid.IsDataAgeingFilterVisible) {
        if (grid.dataFilterOptionsConfiguration) {
          this.gridData.dataFilterOptionsConfiguration = grid.dataFilterOptionsConfiguration;
          let filterOption = this.gridData.dataFilterOptionsConfiguration.findIndex(x => x.isDefault);
          if (this.currentDataAgingOption) {
            this.ChangeDefaultFilterOption = this.currentDataAgingOption;
          } else {
            this.ChangeDefaultFilterOption = filterOption + 1;
            this.currentDataAgingOption = filterOption + 1;
          }
        }
      }
      this.applySelectedFavouriteView();
      if (grid.IsPaginationVisible && this.gridData.goToPage) {
        this.changePage(this.gridData.goToPage);
      }
    } else {
      this.IsValidate = false;
    }
  }

  // Function is used for insuring neccessary data is available else it automatically generate columns
  fillColumnsAndTableName(grid: GridData): boolean {
    // Validations
    if (!this.validationCheck(grid))
      return false;
    // Search visible
    this.showCustomDateFilter = grid.isCustomDateFilterVisible;
    this.IsSearchVisible = grid.IsSearchVisible ? true : false;
    if (grid.favouriteSearchViews)
      this.favouriteSearch = grid.favouriteSearchViews;
    this.StaticImagePath = grid.StaticImagePath;
    this.addButtonName = grid.addButtonName;
    this.TableCssClass = grid.TableCssClass;
    this.showCheckBox = grid.showCheckBox;
    this.showHeaderCheckBox = grid.showHeaderCheckBox;
    this.customHeader = grid.customHeader;
    this.IsColumnFilterVisible = grid.IsColumnFilterVisible;
    this.IsExportOptionVisible = grid.IsExportOptionVisible;
    this.TrimTextSize = grid.TrimTextSize;
    this.fromCustomDateCalenderConfig = grid.fromCustomDateCalenderConfig ? grid.fromCustomDateCalenderConfig : this.sharedService.gridCustomDate;
    this.endCustomDateCalenderConfig = grid.endCustomDateCalenderConfig ? grid.endCustomDateCalenderConfig : this.sharedService.gridCustomDate;
    if (grid.pageSizeOptions)
      this.pageSizeOptions = grid.pageSizeOptions;
    // Filtering data
    this.firstLevelColumns = grid.FirstLevelColumnNames;
    if (grid.defaultRowCount != null)
      this.pageSize = grid.defaultRowCount;
    this.IsPaginationVisible = grid.IsPaginationVisible;
    let index = 0;
    this.primaryKeyColumns = [];
    this.firstLevelFilterColumn = [];
    this.firstLevelHiddenColumn = [];
    if (this.firstLevelColumns != null) {
      this.firstLevelColumns.forEach(element => {
        for (let key in element) {
          if (key == "IsPrimaryKey" && element[key]) {
            this.primaryKeyColumns.push(index);
          }
          if (key == "IsFilterable" && element[key]) {
            this.firstLevelFilterColumn.push(element.Name);
          }

        }
        index++;
        if (element["IsFilterable"]) {
          this.firstLevelHiddenColumn.push(element);
        }
      });
    }
    if (this.firstLevelFilterColumn == null) {
      return false;
    }
    index = 0;
    this.secondLevelFilterColumn = [];
    this.secondLevelHiddenColumn = [];
    this.secondLevelColumns = grid.SecondLevelColumnNames;
    if (this.secondLevelColumns != null) {
      this.secondLevelColumns.forEach(element => {
        for (let key in element) {
          if (key == "IsPrimaryKey" && element[key]) {
            this.primaryKeyColumns.push(index);
          }
          if (key == "IsFilterable" && element[key]) {
            this.secondLevelFilterColumn.push(element.Name);
          }
        }
        index++;
        if (!element["ShowColumn"]) {
          this.secondLevelHiddenColumn.push(element);
        }
      });
    }
    index = 0;
    this.thirdLevelFilterColumn = [];
    this.thirdLevelHiddenColumn = [];
    this.thirdLevelColumns = grid.ThirdLevelColumnNames;
    if (this.thirdLevelColumns != null) {
      this.thirdLevelColumns.forEach(element => {
        for (let key in element) {
          if (key == "IsPrimaryKey" && element[key]) {
            this.primaryKeyColumns.push(index);
          }
          if (key == "IsFilterable" && element[key]) {
            this.thirdLevelFilterColumn.push(element.Name);
          }
        }
        index++;
        if (!element["ShowColumn"]) {
          this.thirdLevelHiddenColumn.push(element);
        }
      });
    }

    if (grid.FirstLevelActions == null)
      this.FirstLevelActions = null;
    else
      this.FirstLevelActions = grid.FirstLevelActions;
    if (grid.SecondLevelActions == null)
      this.SecondLevelActions = null;
    else
      this.SecondLevelActions = grid.SecondLevelActions;
    if (grid.ThirdLevelActions == null)
      this.ThirdLevelActions = null;
    else
      this.ThirdLevelActions = grid.ThirdLevelActions;

    return true;

  }

  performOperations(operation: string) {
    switch (operation) {
      case 'eraseSearch': {
        this.searchItems = [];
        $(".ng2-tag-input__text-input").val('');
        this.gridBroadcaster.removeAllStatusCheckbox.next();
        this.statusesToSearch = [];
        this.applyCombination();
        break;
      }
      case 'searchAdd': {
        this.gridBroadcaster.removeAllStatusCheckbox.next();
        this.statusesToSearch = [];
        this.applyCombination();
        break;
      }
      case 'searchRemove': {
        this.gridBroadcaster.removeAllStatusCheckbox.next();
        this.statusesToSearch = [];
        this.applyCombination();
        break;
      }
      case 'filter': {
        this.gridBroadcaster.removeAllStatusCheckbox.next();
        this.statusesToSearch = [];
        this.applyCombination();
        break;
      }
      case 'removeAllAdvanceSearch': {
        this.gridBroadcaster.removeAllStatusCheckbox.next();
        this.statusesToSearch = [];
        this.advanceSearchFilters = [];
        this.advanceSearchFilters.push({ columnName: 'Select field', operator: 'Select operator', searchString: '' });
        this.applyCombination();
        break;
      }
      case 'removeAdvanceSearch': {
        this.gridBroadcaster.removeAllStatusCheckbox.next();
        this.statusesToSearch = [];
        this.advanceSearchFilters.splice(this.removedAdvanceSearchIndex, 1);
        break;
      }
      case 'addAdvanceSearch': {
        this.gridBroadcaster.removeAllStatusCheckbox.next();
        this.statusesToSearch = [];
        if (this.doValidationForHiddenSearch(true))
          this.advanceSearchFilters.push({ columnName: 'Select field', operator: 'Select operator', searchString: '' });
        break;
      }
      case 'applyAdvanceSearch': {
        this.gridBroadcaster.removeAllStatusCheckbox.next();
        this.statusesToSearch = [];
        if (this.doValidationForHiddenSearch(true))
          this.applyCombination();
        break;
      }
      case 'addButtonClicked': {
        this.addButtonClick();
        break;
      }
      case 'clearFavouriteView': {
        this.searchItems = [];
        this.gridBroadcaster.removeAllStatusCheckbox.next();
        this.statusesToSearch = [];
        this.advanceSearchFilters = [];
        this.advanceSearchFilters.push({ columnName: 'Select field', operator: 'Select operator', searchString: '' });
        this.applyCombination();
        break;
      }
      case 'clearEverything': {
        this.currentDataAgingOption = 1;
        this.ChangeDefaultFilterOption = 1;
        $("#filter0_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).prop('checked', true);
        this.selectedValidFrom = '';
        this.selectedValidEnd = '';
        this.searchItems = [];
        this.gridBroadcaster.removeAllStatusCheckbox.next();
        this.statusesToSearch = [];
        this.advanceSearchFilters = [];
        this.advanceSearchFilters.push({ columnName: 'Select field', operator: 'Select operator', searchString: '' });
        this.applyCombination();
        break;
      }
    }
  }

  applyCombination() {
    this.filterData();
    this.search();
    this.hiddenFilterSearch();
    if (this.gridData.useStatusCountService)  // broadcast only when parent need status count
      this.broadcastStatus(this.gridData.PageName);
    this.applyStatusSearch();
    this.doPagination();
  }

  applyStatusSearch() {
    if (this.statusesToSearch.length == 0)
      return;
    let columnToSearch: any[];
    columnToSearch = this.statusesToSearch.map(item => item.columnName).filter((value, index, self) => self.indexOf(value) === index);
    if (isNotNullOrUndefined(columnToSearch) && columnToSearch.length > 0) {
      columnToSearch.forEach(column => {
        let statuses: StatusToSearch[] = this.statusesToSearch.filter(x => x.columnName == column);
        let data = [];
        if (isNotNullOrUndefined(statuses) && statuses.length > 0) {
          statuses.forEach(status => {
            if (isNotNullOrUndefined(this.originalData) && this.originalData.length > 0 &&
              (isNullOrUndefined(status.pageName) || status.pageName == this.gridData.PageName)) { //page name is checked for multiple grid on same page
              this.originalData.some(element => {
                if (isNotNullOrUndefined(element[column]) && element[column].toLowerCase() == status.searchString.toLowerCase()) {
                  data.push(element);
                }
              });
            }
          });
        }
        if (isNotNullOrUndefined(this.statusesToSearch) &&
          (isNullOrUndefined(this.statusesToSearch[0].pageName) ||
            this.statusesToSearch[0].pageName == this.gridData.PageName)) { //page name is checked for multiple grid on same page
          this.originalData = data;
        }
      })
    }
  }

  // Hidden field search
  hiddenFilterSearch() {
    if (!this.doValidationForHiddenSearch())
      return;
    for (let i = 0; i < this.advanceSearchFilters.length; i++) {
      let element = this.advanceSearchFilters[i];
      this.doValidationForHiddenSearch(true);
      this.filterHiddenColumn("String", element.columnName, element.searchString, element.searchString.length, element.operator, i);
    }
  }

  // get mobile number format
  getMobileFormat(mobile: string) {
    if (mobile == '' || mobile == null)
      return '';
    return mobile.substr(0, 5) + " " + mobile.substr(5);
  }
  getLicencePlateFormat(licenceNumber: string) {
    if (licenceNumber == '' || licenceNumber == null)
      return '';
    return licenceNumber.substr(0, 4) + " " + licenceNumber.substr(4);
  }

  checkForRoutes(): boolean {
    if (this.router.url.includes('addopportunity')
      || this.router.url.includes('addlead')
      || this.router.url.includes('editlead')
      || this.router.url.includes('viewlead')
      || this.router.url.includes('editopportunity')
      || this.router.url.includes('viewopportunity'))
      return true;
    else
      return false;
  }

  // Filter hidden column
  filterHiddenColumn(dataType: string, columnName: string, searchString: string, searchStringLength: number, operator: string, row: number) {
    if (row == 0) {
      if (searchStringLength > 0) {
        if (dataType == "String") {
          if (operator == "Contains") {
            this.dataForShow = this.originalData.filter(item => item[columnName] != null &&
              JSON.stringify(item[columnName] || '').toLowerCase()
                .includes(searchString.toLowerCase()));
          } else if (operator == "Does not contain") {
            this.dataForShow = this.originalData.filter(item => item[columnName] != null &&
              !JSON.stringify(item[columnName] || '').toLowerCase()
                .includes(searchString.toLowerCase()));
          } else if (operator == "Equals") {
            this.dataForShow = this.originalData.filter(item => item[columnName] != null &&
              item[columnName].toString().toLowerCase() === searchString.toLowerCase());
          } else if (operator == "Does not equal") {
            this.dataForShow = this.originalData.filter(item => item[columnName] != null &&
              item[columnName].toString().toLowerCase() !== searchString.toLowerCase());
          } else if (operator == "Start with") {
            this.dataForShow = this.originalData.filter(item => item[columnName] != null &&
              item[columnName].toString().toLowerCase()
                .startsWith(searchString.toLowerCase()));
          } else if (operator == "Ends with") {
            this.dataForShow = this.originalData.filter(item => item[columnName] != null &&
              item[columnName].toString().toLowerCase()
                .endsWith(searchString.toLowerCase()));
          }
        }
        this.originalData = this.dataForShow;
      }
    } else {
      if (searchStringLength > 0) {
        if (dataType == "String") {
          if (operator == "Contains") {
            this.dataForShow = this.dataForShow.filter(item => item[columnName] != null &&
              JSON.stringify(item[columnName] || '').toLowerCase()
                .includes(searchString.toLowerCase()));
          } else if (operator == "Does not contain") {
            this.dataForShow = this.dataForShow.filter(item => item[columnName] != null &&
              !JSON.stringify(item[columnName] || '').toLowerCase()
                .includes(searchString.toLowerCase()));
          } else if (operator == "Equals") {
            this.dataForShow = this.dataForShow.filter(item => item[columnName] != null &&
              item[columnName].toString().toLowerCase() === searchString.toLowerCase());
          } else if (operator == "Does not equal") {
            this.dataForShow = this.dataForShow.filter(item => item[columnName] != null &&
              item[columnName].toString().toLowerCase() !== searchString.toLowerCase());
          } else if (operator == "Start with") {
            this.dataForShow = this.dataForShow.filter(item => item[columnName] != null &&
              item[columnName].toString().toLowerCase()
                .startsWith(searchString.toLowerCase()));
          } else if (operator == "Ends with") {
            this.dataForShow = this.dataForShow.filter(item => item[columnName] != null &&
              item[columnName].toString().toLowerCase()
                .endsWith(searchString.toLowerCase()));
          }
        }
        this.originalData = this.dataForShow;
      }
    }
  }

  // Perform validation when applying hidden search
  doValidationForHiddenSearch(applyClass: boolean = false): boolean {
    var isValid = true;
    for (let i = 0; i < this.advanceSearchFilters.length; i++) {
      let element = this.advanceSearchFilters[i];
      if (element.columnName == 'Select field') {
        if (applyClass) $("#hiddenField_" + this.removeSpaceAndReplaceDash(this.gridData.PageName) + '_' + i).addClass("inputvalidation");
        isValid = false;
      }
      if (element.operator == 'Select operator') {
        if (applyClass) $("#hiddenFieldOperator_" + this.removeSpaceAndReplaceDash(this.gridData.PageName) + '_' + i).addClass("inputvalidation");
        isValid = false;
      }
      if (element.searchString == null || element.searchString == '') {
        if (applyClass) $("#hiddenFieldTextSearch_" + this.removeSpaceAndReplaceDash(this.gridData.PageName) + '_' + i).addClass("inputvalidation");
        isValid = false;
      }
      if (!isValid && applyClass) {
        let pageName = this.removeSpaceAndReplaceDash(this.gridData.PageName);
        setTimeout(function () {
          $('#hiddenField_' + pageName + '_' + i).removeClass('inputvalidation');
          $('#hiddenFieldOperator_' + pageName + '_' + i).removeClass('inputvalidation');
          $('#hiddenFieldTextSearch_' + pageName + '_' + i).removeClass('inputvalidation');
        }, 5000);
      }
    };
    return isValid;
  }

  // Delete favourite search
  removeFavouriteSearch(gridFavouriteId: string) {
    this.favouriteSearchId = gridFavouriteId;
    $('#removeFavouriteFilter_' + this.removeSpaceAndReplaceDash(this.gridData.PageName)).modal('show');
  }

  // add multiple filter
  counter(i: number) {
    return new Array(i);
  }

  // Check for validation
  validationCheck(grid: GridData): boolean {
    if (grid.Data == null) {
      return false;
    }
    if (grid.FirstLevelColumnNames == null) {
      return false;
    }
    if (grid.PageName == null || grid.PageName == '') {
      this.pageName = 'records';
    } else {
      this.pageName = grid.PageName;
    }
    if (grid.Tablenames != null && grid.Tablenames.length > 0)
      this.Tablenames = grid.Tablenames;
    else {
      if (grid.SecondLevelColumnNames != null) {
        return false;
      }
    }
    if (grid.IsDataAgeingFilterVisible && grid.DataAgeingFilterColumn == null) {
      return false;
    } else {
      this.IsDataAgeingFilterVisible = grid.IsDataAgeingFilterVisible;
      this.DataAgeingFilterColumn = grid.DataAgeingFilterColumn;
    }
    if (grid.ChangeDefaultFilterOption < 1 || grid.ChangeDefaultFilterOption > 3) {
      return false;
    } else {
      this.ChangeDefaultFilterOption = grid.ChangeDefaultFilterOption;
    }
    if (grid.ChangeDefaultFilterOption == 3 && grid.FromEndCustomDate == null) {
      return false;
    }
    return true;
  }

  getStringArrayFromCommaSeperatedString(string) {
    if (string != "" && string != undefined && string != null) {
      return string.split(',');
    }
    return [];
  }

  replaceHtmlRuleWithOriginalValue(html, valueToReplace) {
    return html.replace('@#', valueToReplace);
  }

  // filter data for Data Ageing
  filterData() {
    let filterOption = this.currentDataAgingOption;
    let FromDate = this.selectedValidFrom;
    let EndDate = this.selectedValidEnd;
    if (!this.IsDataAgeingFilterVisible) {
      this.originalData = this.gridData.Data;
      return;
    }
    let pipe = new DatePipe("en-US");
    if (filterOption != 100 && filterOption != 200) {
      let filter = this.gridData.dataFilterOptionsConfiguration[filterOption - 1];
      var d = new Date();
      let data = [];
      this.originalData = [];
      if (filter.calenderDate) {
        // filter by month's starting date to end date
        var firstDay;
        var lastDay;
        if (filter.isForwardMonth) {
          // from next month start date to last forwarded month last date
          firstDay = new Date(d.getFullYear(), d.getMonth() + 1, 1);
          lastDay = new Date(d.getFullYear(), d.getMonth() + filter.months + 1, 0);
        } else {
          // from this month start date to end date
          firstDay = new Date(d.getFullYear(), d.getMonth(), 1);
          lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0);
        }
        // filter data
        this.unFilterData.forEach(element => {
          let filterDate = isNullOrUndefined(element[filter.filterByDataField]) ? element[filter.alternateDataField] : element[filter.filterByDataField];
          let dt = new Date(pipe.transform(filterDate, 'short'))
          if (dt >= new Date(pipe.transform(firstDay, 'shortDate')) && dt <= new Date(pipe.transform(lastDay, 'shortDate')))
            data.push(element);
        });
      }
      else if (filter.showAllFeature) {
        data = this.unFilterData;
      } else {
        // filter data by today's date
        if (filter.isForwardMonth)
          d.setMonth(d.getMonth() + filter.months);
        else
          d.setMonth(d.getMonth() - filter.months);
        this.unFilterData.forEach(element => {
          let filterDate = isNullOrUndefined(element[filter.filterByDataField]) ? element[filter.alternateDataField] : element[filter.filterByDataField];
          if (new Date(pipe.transform(filterDate, 'short')) >= new Date(d))
            data.push(element);
        });
      }
      this.originalData = data;
    }
    else if (filterOption == 100) {
      let data = [];
      if (FromDate != undefined && FromDate != '') {
        let from = new Date(FromDate);
        let end = new Date(EndDate);
        if (!isNullOrUndefined(this.gridData.endCustomDateCalenderConfig)) {
          end = new Date(end.getFullYear(), end.getMonth() + 1, 0);
        }
        if (end < from) {
          this.sharedService.showMessage(MessageType.Warning, 'AMTGrid.EndDateLessThanStartDate');
          return false;
        }
        if (EndDate == null || EndDate == '')
          end = new Date();
        this.originalData = [];
        this.unFilterData.forEach(element => {
          var dt = new Date(pipe.transform(element[this.gridData.DataAgeingFilterColumn], 'shortDate'));
          if (dt >= new Date(pipe.transform(from, 'shortDate')) && dt <= new Date(pipe.transform(end, 'shortDate')))
            data.push(element);
        });
        this.originalData = data;
      }
    }
    else if (filterOption == 200) {
      let excludeFieldName = this.gridData.showPending.excludeFieldName;
      let includeFieldName = this.gridData.showPending.includeFieldName;
      this.originalData = this.gridData.Data.filter(item => item[excludeFieldName] == null);
      if (this.gridData.showPending.isAscOrder)
        this.originalData.sort((a: string, b: string) => String(a[includeFieldName]).toLowerCase() > String(b[includeFieldName]).toLowerCase() ? 1 : -1);
      else
        this.originalData.sort((a: string, b: string) => String(a[includeFieldName]).toLowerCase() > String(b[includeFieldName]).toLowerCase() ? -1 : 1);
    }
  }

  // Change page size from dropdown
  changePageSize(size: string) {
    this.pageSize = parseInt(size);
    this.doPagination();
  }

  // Logic for rendering page numbers
  doPagination(length: number = this.originalData.length) {
    if (!this.IsPaginationVisible) {
      this.dataForShow = this.originalData;
      return;
    }
    this.totalPages = Math.ceil(length / this.pageSize);
    this.pages = [];
    this.pages = [];
    this.maxPages = new GridConfiguration().MaxPageCount;
    if (this.maxPages < this.totalPages) {
      for (let i = 1; i <= this.maxPages; i++) {
        this.pages.push(i);
      }
      this.pages.push("...");
    } else {
      for (let i = 1; i <= this.totalPages; i++) {
        this.pages.push(i);
      }
    }
    this.currentPage = 1;
    this.dataForShow = this.originalData.slice(0, this.pageSize);
  }

  // Change page directly from page number
  public changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.smartPagination();
    this.doPageChange();
  }

  // Change pagination with smart pagination
  public smartPagination() {
    this.pages = [];
    if (this.maxPages + this.currentPage <= this.totalPages) {
      for (let i = (this.currentPage == 1) ? this.currentPage : (this.currentPage - 1); i < (this.maxPages + this.currentPage); i++) {
        this.pages.push(i);
      }
      this.pages.push("...");
    } else {
      for (let i = (this.totalPages - this.maxPages) > 0 ? (this.totalPages - this.maxPages) : 1; i <= this.totalPages; i++) {
        this.pages.push(i);
      }
    }
  }
  // Show next page
  public nextPage() {
    if (this.currentPage + 1 <= this.totalPages) {
      this.currentPage += 1;
      this.smartPagination();
      this.doPageChange();
    }
  }

  // Show previous page
  public prevPage() {
    if (this.currentPage - 1 > 0) {
      this.currentPage -= 1;
      this.smartPagination();
      this.doPageChange();
    }
  }

  // Logic for changing pages
  doPageChange() {
    let currentIndex = (this.currentPage - 1) * this.pageSize;
    this.dataForShow = this.originalData.slice(currentIndex, currentIndex + this.pageSize);
  }

  applySelectedFavouriteView() {
    let isSelectedViewFound = false;
    for (let index = 0; index < this.favouriteSearch.length; index++) {
      if (this.favouriteSearch[index].isFavouriteViewSelected == true) {
        isSelectedViewFound = true;
        this.applyFavouriteSearch(this.favouriteSearch[index]);
        break;
      }
    }
    if (!isSelectedViewFound)
      this.applyCombination();
  }

  // Favourite search
  applyFavouriteSearch(favourite: FavouriteSearch) {
    // Step 1: Applying DataAging Filter
    this.ChangeDefaultFilterOption = favourite.Filter.Duration.FilterOption;
    this.currentDataAgingOption = this.ChangeDefaultFilterOption;
    // Step 2: Applying Searching
    this.searchItems = favourite.Filter.SearchText;
    // step 3: Applying advance search
    if (favourite.Filter.advanceFilters) {
      this.advanceSearchFilters = JSON.parse(JSON.stringify(favourite.Filter.advanceFilters));
    }
    else {
      this.advanceSearchFilters = [];
      this.advanceSearchFilters.push({ columnName: 'Select field', operator: 'Select operator', searchString: '' });
    }
    // step 4: applying status search
    if (favourite.Filter.statusSearch) {
      this.statusesToSearch = JSON.parse(JSON.stringify(favourite.Filter.statusSearch));
      this.gridBroadcaster.addStatusCheckbox.next(this.statusesToSearch);
    }
    else
      this.statusesToSearch = [];
    if (favourite.Filter.Duration.FilterOption != 100 && favourite.Filter.Duration.FilterOption != 200) {
      $("#filter" + (favourite.Filter.Duration.FilterOption - 1)).prop('checked', true);
    }
    else if (favourite.Filter.Duration.FilterOption == 100) {
      this.selectedValidFrom = favourite.Filter.Duration.FilterDate.StartDate;
      this.selectedValidEnd = favourite.Filter.Duration.FilterDate.EndDate;
      $("#Customday_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).prop('checked', true);
    } else if (favourite.Filter.Duration.FilterOption == 200) {
      $('#pendingFilter_' + this.removeSpaceAndReplaceDash(this.gridData.PageName)).prop('checked', true);
    }
    // step 5: Perform all the operations
    this.applyCombination();

    // Step 6: Applying Sorting
    favourite.Sort.forEach(element => {
      if (JSON.stringify(this.firstLevelColumns).includes(element.Column)) {
        if (element.Direction == 'asc') {
          this.memberOrderby[element.Column] = true;
          this.sort(element.Column, null, null);
        } else if (element.Direction == 'desc') {
          this.memberOrderby[element.Column] = false;
          this.sort(element.Column, null, null);
        }
      }
    });
  }

  // Save favourite search item
  saveFavouriteSearch(searchName: string, filterOption: number, isFavouriteViewSelected: boolean) {
    if (this.doValidationForFavouriteSearch()) {
      this.favouriteItem = new FavouriteSearch();
      this.favouriteItemFilter = new FavouriteFilter();
      this.favouriteItemFilterDuration = new FavouriteDuration();
      this.favouriteItem.UserId = Guid.parse("32478fd7-a7ca-4eb8-9269-5f57fd1437a0");
      this.favouriteItem.CreatedDate = new Date().toISOString().slice(0, -1);
      this.favouriteItem.SearchName = searchName;
      this.favouriteItemFilter.SearchText = this.searchItems;
      this.favouriteItemFilterDuration.FilterOption = filterOption;
      if (filterOption == 100)
        this.favouriteItemFilterDuration.FilterDate = { StartDate: this.selectedValidFrom, EndDate: this.selectedValidEnd };
      this.favouriteItemSort = [];
      for (let key in this.memberOrderby) {
        if (JSON.stringify(this.firstLevelColumns).includes(key)) {
          this.favouriteItemSort.push({ Column: key, Direction: this.memberOrderby[key] ? 'desc' : 'asc' });
        }
      }
      this.favouriteItem.Sort = this.favouriteItemSort;
      this.favouriteItem.GridFavouriteId = Guid.create()["value"];
      this.favouriteItem.isFavouriteViewSelected = isFavouriteViewSelected;
      this.favouriteItemFilter.Duration = this.favouriteItemFilterDuration;
      this.favouriteItemFilter.advanceFilters = this.advanceSearchFilters;
      this.favouriteItemFilter.statusSearch = this.statusesToSearch;
      this.favouriteItem.Filter = this.favouriteItemFilter;
      this.favouriteItem.ViewName = this.gridData.PageName;
      $("#favouriteSearchText_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).val('');
      this.favouriteSearchItem.emit(this.favouriteItem);
    }
  }

  updateFavouriteSearch(favouriteSearch: FavouriteSearch) {
    this.updateFavouriteSearchItem.emit(favouriteSearch);
    if (favouriteSearch.isFavouriteViewSelected == false) {
      this.performOperations("clearEverything");
    }
  }

  // Perform validation when saving your favourite search
  doValidationForFavouriteSearch(): boolean {
    var isValid = true;
    if ($("#favouriteSearchText_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).val() == null || $("#favouriteSearchText_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).val() == '') {
      $("#favouriteSearchText_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).addClass("inputvalidation");
      isValid = false;
    }
    if (!isValid) {
      setTimeout(function () {
        $('#favouriteSearchText_' + this.removeSpaceAndReplaceDash(this.gridData.PageName)).removeClass('inputvalidation');
      }, 5000);
    }
    return isValid;
  }

  // Performing searching in all layers
  public search() {
    if (this.searchItems.length > 0) {
      var searchString = this.searchItems;
      this.dataForShow = [];
      for (var i = 0; i < searchString.length; i++) {
        if (i == 0) {
          if (searchString[0].startsWith('-')) {
            this.originalData.some(element => {
              if (!JSON.stringify(element).toLowerCase().includes(searchString[0].slice(1).toLowerCase())) {
                this.dataForShow.push(element);
              }
            });
          } else {
            this.originalData.some(element => {
              if (JSON.stringify(element).toLowerCase().includes(searchString[0].toLowerCase())) {
                this.dataForShow.push(element);
              }
            });
            // this.originalData.some(element => {
            //   for (let key of this.firstLevelFilterColumn) {
            //     if (JSON.stringify(element[key]||'').toLowerCase().includes(searchString[0].toLowerCase())) {
            //       this.dataForShow.push(element);
            //       break;
            //     }
            //   }
            // });
          }
        }
        else {
          var filterSecond = [];
          if (searchString[i].startsWith('-')) {
            this.dataForShow.some(element => {
              if (!JSON.stringify(element).toLowerCase().includes(searchString[i].slice(1).toLowerCase())) {
                filterSecond.push(element);
              }
            });
          } else {
            this.dataForShow.some(element => {
              if (JSON.stringify(element).toLowerCase().includes(searchString[i].toLowerCase())) {
                filterSecond.push(element);
              }
            });
            // this.dataForShow.some(element => {
            //   for (let key of this.firstLevelFilterColumn) {
            //     if (JSON.stringify(element[key]||'').toLowerCase().includes(searchString[i].toLowerCase())) {
            //       filterSecond.push(element);
            //       break;
            //     }
            //   }
            // });
          }
          this.dataForShow = filterSecond;
        }
      }
      this.originalData = this.dataForShow;
    }
  }

  broadcastStatus(pageName) {
    let dataToBroadcast = [];
    dataToBroadcast = this.originalData;
    let statusColumnName = [];
    this.firstLevelColumns.forEach(e2 => {
      if (e2.Format == ColumnFormatEnum.Status) {
        statusColumnName.push(this.getStatusOccurance(dataToBroadcast, e2.Name))
      }
    });
    statusColumnName.push(pageName);
    this.gridBroadcaster.statusCountSub.next(statusColumnName);
  }

  getStatusOccurance(array, key) {
    let arrayToReturn = [];
    array.forEach((x) => {
      if (arrayToReturn.some((val) => { return val[key] == x[key] })) {
        arrayToReturn.forEach((k) => {
          if (k[key] === x[key]) {
            k["occurrence"]++;
          }
        })
      }
      else {
        let a = {}
        a[key] = x[key]
        a["occurrence"] = 1;
        arrayToReturn.push(a);
      }
    })
    return arrayToReturn;
  }

  // Check whether value is object or not
  public isObject(val) {
    if (val === null) { return false; }
    return ((typeof val === 'function') || (typeof val === 'object'));
  }

  // to make it unsorted nested object
  unsorted() { }

  // Performing sorting in all layers
  public sort(sortBy: string, firstLevelId?: number, secondLevelId?: number) {
    if (firstLevelId == null && secondLevelId == null) {  // First Level Sorting
      if (this.memberOrderby[sortBy] == undefined || !this.memberOrderby[sortBy]) {
        this.memberOrderby[sortBy] = true;
        this.originalData.sort((a: string, b: string) => String(a[sortBy]).toLowerCase() > String(b[sortBy]).toLowerCase() ? -1 : 1);
      } else {
        this.memberOrderby[sortBy] = false;
        this.originalData.sort((a: string, b: string) => String(a[sortBy]).toLowerCase() > String(b[sortBy]).toLowerCase() ? 1 : -1);
      }
      this.firstLevelToggle = [];
      this.secondLevelToggle = [];
    } else if (firstLevelId != null && secondLevelId == null) {  // Second Level Sorting
      if (this.memberOrderby[firstLevelId + sortBy] == undefined || !this.memberOrderby[firstLevelId + sortBy]) {
        this.memberOrderby[firstLevelId + sortBy] = true;
        this.originalData.find(x => x[this.firstLevelColumns[this.primaryKeyColumns[0]].Name] == firstLevelId)
        [this.Tablenames[0]].sort((a: string, b: string) => String(a[sortBy]).toLowerCase() > String(b[sortBy]).toLowerCase() ? -1 : 1)
      } else {
        this.memberOrderby[firstLevelId + sortBy] = false;
        this.originalData.find(x => x[this.firstLevelColumns[this.primaryKeyColumns[0]].Name] == firstLevelId)
        [this.Tablenames[0]].sort((a: string, b: string) => String(a[sortBy]).toLowerCase() > String(b[sortBy]).toLowerCase() ? 1 : -1);
      }
      this.secondLevelToggle = [];
    } else if (firstLevelId != null) {  // Third Level Sorting
      if (this.memberOrderby[secondLevelId + sortBy] == undefined || !this.memberOrderby[secondLevelId + sortBy]) {
        this.memberOrderby[secondLevelId + sortBy] = true;
        this.originalData.find(x => x[this.firstLevelColumns[this.primaryKeyColumns[0]].Name] == firstLevelId)
        [this.Tablenames[0]].find(x => x[this.secondLevelColumns[this.primaryKeyColumns[1]].Name] == secondLevelId)
        [this.Tablenames[1]].sort((a: string, b: string) => (String(a[sortBy]).toLowerCase() > String(b[sortBy]).toLowerCase() ? -1 : 1))
      } else {
        this.memberOrderby[secondLevelId + sortBy] = false;
        this.originalData.find(x => x[this.firstLevelColumns[this.primaryKeyColumns[0]].Name] == firstLevelId)
        [this.Tablenames[0]].find(x => x[this.secondLevelColumns[this.primaryKeyColumns[1]].Name] == secondLevelId)
        [this.Tablenames[1]].sort((a: string, b: string) => (String(a[sortBy]).toLowerCase() > String(b[sortBy]).toLowerCase() ? 1 : -1));
      }
    }
    this.doPagination();
  }

  // Export to excel
  exportexcel() {
    new ExportToExcelService().exportAsExcelFile(this.originalData, 'Excel',
      this.firstLevelColumns, this.secondLevelColumns, this.thirdLevelColumns, this.Tablenames);
  }

  // Export to pdf
  exportpdf() {
    new ExportToPDFService().exportAsPDFFile(this.originalData, 'PDF',
      this.firstLevelColumns, this.secondLevelColumns, this.thirdLevelColumns, this.Tablenames);
  }

  // Modal open
  public filterButton(format: ColumnFormatEnum, name: string) {
    if (format == 5) {
      if ($("#filterColumnNameDateHidden").val() != name) {
        $("#filterDateSearchBox").val('');
        $("#filterDateDivDrp").val('Equals');
      }
      $("#filterDateDivDrp").change(function () {
        $("#filterDateSearchBox").val('');
        if ($("#filterDateDivDrp").val() == "In range") {
          $("#filterDateRangeSearchBox").show();
        } else {
          $("#filterDateRangeSearchBox").hide();
        }
      });
      $("#filterDateResetButton").click(function () {
        $("#filterDateDiv").hide();
      });
      $("#filterDateDivHide").click(function () {
        $("#filterDateDiv").hide();
      });
      $("#filterStringDiv").hide();
      var x = $("#" + name).offset();
      $("#filterDateDiv").css({ left: x.left - 100 });
      $("#filterDateDiv").css({ top: x.top - 100 });
      $("#filterDateDiv").show();
      $("#filterColumnNameDateHidden").val(name);

    } else {
      if ($("#filterColumnNameStringHidden").val() != name) {
        $("#filterStringSearchBox").val('');
        $("#filterStringDivDrp").val('Contains');
      }
      $("#filterStringDivDrp").change(function () {
        $("#filterStringSearchBox").val('');
      });
      $("#filterStringResetButton").click(function () {
        $("#filterStringDiv").hide();
      });
      $("#filterStringDivHide").click(function () {
        $("#filterStringDiv").hide();
      });
      $("#filterDateDiv").hide();
      var x = $("#" + name).offset();
      $("#filterStringDiv").css({ left: x.left - 100 });
      $("#filterStringDiv").css({ top: x.top - 100 });
      $("#filterStringDiv").show();
      $("#filterColumnNameStringHidden").val(name);
    }

  }

  // show hide filter box
  public toggleFilter(filterName: string) {
    if (this.openFilterBlockName != null && this.openFilterBlockName == "hidden" && filterName == "hidden") {
      $("#hiddenFilter_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).removeClass("btn-primary");
      $("#hiddenFilter_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).css("color", "black");
      $("#favouriteFilterBlock_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).hide();
      $("#hiddenFilterBlock_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).hide();
      this.openFilterBlockName = "";
      return;
    } else if (this.openFilterBlockName != null && this.openFilterBlockName == "favourite" && filterName == "favourite") {
      $("#favouriteFilter_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).removeClass("btn-primary");
      $("#favouriteFilter_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).css("color", "black");
      $("#favouriteFilterBlock_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).hide();
      $("#hiddenFilterBlock_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).hide();
      this.openFilterBlockName = "";
      return;
    }
    if (filterName == 'hidden') {
      this.openFilterBlockName = "hidden";
      $("#hiddenFilter_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).addClass("btn-primary");
      $("#hiddenFilter_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).css("color", "white");
      $("#favouriteFilter_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).css("color", "black");
      $("#hiddenFilterBlock_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).show();
      $("#favouriteFilterBlock_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).hide();
      $("#favouriteFilter_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).removeClass("btn-primary");
    } else if (filterName == 'favourite') {
      this.openFilterBlockName = "favourite";
      $("#favouriteFilter_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).addClass("btn-primary");
      $("#favouriteFilter_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).css("color", "white");
      $("#hiddenFilter_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).css("color", "black");
      $("#favouriteFilterBlock_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).show();
      $("#hiddenFilterBlock_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).hide();
      $("#hiddenFilter_" + this.removeSpaceAndReplaceDash(this.gridData.PageName)).removeClass("btn-primary");
    }
  }

  removeSpaceAndReplaceDash(value) {
    if (isNotNullOrUndefined(value)) {
      const splitMode = value.split(' ');
      if (isNotNullOrUndefined(splitMode)) {
        const joinMode = splitMode.join('-');
        return joinMode;
      }
    }
    return value;
  }

  // Filter Data  // not in use
  public filterColumnData(dataType: string, columnName: string, searchString: string, searchStringLength: number, operator: string) {
    if (searchStringLength > 0) {
      if (dataType == "String") {
        if (operator == "Contains") {
          this.dataForShow = this.originalData.filter(itemContain => itemContain[columnName] != null &&
            JSON.stringify(itemContain[columnName]).toLowerCase()
              .includes(searchString.toLowerCase()));
        } else if (operator == "Not Contains") {
          this.dataForShow = this.originalData.filter(itemNotContain => itemNotContain[columnName] != null &&
            !JSON.stringify(itemNotContain[columnName]).toLowerCase()
              .includes(searchString.toLowerCase()));
        } else if (operator == "Equals") {
          this.dataForShow = this.originalData.filter(item => item[columnName] != null &&
            item[columnName].toString().toLowerCase() === searchString.toLowerCase());
        } else if (operator == "Not Equals") {
          this.dataForShow = this.originalData.filter(item => item[columnName] != null &&
            item[columnName].toString().toLowerCase() !== searchString.toLowerCase());
        } else if (operator == "Start with") {
          this.dataForShow = this.originalData.filter(itemStartwith => itemStartwith[columnName] != null &&
            itemStartwith[columnName].toString().toLowerCase()
              .startsWith(searchString.toLowerCase()));
        } else if (operator == "Ends with") {
          this.dataForShow = this.originalData.filter(itemEndwith => itemEndwith[columnName] != null &&
            itemEndwith[columnName].toString().toLowerCase()
              .endsWith(searchString.toLowerCase()));
        }
      } else if (dataType == "Date") {
        if (operator == "Greater than") {
          this.dataForShow = this.originalData.filter(item => item[columnName] != null &&
            new Date(item[columnName]) >= new Date(searchString));
        } else if (operator == "Less than") {
          this.dataForShow = this.originalData.filter(item => item[columnName] != null &&
            new Date(item[columnName]) <= new Date(searchString));
        } else if (operator == "Equals") {
          this.dataForShow = this.originalData.filter(item => item[columnName] != null &&
            moment(item[columnName]).format(new GridConfiguration().dateFormat) ==
            moment(searchString).format(new GridConfiguration().dateFormat));
        } else if (operator == "Not Equals") {
          this.dataForShow = this.originalData.filter(item => item[columnName] != null &&
            moment(item[columnName]).format(new GridConfiguration().dateFormat) !=
            moment(searchString).format(new GridConfiguration().dateFormat));
        } else if (operator == "In range") {
          let fromDate = searchString;
          let toDate = $("#filterDateRangeSearchBox").val();
          if (fromDate != null && toDate != null && fromDate != "" && toDate != "") {
            this.dataForShow = this.originalData.filter(item => item[columnName] != null &&
              new Date(item[columnName]) >= new Date(fromDate) &&
              new Date(item[columnName]) <= new Date(toDate)
            );
          }
        }
      }
    }
  }

  public SelectCheckbox(id) {
    this.selectCheckBox.emit(id);
  }

  // Event to emit data from child to parent
  public FirstLevelActionClick(action: string, rowId: number, dataRow: [], wholeRow: []) {
    this.valueToParent.emit({ id: rowId, level: 'First', action: action, data: dataRow, wholeRow: wholeRow, allPrimaryKeyValue: [rowId.toString()], currentPage: this.currentPage });
  }

  // Event to emit data from child to parent
  public SecondLevelActionClick(action: string, rowId: number, dataRow: [], wholeRow: []) {
    let firstLevelPrimaryKeyValue = wholeRow[this.firstLevelColumns[this.primaryKeyColumns[0]].Name];
    this.valueToParent.emit({ id: rowId, level: 'Second', action: action, data: dataRow, wholeRow: wholeRow, allPrimaryKeyValue: [firstLevelPrimaryKeyValue.toString(), rowId.toString()], currentPage: this.currentPage });
  }

  // Event to emit data from child to parent
  public ThirdLevelActionClick(action: string, rowId: number, dataRow: [], wholeRow: [], twoLevel) {
    let firstLevelPrimaryKeyValue = wholeRow[this.firstLevelColumns[this.primaryKeyColumns[0]].Name];
    let secondLevelPrimaryKeyValue = twoLevel[this.secondLevelColumns[this.primaryKeyColumns[1]].Name];
    this.valueToParent.emit({ id: rowId, level: 'Third', action: action, data: dataRow, wholeRow: wholeRow, allPrimaryKeyValue: [firstLevelPrimaryKeyValue.toString(), secondLevelPrimaryKeyValue.toString(), rowId.toString()], currentPage: this.currentPage });
  }

  // Add button click emmit
  addButtonClick() {
    this.addButton.emit(this.addButtonName);
  }

  removeFavouriteSearchConfirmed() {
    this.removeFavourite.emit(this.favouriteSearchId);
  }

  getColor(colorstring) {
    if (colorstring != '' && !isNullOrUndefined(colorstring)) {
      return colorstring.toString().split("~")[1];
    } else {
      return '';
    }
  }

  getSalesPerson(colorstring) {
    if (colorstring != '' && !isNullOrUndefined(colorstring)) {
      return colorstring.toString().split("~")[0];
    } else {
      return '';
    }
  }

  showDescriptionPopup(content){
    this.descriptionPopupId = (isNotNullOrUndefined(this.gridData.PageName) ? this.gridData.PageName : '') + CommonAppConstants.ShowFullinfo;
    this.descriptionContent = content;
    setTimeout(() => {
      $('#'+this.descriptionPopupId).modal('show');
    }, 0);
  }
}
