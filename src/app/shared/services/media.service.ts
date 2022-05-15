import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor( public http: HttpClient) { }

  addMediaInformation(data: any): Observable<any> {
    console.log(data)
    const fData : FormData = new FormData
    for(let val in data){
      fData.append(val, data[val]);
    }
    // fData.append("mediaCertificateName", data.mediaCertificateName);
    // fData.append("fileData", data.fileData);
    const endPoint = `api/media-informations/add`
    return this.http.post(endPoint, fData)
  }
  editMediaInformation(data: any,id:any){
    console.log(data)
    const fData : FormData = new FormData
    for(let val in data){
      fData.append(val, data[val]);
    }
    // fData.append("mediaCertificateName", data.mediaCertificateName);
    // fData.append("fileData", data.fileData);
    const endPoint = `api/media-informations/update/${id}`
    return this.http.put(endPoint, fData)
  }
}
