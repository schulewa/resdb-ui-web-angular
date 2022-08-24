import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PublicationType} from "../model/entity/publication-type";
import {ResdbUrlEndpoints} from "../resdb-url-endpoints";
import {MeasureType} from "../model/entity/measure-type";

@Injectable({
  providedIn: 'root'
})
export class PublicationTypeService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<PublicationType[]> {
    const url = ResdbUrlEndpoints.PUBLICATION_TYPE_URL;
    return this.http.get<PublicationType[]>(url);
  }

  add(toBeSaved: PublicationType): Observable<PublicationType> {
    const url = ResdbUrlEndpoints.PUBLICATION_TYPE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.post<PublicationType>(url, toBeSaved, httpOptions);
  }

  delete(publicationType: PublicationType): Observable<MeasureType> {
    const url = PublicationTypeService.constructUrlWithId(ResdbUrlEndpoints.PUBLICATION_TYPE_URL, publicationType.id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.delete<PublicationType>(url, httpOptions);
  }

  update(toBeSaved: PublicationType): Observable<PublicationType> {
    const url = ResdbUrlEndpoints.PUBLICATION_TYPE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.put<PublicationType>(url, toBeSaved, httpOptions);
  }

  private static constructUrlWithId(baseUrl: string, id: number): string {
    if (id) {
      return baseUrl + '/' + id.toString();
    }
    return '';
  }
}
