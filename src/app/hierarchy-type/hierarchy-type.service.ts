import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ResdbUrlEndpoints} from "../resdb-url-endpoints";
import {HierarchyType} from "../model/entity/hierarchy-type";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HierarchyTypeService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<HierarchyType[]> {
    const url = ResdbUrlEndpoints.HIERARCHY_TYPE_URL;
    return this.http.get<HierarchyType[]>(url);
  }

  add(toBeSaved: HierarchyType): Observable<HierarchyType> {
    const url = ResdbUrlEndpoints.HIERARCHY_TYPE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.post<HierarchyType>(url, toBeSaved, httpOptions);
  }

  delete(entityType: HierarchyType): Observable<HierarchyType> {
    const url = HierarchyTypeService.constructUrlWithId(ResdbUrlEndpoints.HIERARCHY_TYPE_URL, entityType.id);
    console.log('URL for marking hierarchy type group for deletion=[' + url + ']');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.delete<HierarchyType>(url, httpOptions);
  }

  private static constructUrlWithId(baseUrl: string, id: number): string {
    if (id) {
      return baseUrl + '/' + id.toString();
    }
    return '';
  }

  update(toBeSaved: HierarchyType): Observable<HierarchyType> {
    const url = ResdbUrlEndpoints.HIERARCHY_TYPE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.put<HierarchyType>(url, toBeSaved, httpOptions);
  }

}
