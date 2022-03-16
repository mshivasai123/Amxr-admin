import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificationsService {

  constructor(
    public http: HttpClient
  ) { }

  getCertification(): Observable<any> {
    const endPoint = `api/media-certificates`
    return this.http.get(endPoint)
  }

  
  addCertification(data: any): Observable<any> {
    console.log(data)
    let headers: HttpHeaders = new HttpHeaders()
    headers.append('Content-Type', 'multipart/form-data;');
    const endPoint = `api/media-certificates/add`
    return this.http.post(endPoint, data,{ headers: headers })
  }

  editCertification(data: any): Observable<any> {
    const endPoint = `api/media-certificates/update/${data.id}`
    const req = { mediaCertificateName : data.name, fileData: data.fileData}
    return this.http.put(endPoint, req)
  }

  deleteCertification(data: any): Observable<any> {
    const endPoint = `api/media-certificates/delete/${data.id}`
    const req = { name: data.name }
    return this.http.delete(endPoint)
  }
}
