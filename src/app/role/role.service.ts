import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ResdbUrlEndpoints} from "../resdb-url-endpoints";
import {Observable, of} from "rxjs";
import {Role} from "../model/entity/role";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Role[]> {
    const url = ResdbUrlEndpoints.ROLE_URL;
    return this.http.get<Role[]>(url);
  }

  add(role: Role): Observable<Role> {
    const url = ResdbUrlEndpoints.ROLE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.post<Role>(url, role, httpOptions);
  }

  delete(role: Role): Observable<Role> {
    const url = RoleService.constructUrlWithId(ResdbUrlEndpoints.ROLE_URL, role.id!);
    console.log('URL for marking role for deletion=[' + url + ']');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    console.log('RoleService: marking ' + role.name + ' for deletion');
    return this.http.delete<Role>(url, httpOptions);
  }

  update(role: Role): Observable<Role> {
    const url = ResdbUrlEndpoints.ROLE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.put<Role>(url, role, httpOptions);
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

