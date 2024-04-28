import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AMTGridDataService {
  // this subject is used for passing status count to parent component
  public statusCountSub = new Subject<any>();
  public statusCountObs = this.statusCountSub.asObservable();
  // this subject is used to pass status filter to grid component
  public passSearchCriteriaSub = new Subject<any>();
  public passSearchCriteriObs = this.passSearchCriteriaSub.asObservable();
  // this subject is used for indication to remove all checkbox from parent component status's dropdown
  public removeAllStatusCheckbox = new Subject<any>();
  public removeAllStatusCheckboxObs = this.removeAllStatusCheckbox.asObservable();
  // this subject is used for making status checkbox as checked when you apply saved status
  public addStatusCheckbox = new Subject<any>();
  public addStatusCheckboxObs = this.addStatusCheckbox.asObservable();
  // this subject is used fotching double click event of table row
  public firstLevelRowClickSub = new Subject<any>();
  public firstLevelRowClickObs = this.firstLevelRowClickSub.asObservable();
}