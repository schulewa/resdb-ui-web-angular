import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {Person} from "../model/entity/person";
import {ResdbUrlEndpoints} from "../resdb-url-endpoints";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Person[]> {
    const url = ResdbUrlEndpoints.PERSON_URL;
    var persons = this.http.get<Person[]>(url);
    return persons;
  }
  // findAll(): Observable<Person[]> {
  //   const url = ResdbUrlEndpoints.PERSON_URL;
  //   return this.http.get<Person[]>(url).pipe(
  //     tap((receivedData: Person[]) => {
  //       receivedData.forEach(person =>
  //         console.log('PersonService.findAll: received person=' + Person.toString(person))
  //       );
  //     }),
  //     catchError(this.handleError)
  //   );
  // }

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
    const url = this.constructUrlWithId(ResdbUrlEndpoints.PERSON_URL, person.id!);
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
    console.log('error=' + error);
    const errorText = error.text || 'UNABLE TO EXTRACT ERROR TEXT';
    const errmsg = error.message || error;
    console.log('Error: ' + errmsg);
    console.log('error.error.message=' + error.error.message);
    console.log('error.error.stack=' + error.error.stack);
    return of([]);
  }

}
