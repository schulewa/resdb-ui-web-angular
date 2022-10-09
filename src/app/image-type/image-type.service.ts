import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ResdbUrlEndpoints} from "../resdb-url-endpoints";
import {ImageType} from "../model/entity/image-type";

@Injectable({
  providedIn: 'root'
})
export class ImageTypeService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<ImageType[]> {
    const url = ResdbUrlEndpoints.IMAGE_TYPE_URL;
    return this.http.get<ImageType[]>(url);
  }

  add(toBeSaved: ImageType): Observable<ImageType> {
    const url = ResdbUrlEndpoints.IMAGE_TYPE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.post<ImageType>(url, toBeSaved, httpOptions);
  }

  delete(entityType: ImageType): Observable<ImageType> {
    const url = ImageTypeService.constructUrlWithId(ResdbUrlEndpoints.IMAGE_TYPE_URL, entityType.id!);
    console.log('URL for marking image type group for deletion=[' + url + ']');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.delete<ImageType>(url, httpOptions);
  }

  update(toBeSaved: ImageType): Observable<ImageType> {
    const url = ResdbUrlEndpoints.IMAGE_TYPE_URL;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.put<ImageType>(url, toBeSaved, httpOptions);
  }

  private static constructUrlWithId(baseUrl: string, id: number): string {
    if (id) {
      return baseUrl + '/' + id.toString();
    }
    return '';
  }

}
