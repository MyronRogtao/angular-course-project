import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreageService {

  constructor() { }

  setAuthToken(token: string) {
    sessionStorage.setItem('firebase-auth', token);
  }

  getAuthToken() {
    return sessionStorage.getItem('firebase-auth');
  }

  removeAuthToken() {
    return sessionStorage.removeItem('firebase-auth');
  }
}
