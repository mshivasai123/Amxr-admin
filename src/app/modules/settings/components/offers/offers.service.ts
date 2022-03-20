import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  constructor(
    private http: HttpClient
  ) { }

  getOffer(): Observable<any> {
    const endPoint = `api/offers`
    return this.http.get(endPoint)
  }

  addOffer(data: any): Observable<any> {
    const endPoint = `api/offers/add`
    return this.http.post(endPoint, data)
  }

  editOffer(data: any,key?:string): Observable<any> {
    const endPoint = `api/offers/update/${data.id}`
    let req;
    if(key == 'status') {
      req = { status : data.status }
    } else {
      req = { name: data.name, discountCode: data.discountCode ,discountInPercentage: data.discountInPercentage,validityEndDateTime:data.validityEndDateTime,validityStartDateTime: data.validityStartDateTime}
    }
    return this.http.put(endPoint, req)
  }

  deleteOffer(data: any): Observable<any> {
    const endPoint = `api/offers/delete/${data.id}`
    const req = { name: data.name }
    return this.http.delete(endPoint)
  }
}
