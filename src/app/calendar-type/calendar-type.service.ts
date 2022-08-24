import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CalendarType} from "../model/entity/calendar-type";
import {ResdbUrlEndpoints} from "../resdb-url-endpoints";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CalendarTypeService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<CalendarType[]> {
    const url = ResdbUrlEndpoints.CALENDAR_TYPE_URL;
    return this.http.get<CalendarType[]>(url);
  }

  add(toBeSaved: CalendarType): Observable<CalendarType> {
    const url = ResdbUrlEndpoints.CALENDAR_TYPE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.post<CalendarType>(url, toBeSaved, httpOptions);
  }

  delete(calendarType: CalendarType): Observable<CalendarType> {
    const url = CalendarTypeService.constructUrlWithId(ResdbUrlEndpoints.CALENDAR_TYPE_URL, calendarType.id);
    console.log('URL for marking calendar type for deletion=[' + url + ']');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    console.log('CalendarTypeService: marking ' + calendarType.name + ' for deletion');
    return this.http.delete<CalendarType>(url, httpOptions);
  }

  private static constructUrlWithId(baseUrl: string, id: number): string {
    if (id) {
      return baseUrl + '/' + id.toString();
    }
    return '';
  }

  update(toBeSaved: CalendarType): Observable<CalendarType> {
    const url = ResdbUrlEndpoints.CALENDAR_TYPE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.put<CalendarType>(url, toBeSaved, httpOptions);
  }

}

