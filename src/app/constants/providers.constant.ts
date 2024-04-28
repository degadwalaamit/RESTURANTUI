import { SharedService } from "../../services/webservices/shared.service";
import { LoginService } from "../../services/webservices/login.service";
import { ApiService } from "../../services/webservices/api.service";
import { LocalStorageService } from "../../services/webservices/local-storage.service";
import { EncryptDecryptService } from "../../services/webservices/password-encryption.service";
import { ThemeProvider, themeProviderFactory } from "../select-theme";
import { APP_INITIALIZER } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';

export const Providers = [
    SharedService,
    LoginService,
    ApiService,
    LocalStorageService,
    EncryptDecryptService,
    CookieService,
    ThemeProvider,
    { provide: APP_INITIALIZER, useFactory: themeProviderFactory, deps: [ThemeProvider], multi: true }
];