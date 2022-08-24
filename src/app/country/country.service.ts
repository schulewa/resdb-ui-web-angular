import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResdbUrlEndpoints} from "../resdb-url-endpoints";
import {Country} from "../model/entity/country";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) {

  }

  findAll(): Observable<Country[]> {
    const url = ResdbUrlEndpoints.COUNTRY_URL;
    console.log('Invoking call to url ' + url + ' to read list of countries')
    return this.http.get<Country[]>(url);
  }

  add(toBeSaved: Country): Observable<Country> {
    const url = ResdbUrlEndpoints.COUNTRY_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.post<Country>(url, toBeSaved, httpOptions);
  }

  delete(country: Country): Observable<Country> {
    const url = CountryService.constructUrlWithId(ResdbUrlEndpoints.COUNTRY_URL, country.id);
    console.log('URL for marking country for deletion=[' + url + ']');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    console.log('CountryService: marking ' + country.name + ' for deletion');
    return this.http.delete<Country>(url, httpOptions);
  }

  private static constructUrlWithId(baseUrl: string, id: number): string {
    if (id) {
      return baseUrl + '/' + id.toString();
    }
    return '';
  }

  update(toBeSaved: Country): Observable<Country> {
    const url = ResdbUrlEndpoints.COUNTRY_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.put<Country>(url, toBeSaved, httpOptions);
  }

}
