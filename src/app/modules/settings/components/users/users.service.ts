import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getUser(): Observable<any> {
    const endPoint = `api/users`
    return this.http.get(endPoint)
  }

  getRole(): Observable<any> {
    const endPoint = `api/roles`
    return this.http.get(endPoint)
  }

  addUser(data: any): Observable<any> {
    const endPoint = `api/users/add`
    return this.http.post(endPoint, data)
  }

  editUser(data: any,key?:string): Observable<any> {
    const endPoint = `api/users/update/${data.id}`
    let req = data;
    if(key == 'status') {
      req = { status : data.status }
    } 
    return this.http.put(endPoint, req)
  }

  deleteUser(data: any): Observable<any> {
    const endPoint = `api/users/delete/${data.id}`
    return this.http.delete(endPoint)
  }
}
