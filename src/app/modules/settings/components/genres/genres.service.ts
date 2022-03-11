
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  baseUrl = environment.basicUrl;

  constructor(
    private http : HttpClient
  ) { }

  getGener() : Observable<any> {
     const endPoint = this.baseUrl + `genres` 
     return this.http.get(endPoint)
  }
}
