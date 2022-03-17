import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(
    public http: HttpClient
  ) { }

  getProvider(): Observable<any> {
    const endPoint = `api/media-providers`
    return this.http.get(endPoint)
  }

  
  addProvider(data: any): Observable<any> {
    console.log(data)
    const fData : FormData = new FormData
    fData.append("mediaCertificateName", data.name);
    fData.append("fileData", data.fileData);
    const endPoint = `api/media-providers/add`
    return this.http.post(endPoint, fData)
  }

  editProvider(data: any): Observable<any> {
    const endPoint = `api/media-providers/update/${data.id}`
    const req = { mediaCertificateName : data.name, fileData: data.fileData}
    return this.http.put(endPoint, req)
  }

  deleteProvider(data: any): Observable<any> {
    const endPoint = `api/media-providers/delete/${data.id}`
    const req = { name: data.name }
    return this.http.delete(endPoint)
  }
}
