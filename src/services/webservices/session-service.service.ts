import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  public addSessionObject(key: string, obj: any) {
    sessionStorage.setItem(key, JSON.stringify(obj));
  }

  getSessionObject(key: string): any {
    const sessionObj = sessionStorage.getItem(key);
    return JSON.parse(sessionObj);
  }

  removeSessionObject(key: string) {
    sessionStorage.removeItem(key);
  }

  clearSession() {
    sessionStorage.clear();
  }
}
