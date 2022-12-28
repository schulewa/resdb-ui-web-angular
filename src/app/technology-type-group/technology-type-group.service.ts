import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TechnologyTypeGroup} from "../model/entity/technology-type-group";
import {ResdbUrlEndpoints} from "../resdb-url-endpoints";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TechnologyTypeGroupService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<TechnologyTypeGroup[]> {
    const url = ResdbUrlEndpoints.TECHNOLOGY_TYPE_GROUP_URL;
    return this.http.get<TechnologyTypeGroup[]>(url);
  }

  add(toBeSaved: TechnologyTypeGroup): Observable<TechnologyTypeGroup> {
    const url = ResdbUrlEndpoints.TECHNOLOGY_TYPE_GROUP_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.post<TechnologyTypeGroup>(url, toBeSaved, httpOptions);
  }

  delete(technologyTypeGroup: TechnologyTypeGroup): Observable<TechnologyTypeGroup> {
    const url = TechnologyTypeGroupService.constructUrlWithId(ResdbUrlEndpoints.TECHNOLOGY_TYPE_GROUP_URL, technologyTypeGroup.id!);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.delete<TechnologyTypeGroup>(url, httpOptions);
  }

  update(toBeSaved: TechnologyTypeGroup): Observable<TechnologyTypeGroup> {
    const url = ResdbUrlEndpoints.TECHNOLOGY_TYPE_GROUP_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.put<TechnologyTypeGroup>(url, toBeSaved, httpOptions);
  }

  private static constructUrlWithId(baseUrl: string, id: number): string {
    if (id) {
      return baseUrl + '/' + id.toString();
    }
    return '';
  }

}
