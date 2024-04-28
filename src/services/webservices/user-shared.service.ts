import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSharedService {
loadingSub : Subject <boolean>;
loadingObs : Observable<boolean>;
  constructor() {
    this.loadingSub = new Subject<boolean>();
    this.loadingObs = this.loadingSub.asObservable();
   }

}
