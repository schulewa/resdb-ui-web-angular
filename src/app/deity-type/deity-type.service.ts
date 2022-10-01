import {Injectable} from '@angular/core';
import {DeityType} from "../model/entity/deity-type";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResdbUrlEndpoints} from "../resdb-url-endpoints";

@Injectable({
  providedIn: 'root'
})
export class DeityTypeService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<DeityType[]> {
    const url = ResdbUrlEndpoints.DEITY_TYPE_URL;
    return this.http.get<DeityType[]>(url);
  }

  add(toBeSaved: DeityType): Observable<DeityType> {
    const url = ResdbUrlEndpoints.DEITY_TYPE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.post<DeityType>(url, toBeSaved, httpOptions);
  }

  delete(deityType: DeityType): Observable<DeityType> {
    const url = DeityTypeService.constructUrlWithId(ResdbUrlEndpoints.DEITY_TYPE_URL, deityType.id!);
    console.log('URL for marking deity type for deletion=[' + url + ']');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    console.log('DeityTypeService: marking ' + deityType.name + ' for deletion');
    return this.http.delete<DeityType>(url, httpOptions);
  }

  private static constructUrlWithId(baseUrl: string, id: number): string {
    if (id) {
      return baseUrl + '/' + id.toString();
    }
    return '';
  }

  update(toBeSaved: DeityType): Observable<DeityType> {
    const url = ResdbUrlEndpoints.DEITY_TYPE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.put<DeityType>(url, toBeSaved, httpOptions);
  }

}
