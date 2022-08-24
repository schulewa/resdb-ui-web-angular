import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LanguageGroup} from "../model/entity/language-group";
import {ResdbUrlEndpoints} from "../resdb-url-endpoints";

@Injectable({
  providedIn: 'root'
})
export class LanguageGroupService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<LanguageGroup[]> {
    const url = ResdbUrlEndpoints.LANGUAGE_GROUP_URL;
    return this.http.get<LanguageGroup[]>(url);
  }

  add(toBeSaved: LanguageGroup): Observable<LanguageGroup> {
    const url = ResdbUrlEndpoints.LANGUAGE_GROUP_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.post<LanguageGroup>(url, toBeSaved, httpOptions);
  }

  delete(entityType: LanguageGroup): Observable<LanguageGroup> {
    const url = LanguageGroupService.constructUrlWithId(ResdbUrlEndpoints.LANGUAGE_GROUP_URL, entityType.id);
    console.log('URL for marking language group for deletion=[' + url + ']');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.delete<LanguageGroup>(url, httpOptions);
  }

  private static constructUrlWithId(baseUrl: string, id: number): string {
    if (id) {
      return baseUrl + '/' + id.toString();
    }
    return '';
  }

  update(toBeSaved: LanguageGroup): Observable<LanguageGroup> {
    const url = ResdbUrlEndpoints.LANGUAGE_GROUP_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.put<LanguageGroup>(url, toBeSaved, httpOptions);
  }

}
