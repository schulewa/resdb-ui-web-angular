import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "./model/entity/user";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ResdbUrlEndpoints} from "./resdb-url-endpoints";
import {AuthenticatedUser} from "./model/api/authenticated-user";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  readonly CURRENT_USER = 'currentUser';

  private currentUserSubject: BehaviorSubject<User> | undefined;
  public currentUser: Observable<User> | undefined;

  private authenticated: boolean;

  constructor(private router: Router, private http: HttpClient) {
    this.authenticated = false;
  }

  login(userName: string, password: string): Observable<AuthenticatedUser> {
    const body = JSON.stringify({userName, password});
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    return this.http.post<AuthenticatedUser>(ResdbUrlEndpoints.LOGIN_URL, body, {headers});
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(this.CURRENT_USER);
    this.authenticated = false;
    this.router.navigate(['Login']); // TODO should this be 'login' ?
  }

  // public get currentUserValue(): User {
  //   return this.currentUserSubject?.value;
  // }

  public get isAuthenticated(): boolean {
    return this.authenticated;
  }
}
