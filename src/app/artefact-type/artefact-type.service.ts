import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ArtefactType} from "../model/entity/artefact-type";
import {ResdbUrlEndpoints} from "../resdb-url-endpoints";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArtefactTypeService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<ArtefactType[]> {
    const url = ResdbUrlEndpoints.ARTEFACT_TYPE_URL;
    return this.http.get<ArtefactType[]>(url);
  }

  add(toBeSaved: ArtefactType): Observable<ArtefactType> {
    const url = ResdbUrlEndpoints.ARTEFACT_TYPE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.post<ArtefactType>(url, toBeSaved, httpOptions);
  }

  delete(artefactType: ArtefactType): Observable<ArtefactType> {
    const url = ArtefactTypeService.constructUrlWithId(ResdbUrlEndpoints.ARTEFACT_TYPE_URL, artefactType.id);
    console.log('URL for marking artefact type for deletion=[' + url + ']');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    console.log('AddressTypeService: marking ' + artefactType.name + ' for deletion');
    return this.http.delete<ArtefactType>(url, httpOptions);
  }

  private static constructUrlWithId(baseUrl: string, id: number): string {
    if (id) {
      return baseUrl + '/' + id.toString();
    }
    return '';
  }

  update(toBeSaved: ArtefactType): Observable<ArtefactType> {
    const url = ResdbUrlEndpoints.ARTEFACT_TYPE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.put<ArtefactType>(url, toBeSaved, httpOptions);
  }

}

