import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {Person} from "../model/entity/person";
import {ResdbUrlEndpoints} from "../resdb-url-endpoints";
import {PersonApi} from "../model/api/person-api";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Person[]> {
    const url = ResdbUrlEndpoints.PERSON_URL;
    return this.http.get<PersonApi[]>(url).pipe(
      tap((receivedData: PersonApi[]) => {
        receivedData.forEach(person =>
          console.log('PersonService.findAll: received person=' + Person.toString(person))
        );
      }),
      catchError(this.handleError)
    );
  }

  add(toBeSaved: Person): Observable<any> {
    const url = ResdbUrlEndpoints.PERSON_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.post(url, toBeSaved, httpOptions).pipe(catchError(this.handleError));
  }

  delete(person: Person): Observable<Person> {
    const url = this.constructUrlWithId(ResdbUrlEndpoints.PERSON_URL, person.id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.delete<Person>(url, httpOptions);
  }

  private constructUrlWithId(baseUrl: string, id: number): string {
    if (id) {
      return baseUrl + '/' + id.toString();
    }
    return '';
  }

  update(toBeSaved: Person): Observable<any> {
    const url = ResdbUrlEndpoints.PERSON_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.put(url, toBeSaved, httpOptions).pipe(
      // tap((receivedData: Person) => console.log(receivedData)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    const errmsg = error.message || error;
    console.log('Error: ' + errmsg);
    return of([]);
  }

}
