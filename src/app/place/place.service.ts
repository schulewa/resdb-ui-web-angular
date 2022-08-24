import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Place} from "../model/entity/place";
import {ResdbUrlEndpoints} from "../resdb-url-endpoints";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Place[]> {
    const url = ResdbUrlEndpoints.PLACE_URL;
    return this.http.get<Place[]>(url);
  }

  add(toBeSaved: Place): Observable<Place> {
    const url = ResdbUrlEndpoints.PLACE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.post<Place>(url, toBeSaved, httpOptions);
  }

  delete(place: Place): Observable<Place> {
    const url = PlaceService.constructUrlWithId(ResdbUrlEndpoints.PLACE_URL, place.id);
    console.log('URL for marking place for deletion=[' + url + ']');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    console.log('PlaceService: marking ' + place.name + ' for deletion');
    return this.http.delete<Place>(url, httpOptions);
  }

  private static constructUrlWithId(baseUrl: string, id: number): string {
    if (id) {
      return baseUrl + '/' + id.toString();
    }
    return '';
  }

  update(toBeSaved: Place): Observable<Place> {
    const url = ResdbUrlEndpoints.PLACE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.put<Place>(url, toBeSaved, httpOptions);
  }

}

