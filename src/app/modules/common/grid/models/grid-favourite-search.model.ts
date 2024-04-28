import { Guid } from "guid-typescript";

export class GridFavouriteSearch {
        gridFavouriteId :Guid=null;
        gridFavouriteLabel:string='';
        gridFavouriteArea:string='';
        gridFavouriteFilterContent:any;
        gridFavouriteSortContent:any;
        isDeleted:boolean=false;
        isSelected:boolean=false;
        tenantId :Guid=null;
        creationDate:any=null
        creationUser:Guid=null;
        modificationDate:any=null;
        modificationUser:Guid=null;
}
