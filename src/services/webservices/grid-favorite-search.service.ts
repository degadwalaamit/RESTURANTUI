import { Injectable } from '@angular/core';
import { GridConstant } from 'src/app/constants/apiUrl.constant';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class GridFavoriteSearchService {

    constructor(private apiService: ApiService) { }

    public getGridFavoriteSearchs(searchArea, tenantId) {
        return this.apiService.post(GridConstant.GetGridFavoriteSearches, { searchArea: searchArea, tenantId: tenantId });
      }
      public DeleteGridFavoriteSearchById(favouriteSearchId, tenantId) {
        return this.apiService.post(GridConstant.DeleteGridFavoriteSearchById, { AccessoryTypeId: favouriteSearchId, tenantId: tenantId });
      }
      public AddGridFavoriteSearch(postObj:any) {
        return this.apiService.post(GridConstant.AddGridFavoriteSearch, postObj);
      }
      public updateGridFavoriteSearch(postObj:any) {
        return this.apiService.post(GridConstant.UpdateGridFavoriteSearch, postObj);
      }
  }
