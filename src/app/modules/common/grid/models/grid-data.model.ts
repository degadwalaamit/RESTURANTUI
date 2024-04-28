import { FavouriteSearch } from "src/app/modules/common/grid/models/favourite-search.model";
import { ColumnModel } from "./grid-column.model";

export class GridData {
  Data: any;
  FirstLevelColumnNames: ColumnModel[];
  SecondLevelColumnNames: ColumnModel[];
  ThirdLevelColumnNames: ColumnModel[];
  favouriteSearchViews: FavouriteSearch[];
  Tablenames: string[];
  TableCssClass: string;
  customHeader: string;
  IsSearchVisible: boolean = true;
  IsFutureDateFilter: boolean = false;
  IsPaginationVisible: boolean = true;
  IsColumnFilterVisible: boolean = false;
  isCustomDateFilterVisible: boolean = true; // to hide seperate custom date filter
  IsExportOptionVisible: ExportTo = { Excel: false, PDF: false };
  addButtonName: string;
  defaultRowCount: number;
  IsDataAgeingFilterVisible: boolean = false;
  fromCustomDateCalenderConfig: any; // define custom date from calender configuration
  endCustomDateCalenderConfig: any; // define custom date end calender configuration
  dataFilterOptionsConfiguration = new Array<FilterOptionsConfiguration>(); // configuring filters from parent component
  showPending: PendingData;
  DataAgeingFilterColumn: string = null;
  dataAgeingFilterLabelName: string = "Select duration";
  ChangeDefaultFilterOption: number = 1;
  FromEndCustomDate: CustomDate = null;
  FirstLevelActions: Action;
  SecondLevelActions: Action;
  ThirdLevelActions: Action;
  PageName: string;
  TrimTextSize: number = 25;
  showCheckBox: boolean = false;
  showHeaderCheckBox: boolean = false;
  StaticImagePath: string;
  goToPage?: number;
  pageSizeOptions: number[];
  useStatusCountService: boolean = false;
  useHoveringRow = new HoverRow();
  enableRowDoubleClick = false;
}
export class CustomDate {
  FromDate: Date;
  EndDate: Date;
}
export class Action {
  ActionClass: string;
  AttachedColumnName?: string;
  enableConditionColumnName?: string;
  ActionIcons: ActionIcon[];
}
export class ActionIcon{
  Name:string;
  EnableConditions?:any[];
  IconImage?:string;
  IconClass?:string;
  EnableClickConditions?:any[];
  showConditions?: any[];
  ExactVisibleCondition?:{
    Conditions?:any[],
    ColumnName?:any
  }
}
export class ExportTo {
  Excel: boolean = false;
  PDF: boolean = false;
}

export class FilterOptionsConfiguration {
  filterByDataField: string; // data column field from which data would be filter
  alternateDataField?: string = ""; // filter data by alternate column if filterByDataField column is not present in data
  label: string; // label for display
  isDefault?: boolean = false; // selected by default
  months?: number; // months to filter
  isForwardMonth?: boolean = false; // Wheather want to filter upcoming months or previous months
  calenderDate?: boolean = false;
  showAllFeature?: boolean = true;
}
export class PendingData {
  excludeFieldName: string;
  includeFieldName: string;
  label: string;
  isAscOrder: boolean = true;
}

export class HoverRow {
  enable: boolean = false;
  cssClassName?: string = "AMTGridHoveringClass";
}
