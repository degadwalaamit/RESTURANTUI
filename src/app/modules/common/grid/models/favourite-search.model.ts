import { Guid } from "guid-typescript";
import { AdvanceSearch, StatusToSearch } from "./grid-column.model";

export class FavouriteSearch{
    GridFavouriteId:Guid;
    UserId:Guid;
    SearchName:string;
    ViewName:string;
    CreatedDate:string;
    isFavouriteViewSelected:boolean=false;
    Filter:FavouriteFilter;
    Sort:FavouriteSort[];
}
export class FavouriteFilter{
    SearchText:string[];
    Duration:FavouriteDuration;
    advanceFilters: AdvanceSearch[];
    statusSearch:StatusToSearch[];
}
export class FavouriteSort{
    Column:string;
    Direction:string;
}
export class FavouriteDuration{
    FilterOption:number;
    FilterDate:FilterDate;
}
export class FilterDate{
    StartDate:string;
    EndDate:string;
}
