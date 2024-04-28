
export class ColumnModel {
  Name: string;
  Format: ColumnFormatEnum;
  DisplayName: string;
  ColumnClass?: string = '';
  ShowColumn?: boolean = true;
  IsFilterable?: boolean = true;
  IsPrimaryKey?: boolean = false;
  isNestedColumn?: boolean = false;
  NestedColumns?: NestedColumn[] = null;
  CssRule?: CssRuleModel[] = null;
  isSortable?: boolean = true;
  isHeaderChecked?: boolean = false;
  calculateVatFromField?: string = '';  // if user has selected column format as CurrencyWithVat
  replacableContent?:ContentReplace[] = null
}
export class NestedColumn {
  ColumnName: string;
  ShowColumnsName: boolean;
  DisplayName: string;
  Format: ColumnFormatEnum;
  ColumnClass?: string = '';
}


export enum ColumnFormatEnum {
  RegistrationNumber = 1,
  Id,
  Number,
  Currency,
  Date,
  String,
  Phone,
  Mobile,
  Email,
  User,
  Month,
  Initial,
  UserWithAvatar,
  Status,
  ValueMiles,
  TrimText,
  Checkbox,
  CurrencyWithCheckbox,
  StringWithDash,
  NullString,
  CurrencyWithVat,
  Term,
  Mileage,
  DateWithoutTime,
  LicenceNumberMasking,
  ColorMasking,
  DateWithoutTimeUTC,
  ValueNumberFormatMasking,
  DateWithTime,
  ImageData,
  CommaNumber,
  LicenceNumber,
  StringWith15Chars=34,
  ReplacableContent = 33
}
export class CssRuleModel {
  html;
  condition;
  isRecursive?: boolean = false;
  cssListClassName?: string = '';
}

export class AdvanceSearch {
  columnName: string;
  operator: string;
  searchString: string;
}

export class StatusToSearch {
  columnName: string;
  searchString: string;
  pageName?: string = '';
}

export class ContentReplace{
  replaceWithStart:string;
  replaceWithEnd:string;
  customClass:string;
  contentToReplace:string;
}
