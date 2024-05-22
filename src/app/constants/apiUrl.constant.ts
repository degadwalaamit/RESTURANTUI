
export class AppConstants {
  // public static BaseApiUrl = 'https://localhost:44331/api/';
  public static BaseApiUrl = 'https://bandhanappapi.azurewebsites.net/api/';

  public static CookieStorageDay = 1; // ex. 1 day
  public static DefaultCountry = 'EN';
  public static LocalStorageKey = 'AMT_';
  public static MinYear = 1900;
  // public static BaseAddressUrl = 'https://api.getAddress.io/find/';
  // public static AddressApiKey = 'JgCDd7bnO0SYp1Br_4C2tw28653';
  public static BaseAddressUrl = 'https://api.ideal-postcodes.co.uk/v1/postcodes/';
  // public static AddressApiKey = 'ak_kgata418gW3areYBTMYgQKliy3xzM';
  public static AddressApiKey = 'ak_k2bqe7y2NCcuWZaYHM9VSeDP7yHoV';
}

export class AuthConfig {
  public static ACCESS_TOKEN_KEY_STORAGE = 'AccessToken';
  public static TENANT_ID = 'TenantId';
}


export class ListContants {
  public static DefaultCurrentPage = 1;
  public static DefaultPageSize = 20;
  public static DefaultPageSize1000 = 1000;
  public static DefaultAcquisitionPageSize = 10;
  public static SignableUserLimit = 50;
  public static DefaultRowModelType = 'infinite';
}
export class DropdownConstants {
  public static DefaultPageSize = 1000;
}

export class LoginConstants extends AppConstants {
  public static Authorize = AppConstants.BaseApiUrl + 'login/UserLogin';
  // public static ForgotPassword = AppConstants.BaseApiUrl + 'login/forgotPassword';
  public static ForgotPassword = AppConstants.BaseApiUrl + 'user/ForgotPassword';
  public static LogoutHistory = AppConstants.BaseApiUrl + 'user/LogOut';
}

export class CommonConstants extends AppConstants {
  public static CheckStatusAndvalidity = AppConstants.BaseApiUrl + 'person/CheckStatusAndValidity';
}

export class UserConstant extends AppConstants {
  public static LoginUser = AppConstants.BaseApiUrl + 'User/LoginUser';
  public static GetUserList = AppConstants.BaseApiUrl + 'User/GetUserList';
}

export class ResturantConstant extends AppConstants {
  public static GetResturant = AppConstants.BaseApiUrl + 'Resturant/GetResturant';
  public static AddResturant = AppConstants.BaseApiUrl + 'Resturant/AddResturant';
}

export class GridConstant extends AppConstants {
  public static GetGridFavoriteSearches = AppConstants.BaseApiUrl + 'GridFavouriteSearch/GetFavoriteSearch';
  public static AddGridFavoriteSearch = AppConstants.BaseApiUrl + 'GridFavouriteSearch/AddGridFavoriteSearch';
  public static UpdateGridFavoriteSearch = AppConstants.BaseApiUrl + 'GridFavouriteSearch/UpdateGridFavoriteSearch';
  public static DeleteGridFavoriteSearchById = AppConstants.BaseApiUrl + 'GridFavouriteSearch/DeleteGridFavoriteSearchById';
}

export class TableConstant extends AppConstants {
  public static GetTableMasterList = AppConstants.BaseApiUrl + 'TableMaster/GetTableMasterList';
}