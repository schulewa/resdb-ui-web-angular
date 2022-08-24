import {Component} from "@angular/core";
import {IAuditedNameDataType} from "./interfaces/audited-name-data-type";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  template: ''
})
export abstract class AbstractEntityService<T extends IAuditedNameDataType> {

  constructor(private http: HttpClient) {
  }

  protected url: string | undefined

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(this.url!);
  }

  add(toBeSaved: T): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.post<T>(this.url!, toBeSaved, httpOptions);
  }

  delete(toBeDeleted: T): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.delete<T>(this.url!, httpOptions);
  }

  update(toBeUpdated: T): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.put<T>(this.url!, toBeUpdated, httpOptions);
  }
}
