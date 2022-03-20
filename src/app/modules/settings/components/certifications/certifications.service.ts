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
    const fData : FormData = new FormData
    fData.append("mediaCertificateName", data.mediaCertificateName);
    fData.append("fileData", data.fileData);
    const endPoint = `api/media-certificates/add`
    return this.http.post(endPoint, fData)
  }

  editCertification(data: any,key?:string): Observable<any> {
    const endPoint = `api/media-certificates/update/${data.id}`
    const fData : FormData = new FormData
    fData.append("mediaCertificateName", data.mediaCertificateName);
    if(key == 'status') {
      fData.append("status", data.status);
    } else {
      if(data.fileData){
      fData.append("fileData", data.fileData);
      }
    }
    return this.http.put(endPoint, fData)
  }

  deleteCertification(data: any): Observable<any> {
    const endPoint = `api/media-certificates/delete/${data.id}`
    const req = { name: data.name }
    return this.http.delete(endPoint)
  }
}
