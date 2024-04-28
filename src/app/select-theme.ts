import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ThemeProvider {
    private openToken: string = null;

    constructor(private http: HttpClient) {
    }

    public getOpenToken(): string {
        return this.openToken;
    }
}

export function themeProviderFactory(provider: ThemeProvider) {
}
