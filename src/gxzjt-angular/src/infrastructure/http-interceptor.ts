import { HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TokenService } from 'abp-ng2-module/dist/src/auth/token.service';


///http 拦截器
@Injectable()
export class AuthInterceptor {
  constructor(public http: HttpClient, private _tokenService: TokenService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers;
    // console.log(this._tokenService.getToken());
    if (this._tokenService.getToken()) {
      headers = req.headers.set('Authorization', 'Bearer ' + this._tokenService.getToken())
    }
    //在请求头加Authorization 不做任何处理
    const authReq = req.clone({
      headers: headers,
      url: req.url,
    });
    return next.handle(authReq).pipe(
      tap(
        event => {

        },
        error => {

        }
      )
    );
  }
}
