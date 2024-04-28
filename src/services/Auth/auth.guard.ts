import { Injectable } from '@angular/core';
import {
  CanActivate, CanActivateChild,
  CanLoad, Route, UrlSegment,
  ActivatedRouteSnapshot, RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../webservices/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  private readonly loadRights = new Subject<any>();
  public onCanLoad = this.loadRights.asObservable();

  constructor(private authService: AuthService,
    private routes: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let type = next.data['type'];
    let module = next.data['module'];
    let path: any = next.url;
    if (module == null || module == undefined) {
      if (type != undefined) {
        path = next.parent.url[0].path;
      }
    } else {
      path = module;
    }
    let returnValue = this.authService.validateAccessRights(path, type);
    if (!returnValue) {
      return this.routes.navigate(['/unauthorized']);
    }
    return returnValue;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.validateAccessRights(next.url, undefined);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    let returnValue = this.authService.validateAccessRights(route.path, undefined);
    if (!returnValue) {
      return this.routes.navigate(['/unauthorized']);
    }
    return returnValue;
  }
}
