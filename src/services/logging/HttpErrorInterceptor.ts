import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MyMonitoringService } from './logging.service';
import { Injectable } from '@angular/core';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private loggingService :MyMonitoringService) {
    }

    handleError(error: any) {
            console.error(error);
            return throwError(error);
      }
      intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(
            catchError((error: any ) => {
              if (error instanceof HttpErrorResponse) {

                return this.handleError(error);              }
            })
        );
      }

}
