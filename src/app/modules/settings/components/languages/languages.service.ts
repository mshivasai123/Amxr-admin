import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  baseUrl = environment.basicUrl;

  constructor(
    private http: HttpClient
  ) { }

  getLanguage(): Observable<any> {
    const endPoint = `api/languages`
    return this.http.get(endPoint)
  }

  addMultyLanguage(data: any): Observable<any> {
    const endPoint = `api/languages/multi-add`
    return this.http.post(endPoint, data)
  }

  editLanguage(data: any,key?: string): Observable<any> {
    const endPoint = `api/languages/update/${data.id}`
    let req;
    if(key == 'status') {
      req = { status : data.status }
    } else {
      req = { name: data.name, showInAudio: data.showInAudio , showInSubtitles: data.showInSubtitles }
    }
    return this.http.put(endPoint, req)
  }

  deleteLanguage(data: any): Observable<any> {
    const endPoint = `api/languages/delete/${data.id}`
    const req = { name: data.name }
    return this.http.delete(endPoint)
  }

  reOrder(data: any): Observable<any> {
    const endPoint = `api/languages/reorder`
    return this.http.put(endPoint, data)
  }
}
