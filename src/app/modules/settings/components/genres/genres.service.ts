
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
    private http: HttpClient
  ) { }

  getGener(): Observable<any> {
    const endPoint = this.baseUrl + `genres`
    return this.http.get(endPoint)
  }

  addMultyGener(data: any): Observable<any> {
    const endPoint = this.baseUrl + `genres/multi-add`
    return this.http.post(endPoint, data)
  }

  editGener(data: any): Observable<any> {
    const endPoint = this.baseUrl + `genres/update/${data.id}`
    const req = { name: data.name, showInApp: data.showInApp }
    return this.http.post(endPoint, req)
  }

  deleteGener(data: any): Observable<any> {
    const endPoint = this.baseUrl + `genres/delete/${data.id}`
    const req = { name: data.name }
    return this.http.post(endPoint, req)
  }
}