import { Injectable } from '@angular/core';
import { TableConstant } from '../../app/constants/apiUrl.constant';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  public userRetainSubject = new BehaviorSubject(null);
  constructor(private apiService: ApiService) { }

  getTableMasterList(resturantId: any): Observable<any> {
    return this.apiService.get(TableConstant.GetTableMasterList + '/' + resturantId, null);
  }
}
