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
    const endPoint = this.baseUrl + `languages`
    return this.http.get(endPoint)
  }

  addMultyLanguage(data: any): Observable<any> {
    const endPoint = this.baseUrl + `languages/multi-add`
    return this.http.post(endPoint, data)
  }

  editLanguage(data: any): Observable<any> {
    const endPoint = this.baseUrl + `languages/update/${data.id}`
    const req = { name: data.name, showInAudio: data.showInAudio , showInSubtitles: data.showInSubtitles }
    return this.http.post(endPoint, req)
  }

  deleteLanguage(data: any): Observable<any> {
    const endPoint = this.baseUrl + `languages/delete/${data.id}`
    const req = { name: data.name }
    return this.http.post(endPoint, req)
  }
}
