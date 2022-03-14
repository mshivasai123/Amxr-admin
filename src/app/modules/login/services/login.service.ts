import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.basicUrl

  constructor(
    public http : HttpClient
  ) { }

  loginUser(data: {email : string ,password : string}) : Observable<any> {
    const endpoint =  `api/users/login`//'http://localhost:4200/api/' +
    return this.http.post(endpoint , data)
  }
}
