import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthConfig } from '../../app/constants/apiUrl.constant';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RequestParameter } from '../../app/models/requestParameter.model';
import { LocalStorageService } from './local-storage.service';
import { NgBroadcasterService } from 'ngx-broadcaster';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class ApiService {
    lang: string = this.cookie.get('selectedLanguage');
    public contentType = 'application/json';
    public formData = false;

    constructor(
        private http: HttpClient,
        private router: Router,
        private broadcaster: NgBroadcasterService,
        private storage: LocalStorageService,
        private cookie: CookieService) {
    }

    /**
     * Set accessToken
     */
    set accessToken(accessToken) {
        // some time it does not deletes, hence resetting with empty and 0 day validity
        this.storage.setItem(AuthConfig.ACCESS_TOKEN_KEY_STORAGE, '');
        this.storage.removeItem(AuthConfig.ACCESS_TOKEN_KEY_STORAGE);
        this.storage.setItem(AuthConfig.ACCESS_TOKEN_KEY_STORAGE, accessToken);
    }

    /**
     * Gets accessToken
     */
    get accessToken(): string {
        return this.storage.getItem(AuthConfig.ACCESS_TOKEN_KEY_STORAGE);
    }

    /**
     * Gets accessToken
     */
    get tenantId(): string {
        return this.storage.getItem(AuthConfig.TENANT_ID);
    }

    // Json Headers
    getJsonHeaders(): HttpHeaders {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        return headers;
    }

    // Authentication with Json Headers
    getJsonHeadersWithBasicAuthentication(): HttpHeaders {
       return new HttpHeaders({
            Authorization: 'Bearer ' + this.accessToken,
            'Content-Type': 'application/json'
        });
    }

    getAuthHeader() {
        return new HttpHeaders({
            Authorization: 'Bearer ' + this.accessToken
        });
    }

    getBlobAuthHeader(contentType: string) {
        return new HttpHeaders({
            Authorization: 'Bearer ' + this.accessToken,
            'Content-Type': contentType
        });
    }

    // Simple plain text header...
    getTextHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'text/plain'
        });
    }

    public authPostData(url: string, params: any): Observable<any> {
        return this.http
            .post(url, params, { headers: this.getJsonHeaders() }).pipe(
                map(res => res),
                catchError((error: Response) => observableThrowError(this.errorHandler(error))));
    }

    public request(method: string, url: string, params: RequestParameter[] = []): Observable<any> {
        const httpParams = new HttpParams();
        params.forEach(param => {
            httpParams.append(param.name, param.value.toString());
        });

        return this.http
            .request(method, url, {
                headers: this.getJsonHeadersWithBasicAuthentication(), params: httpParams
            }).pipe(
                map(res => res),
                catchError((error: Response) => observableThrowError(this.errorHandler(error))));
    }

    public get(url: string, params: RequestParameter[] = []): Observable<any> {
        return this.http
            .get(url, { headers: this.getJsonHeadersWithBasicAuthentication() }).pipe(
                map(res => res),
                catchError((error: Response) => observableThrowError(this.errorHandler(error))));
    }

    public delete(url: string, params: RequestParameter): Observable<any> {
        return this.http
            .delete(url, { headers: this.getJsonHeadersWithBasicAuthentication() }).pipe(
                map(res => res),
                catchError((error: Response) => observableThrowError(this.errorHandler(error))));
    }

    public getBlob(url: string, params: RequestParameter[] = []): Observable<Blob> {
        return this.http.get(url, { headers: this.getBlobAuthHeader('application/vnd.ms-excel'), responseType: 'blob' }).pipe(
            map(
                (res) => {
                    return new Blob([res], { type: 'application/vnd.ms-excel' });
                }));
    }

    public postfile(url: string, params: any): Observable<any> {
        return this.http
            .post(url, params, { headers: this.getAuthHeader() }).pipe(
                map(res => res),
                catchError((error: Response) => observableThrowError(this.errorHandler(error))));
    }

    public putfile(url: string, params: any): Observable<any> {
        return this.http
            .put(url, params, { headers: this.getAuthHeader() }).pipe(
                map(res => res),
                catchError((error: Response) => observableThrowError(this.errorHandler(error))));
    }
    public post(url: string, params: any): Observable<any> {
        const requestParameters = JSON.stringify(params);
        return this.http
            .post(url, requestParameters, { headers: this.getJsonHeadersWithBasicAuthentication() }).pipe(
                map(res => res),
                catchError((error: Response) => observableThrowError(this.errorHandler(error))));
    }

    public put(url: string, params: any): Observable<any> {
        const requestParameters = JSON.stringify(params);
        return this.http
            .put(url, requestParameters, { headers: this.getJsonHeadersWithBasicAuthentication() }).pipe(
                map(res => res),
                catchError((error: Response) => observableThrowError(this.errorHandler(error))));

    }

    errorHandler(error: any): void {
      if (error.status === 403) {
          this.router.navigate(['/unauthorized']);
      }
      if (error.status === 401) {
          console.log('sesion executed errorlog');
          this.broadcaster.emitEvent('sessionexpire', '');
          this.router.navigate(['/login']);
      }
    }
}
