import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ArtefactGroup} from "../model/entity/artefact-group";
import {ResdbUrlEndpoints} from "../resdb-url-endpoints";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArtefactGroupService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<ArtefactGroup[]> {
    const url = ResdbUrlEndpoints.ARTEFACT_GROUP_URL;
    return this.http.get<ArtefactGroup[]>(url);
  }

  add(toBeSaved: ArtefactGroup): Observable<ArtefactGroup> {
    const url = ResdbUrlEndpoints.ARTEFACT_GROUP_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.post<ArtefactGroup>(url, toBeSaved, httpOptions);
  }

  delete(artefactGroup: ArtefactGroup): Observable<ArtefactGroup> {
    const url = ArtefactGroupService.constructUrlWithId(ResdbUrlEndpoints.ARTEFACT_GROUP_URL, artefactGroup.id!);
    console.log('URL for marking artefact group for deletion=[' + url + ']');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    console.log('AddressTypeService: marking ' + artefactGroup.name + ' for deletion');
    return this.http.delete<ArtefactGroup>(url, httpOptions);
  }

  update(toBeSaved: ArtefactGroup): Observable<ArtefactGroup> {
    const url = ResdbUrlEndpoints.ARTEFACT_GROUP_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.put<ArtefactGroup>(url, toBeSaved, httpOptions);
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

