import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EventTypeGroup} from "../model/entity/event-type-group";
import {Observable} from "rxjs";
import {ResdbUrlEndpoints} from "../resdb-url-endpoints";

@Injectable({
  providedIn: 'root'
})
export class EventTypeGroupService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<EventTypeGroup[]> {
    const url = ResdbUrlEndpoints.EVENT_TYPE_GROUP_URL;
    return this.http.get<EventTypeGroup[]>(url);
  }

  add(toBeSaved: EventTypeGroup): Observable<EventTypeGroup> {
    const url = ResdbUrlEndpoints.EVENT_TYPE_GROUP_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.post<EventTypeGroup>(url, toBeSaved, httpOptions);
  }

  delete(entityType: EventTypeGroup): Observable<EventTypeGroup> {
    const url = EventTypeGroupService.constructUrlWithId(ResdbUrlEndpoints.EVENT_TYPE_GROUP_URL, entityType.id);
    console.log('URL for marking event type group for deletion=[' + url + ']');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    console.log('EventTypeGroupService: marking ' + entityType.name + ' for deletion');
    return this.http.delete<EventTypeGroup>(url, httpOptions);
  }

  private static constructUrlWithId(baseUrl: string, id: number): string {
    if (id) {
      return baseUrl + '/' + id.toString();
    }
    return '';
  }

  update(toBeSaved: EventTypeGroup): Observable<EventTypeGroup> {
    const url = ResdbUrlEndpoints.EVENT_TYPE_GROUP_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.put<EventTypeGroup>(url, toBeSaved, httpOptions);
  }

}
