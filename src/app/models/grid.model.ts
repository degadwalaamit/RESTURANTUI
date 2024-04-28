export class GridModule {
    CurrentPage: number;
    PageSize: number;
    TenantId: string;
    IsHidden = false;
    searchText = '*';
    startDate = null;
    endDate = null;
    ColumnFilter = [];
    SortFilter = [];  
    IsFromSales = false;
    RoleId = null;
    IsSharedByMe = false;
    IsSharedWithMe = false;
    IsShowAllQuotes = false;
    IsShowExpiredQuote = false;
}

export class ColumnFilter {
    ColumnName = '';
    ColumnValue = '';
    ColumnType = 0;
    Operator = 0;
    OffSet= 0;
}

export class SortFilter {
    ColumnName = '';
    SortingOrder = 0;
    Priority = 0;
}

export class AuditDetail{
    entity = '';
    entityRefId = '';
    creationDate: Date = null;
}
