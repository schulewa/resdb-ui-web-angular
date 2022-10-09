import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {getCurrentJwt} from "../utils/local-storage-utils";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  readonly CURRENT_JWT = 'currentJwt';

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add headers for all cases

    // add JWT if user has been authenticated

    const authHdr = req.headers.get('Authorization');

    const token = getCurrentJwt();

    if (authHdr || !token) {
      return next.handle(req);
    }

    const requestWithToken = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(requestWithToken);
  }

}
