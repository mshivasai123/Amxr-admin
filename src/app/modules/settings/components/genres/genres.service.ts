
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
    const endPoint = `api/genres`
    return this.http.get(endPoint)
  }

  addMultyGener(data: any): Observable<any> {
    const endPoint = `api/genres/multi-add`
    return this.http.post(endPoint, data)
  }

  editGener(data: any,key?: string): Observable<any> {
    const endPoint = `api/genres/update/${data.id}`
    let req;
    if(key == 'status') {
      req = { status : data.status }
    } else {
      req = { name: data.name, showInApp: data.showInApp }
    }
    return this.http.put(endPoint, req)
  }

  deleteGener(data: any): Observable<any> {
    const endPoint = `api/genres/delete/${data.id}`
    const req = { name: data.name }
    return this.http.delete(endPoint)
  }
}
