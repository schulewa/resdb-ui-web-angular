import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {PersonType} from "../model/entity/person-type";
import {ResdbUrlEndpoints} from "../resdb-url-endpoints";
import {MeasureType} from "../model/entity/measure-type";

@Injectable({
  providedIn: 'root'
})
export class PersonTypeService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<PersonType[]> {
    console.log('PersonTypeService.findAll');
    const url = ResdbUrlEndpoints.PERSON_TYPE_URL;
    console.log('PersonTypeService.findAll: initiating REST call to url ' + url);
    return this.http.get<PersonType[]>(url).pipe(catchError(PersonTypeService.handleError));
  }

  add(toBeSaved: PersonType): Observable<PersonType> {
    const url = ResdbUrlEndpoints.PERSON_TYPE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.post<PersonType>(url, toBeSaved, httpOptions);
  }

  delete(personType: PersonType): Observable<MeasureType> {
    const url = PersonTypeService.constructUrlWithId(ResdbUrlEndpoints.PERSON_TYPE_URL, personType.id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.delete<PersonType>(url, httpOptions);
  }

  update(toBeSaved: PersonType): Observable<PersonType> {
    const url = ResdbUrlEndpoints.PERSON_TYPE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.put<PersonType>(url, toBeSaved, httpOptions);
  }

  private static constructUrlWithId(baseUrl: string, id: number): string {
    if (id) {
      return baseUrl + '/' + id.toString();
    }
    return '';
  }

  private static handleError(error: any) {
    const errmsg = error.message || error;
    console.log('Error: ' + errmsg);
    return of([]);
  }
}
