import { AppCommonModule } from './modules/common/app-common/app-common.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ExternalSharedModule } from './external-shared.module';
import { NgBroadcasterModule } from 'ngx-broadcaster';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { EncryptDecryptService } from './../services/webservices/password-encryption.service';
import { AppConstants } from './constants/apiUrl.constant';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BnNgIdleService } from 'bn-ng-idle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlModule } from 'ngx-owl-carousel';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ErrorHandlerService } from 'src/services/logging/ExceptionHandler';
import { MyMonitoringService } from 'src/services/logging/logging.service';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FilterPipe } from './pipe/filter.pipe';
import { HandleDateTimePicker } from './directives/handleDateTimePicker.directive';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    HandleDateTimePicker
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppCommonModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    PerfectScrollbarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en',
      useDefaultLang: true
    }),
    ExternalSharedModule,
    NgBroadcasterModule,
    NgxMaterialTimepickerModule,
    OwlModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    BackButtonDisableModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js',{enabled: environment.production})
  ],
  exports: [
    FilterPipe,
    HandleDateTimePicker
  ],
  providers: [BnNgIdleService, CookieService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },

    DatePipe,
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    MyMonitoringService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
