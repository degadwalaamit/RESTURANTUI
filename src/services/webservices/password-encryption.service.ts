import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class EncryptDecryptService {
    // Encrypt the Passwort with Base64
    key = crypto.enc.Utf8.parse('8080808080808080');
    iv = crypto.enc.Utf8.parse('8080808080808080');
    

    encrypt(content: string) {
        if (content && content !== '') {
            return crypto.AES.encrypt(crypto.enc.Utf8.parse(content), this.key, {
                keySize: 128 / 8,
                iv: this.iv,
                mode: crypto.mode.CBC,
                padding: crypto.pad.Pkcs7
            });
        }
        return content;
    }

    decrypt(content: string) {
        if (content && content !== '') {
            const decrypted = crypto.AES.decrypt(content, this.key, {
                keySize: 128 / 8,
                iv: this.iv,
                mode: crypto.mode.CBC,
                padding: crypto.pad.Pkcs7
            });
            return decrypted.toString(crypto.enc.Utf8);
        }
        return content;
    }
}
