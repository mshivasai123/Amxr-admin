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
    const fData : FormData = new FormData
    fData.append("mediaProviderName", data.mediaProviderName);
    fData.append("fileData", data.fileData);
    fData.append("email", data.email);
    fData.append("contact", data.contact);
    fData.append("contentValidityStartDate", data.contentValidityStartDate);
    fData.append("contentValidityEndDate", data.contentValidityEndDate);
    fData.append("exclusivePercentage", data.exclusivePercentage);
    fData.append("nonExclusivePercentage", data.nonExclusivePercentage);
    const endPoint = `api/media-providers/add`
    return this.http.post(endPoint, fData)
  }

  editProvider(data: any,key?:string): Observable<any> {
    const endPoint = `api/media-providers/update/${data.id}`
    console.log(data)
    
    const fData : FormData = new FormData
    if(key == 'status') {
      fData.append("status", data.status);
    } else {
      fData.append("mediaProviderName", data.mediaProviderName);
      fData.append("fileData", data.fileData);
      fData.append("email", data.email);
      fData.append("contact", data.contact);
      fData.append("contentValidityStartDate", data.contentValidityStartDate);
      fData.append("contentValidityEndDate", data.contentValidityEndDate);
      fData.append("exclusivePercentage", data.exclusivePercentage);
      fData.append("nonExclusivePercentage", data.nonExclusivePercentage);
    }
    return this.http.put(endPoint, fData)
  }

  deleteProvider(data: any): Observable<any> {
    const endPoint = `api/media-providers/delete/${data.id}`
    const req = { name: data.name }
    return this.http.delete(endPoint)
  }
}
