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
<<<<<<< HEAD
    if (this._tokenService.getToken()) {
      // headers = req.headers.set('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6ImIxOWZjM2RmLTliZmQtODlhNi1jOGQ3LTM5ZWJhOWZhZTcwMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiaHR0cDovL3d3dy5hc3BuZXRib2lsZXJwbGF0ZS5jb20vaWRlbnRpdHkvY2xhaW1zL3RlbmFudElkIjoiMSIsInN1YiI6IjIiLCJqdGkiOiJhOTViNjEyMC0zMTlhLTQ3ZjEtOWRiMy00MTIwNDEwMDk2N2EiLCJpYXQiOjE1NjAxNTg3NDgsIm5iZiI6MTU2MDE1ODc0OCwiZXhwIjoxNTYyNzUwNzQ4LCJpc3MiOiJXb3JrRmxvd2VkIiwiYXVkIjoiV29ya0Zsb3dlZCJ9.RzRqHoIGFOhNcyovsz6EKIM8ycpDbt3vuWpR-Mxz3P8')
      headers = req.headers.set('Authorization', this._tokenService.getToken());
    }
=======
    console.log(this._tokenService.getToken());
    // if (this._tokenService.getToken()) {
      headers = req.headers.set('Authorization', 'Bearer ' +  this._tokenService.getToken())
    // }
>>>>>>> d11149c007cbd9435f374add1742e5848d427a3a
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
