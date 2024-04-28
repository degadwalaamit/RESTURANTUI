import { Injectable } from "@angular/core";
import { FavouriteSearch } from "../models/favourite-search.model";
import { GridFavouriteSearch } from "../models/grid-favourite-search.model";

@Injectable({
  providedIn: 'root'
})
export class AMTGridCommonService {
  public getFavouriteSearch(source:any[],destination:any[]){
    let data: GridFavouriteSearch[] = source;
    data.forEach(element => {
      let favouriteSearch = new FavouriteSearch();
      favouriteSearch.GridFavouriteId = element["gridFavouriteId"];
      favouriteSearch.UserId = element["creationUser"];
      favouriteSearch.SearchName = element["gridFavouriteLabel"];
      favouriteSearch.ViewName = element["gridFavouriteArea"];
      favouriteSearch.CreatedDate = element["creationDate"];
      favouriteSearch.isFavouriteViewSelected = element["isSelected"];
      favouriteSearch.Filter = JSON.parse(element.gridFavouriteFilterContent);
      favouriteSearch.Sort = JSON.parse(element.gridFavouriteSortContent)
      destination.push(favouriteSearch);
    });
  }
  public saveFavouriteSearch(source:FavouriteSearch,loggedInUserDetails,viewName):GridFavouriteSearch{
    let favouriteSearch = new GridFavouriteSearch();
    favouriteSearch.gridFavouriteArea = viewName;
    favouriteSearch.creationDate = source.CreatedDate;
    favouriteSearch.gridFavouriteId = source.GridFavouriteId;
    favouriteSearch.isSelected = source.isFavouriteViewSelected;
    favouriteSearch.tenantId = loggedInUserDetails.tenantId;
    favouriteSearch.creationUser = loggedInUserDetails.userId;
    favouriteSearch.gridFavouriteSortContent = JSON.stringify(source.Sort);
    favouriteSearch.gridFavouriteFilterContent = JSON.stringify(source.Filter);
    favouriteSearch.gridFavouriteLabel = source.SearchName;
    return favouriteSearch;
  }
}
