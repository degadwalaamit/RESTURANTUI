import { Injectable, PLATFORM_ID, Inject } from "@angular/core";
import { EncryptDecryptService } from './password-encryption.service';
import { isPlatformBrowser } from "@angular/common";
import { AppConstants } from 'src/app/constants/apiUrl.constant';

@Injectable(
    {
        providedIn: 'root'
    }
)

export class LocalStorageService {
    constructor(@Inject(PLATFORM_ID) private platformId: Object,
                private encryptDecryptService: EncryptDecryptService) {
    }

    setItem(key: string, value) {
        key = AppConstants.LocalStorageKey + key;
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(key, this.encryptDecryptService.encrypt(value));
        }
    }

    getItem(key: string) {
        key = AppConstants.LocalStorageKey + key;
        if (isPlatformBrowser(this.platformId)) {
            return this.encryptDecryptService.decrypt(localStorage.getItem(key));
        }
        return '';
    }

    removeItem(key: string) {
        key = AppConstants.LocalStorageKey + key;
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.removeItem(key);
        }
    }

    /**
     * Clears stores
     */
    clear: () => boolean | Promise<boolean>;

    clearAll() {
        localStorage.clear();
    }
}