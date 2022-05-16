import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageMediaService {

  constructor(
    public http: HttpClient
  ) { }

  mediaType = new BehaviorSubject('');

  getMedia(): Observable<any> {
    const endPoint = `api/media-modules`
    return this.http.get(endPoint)
  }

  getMediaInfo(id:any): Observable<any>{
    const endPoint = `api/media-informations/` + id
    return this.http.get(endPoint)
  }

  addMedia(data: any): Observable<any> {
    const fData : FormData = new FormData
    fData.append("mediaModuleName", data.mediaModuleName);
    fData.append("fileData", data.fileData);
    fData.append("mediaModuleType", data.mediaModuleType);
    const endPoint = `api/media-modules/add`
    return this.http.post(endPoint, fData)
  }

  editMedia(data: any,key?:string): Observable<any> {
    const endPoint = `api/media-modules/update/${data.id}`
    console.log(data)
    
    const fData : FormData = new FormData
    if(key == 'status') {
      fData.append("status", data.status);
    } else {
      fData.append("mediaModuleName", data.mediaModuleName);
      fData.append("fileData", data.fileData);
      fData.append("mediaModuleType", data.mediaModuleType);
    }
    return this.http.put(endPoint, fData)
  }

  editMediaInfo(data: any,key?:string): Observable<any> {
    const endPoint = `api/media-informations/change-status/${data.id}`
    console.log(data)
    
    const fData : FormData = new FormData
    if(key == 'status') {
      fData.append("status", data.status);
    } 
    return this.http.put(endPoint, fData)
  }

  deleteMedia(data: any): Observable<any> {
    const endPoint = `api/media-modules/delete/${data.id}`
    return this.http.delete(endPoint)
  }
}
