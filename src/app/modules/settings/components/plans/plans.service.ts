import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  constructor(
    private http: HttpClient
  ) { }

  getPlan(): Observable<any> {
    const endPoint = `api/subscription-plans`
    return this.http.get(endPoint)
  }

  addPlan(data: any): Observable<any> {
    const endPoint = `api/subscription-plans/add`
    return this.http.post(endPoint, data)
  }

  editPlan(data: any,key?:string): Observable<any> {
    const endPoint = `api/subscription-plans/update/${data.id}`
    let req;
    if(key == 'status') {
      req = { status : data.status }
    } else {
      req = { name: data.name, days: data.days,currencyType : data.currencyType,actualCost : data.actualCost,discountInPercentage:data.discountInPercentage }
    }
    return this.http.put(endPoint, req)
  }

  deletePlan(data: any): Observable<any> {
    const endPoint = `api/subscription-plans/delete/${data.id}`
    const req = { name: data.name }
    return this.http.delete(endPoint)
  }
}
