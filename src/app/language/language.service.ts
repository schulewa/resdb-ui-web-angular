import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Language} from "../model/entity/language";
import {ResdbUrlEndpoints} from "../resdb-url-endpoints";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Language[]> {
    const url = ResdbUrlEndpoints.LANGUAGE_URL;
    return this.http.get<Language[]>(url);
  }

  add(toBeSaved: Language): Observable<Language> {
    const url = ResdbUrlEndpoints.LANGUAGE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.post<Language>(url, toBeSaved, httpOptions);
  }

  delete(entityType: Language): Observable<Language> {
    const url = this.constructUrlWithId(ResdbUrlEndpoints.LANGUAGE_URL, entityType.id!);
    console.log('URL for marking language for deletion=[' + url + ']');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.delete<Language>(url, httpOptions);
  }

  private constructUrlWithId(baseUrl: string, id: number): string {
    if (id) {
      return baseUrl + '/' + id.toString();
    }
    return '';
  }

  update(toBeSaved: Language): Observable<Language> {
    const url = ResdbUrlEndpoints.LANGUAGE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.put<Language>(url, toBeSaved, httpOptions);
  }
}
