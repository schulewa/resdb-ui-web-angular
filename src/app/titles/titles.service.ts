import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Title} from "../model/entity/title";
import {Observable} from "rxjs";
import {ResdbUrlEndpoints} from "../resdb-url-endpoints";

@Injectable({
  providedIn: 'root'
})
export class TitlesService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Title[]> {
    const url = ResdbUrlEndpoints.TITLE_URL;
    return this.http.get<Title[]>(url);
  }

  add(toBeSaved: Title): Observable<Title> {
    const url = ResdbUrlEndpoints.TITLE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.post<Title>(url, toBeSaved, httpOptions);
  }

  delete(title: Title): Observable<Title> {
    const url = TitlesService.constructUrlWithId(ResdbUrlEndpoints.TITLE_URL, title.id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.delete<Title>(url, httpOptions);
  }

  private static constructUrlWithId(baseUrl: string, id: number): string {
    if (id) {
      return baseUrl + '/' + id.toString();
    }
    return '';
  }

  update(toBeSaved: Title): Observable<Title> {
    const url = ResdbUrlEndpoints.TITLE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.put<Title>(url, toBeSaved, httpOptions);
  }
}
