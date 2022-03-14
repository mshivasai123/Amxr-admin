import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken(): any {
    const token = localStorage.getItem("token");
    if (token !== null || token !== '') {
      return token;
    } else {
      localStorage.removeItem("token");
    }
  }
}
