import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediatypeService {

  constructor(
    public http: HttpClient
  ) { }

  getType(): Observable<any> {
    const endPoint = `api/media-types`
    return this.http.get(endPoint)
  }

  addMultyType(data: any): Observable<any> {
    const endPoint = `api/media-types/multi-add`
    return this.http.post(endPoint, data)
  }

  editType(data: any,key?: string): Observable<any> {
    const endPoint = `api/media-types/update/${data.id}`
    let req;
    if(key == 'status') {
      req = { status : data.status }
    } else {
      req = { name: data.name, showInApp: data.showInApp }
    }
    return this.http.put(endPoint, req)
  }

  deleteType(data: any): Observable<any> {
    const endPoint = `api/media-types/delete/${data.id}`
    const req = { name: data.name }
    return this.http.delete(endPoint)
  }

  reOrder(data: any): Observable<any> {
    const endPoint = `api/media-types/reorder`
    return this.http.put(endPoint, data)
  }
}
