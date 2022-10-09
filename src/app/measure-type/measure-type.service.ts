import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {MeasureType} from "../model/entity/measure-type";
import {ResdbUrlEndpoints} from "../resdb-url-endpoints";

@Injectable({
  providedIn: 'root'
})
export class MeasureTypeService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<MeasureType[]> {
    const url = ResdbUrlEndpoints.MEASURE_TYPE_URL;
    return this.http.get<MeasureType[]>(url);
  }

  add(toBeSaved: MeasureType): Observable<MeasureType> {
    const url = ResdbUrlEndpoints.MEASURE_TYPE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.post<MeasureType>(url, toBeSaved, httpOptions);
  }

  delete(measureType: MeasureType): Observable<MeasureType> {
    const url = MeasureTypeService.constructUrlWithId(ResdbUrlEndpoints.MEASURE_TYPE_URL, measureType.id!);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.delete<MeasureType>(url, httpOptions);
  }

  private static constructUrlWithId(baseUrl: string, id: number): string {
    if (id) {
      return baseUrl + '/' + id.toString();
    }
    return '';
  }

  update(toBeSaved: MeasureType): Observable<MeasureType> {
    const url = ResdbUrlEndpoints.MEASURE_TYPE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.put<MeasureType>(url, toBeSaved, httpOptions);
  }
}
