import { HttpRequest, HttpHandler, HttpEvent, HttpClient, HttpResponseBase, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { TokenService } from 'abp-ng2-module/dist/src/auth/token.service';
import { Router } from '@angular/router';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';

import { UtilsService } from '@abp/utils/utils.service';
import { AppConsts } from '@shared/AppConsts';


///http 拦截器
@Injectable()
export class AuthInterceptor {
  constructor(public http: HttpClient, private _tokenService: TokenService, private injector: Injector,
    private _utilsService: UtilsService,
  ) { }


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
      // tap(
      //   event => {
      //   },
      //   error => {
      //     this.handleData(error);
      //   }
      // )
      mergeMap((event: any) => {
        // 正常返回，处理具体返回参数
        if (event instanceof HttpResponseBase)
          return this.handleData(event);//具体处理请求返回数据
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err)
      )
    );
  }

  private handleData(ev: HttpResponseBase): Observable<any> {

    // 业务处理：一些通用操作
    switch (ev.status) {
      case 200:
        // 业务层级错误处理，以下是假定restful有一套统一输出格式（指不管成功与否都有相应的数据格式）情况下进行处理
        // 例如响应内容：
        //  错误内容：{ status: 1, msg: '非法参数' }
        //  正确内容：{ status: 0, response: {  } }
        // 则以下代码片断可直接适用
        // if (event instanceof HttpResponse) {
        //     const body: any = event.body;
        //     if (body && body.status !== 0) {
        //         this.msg.error(body.msg);
        //         // 继续抛出错误中断后续所有 Pipe、subscribe 操作，因此：
        //         // this.http.get('/').subscribe() 并不会触发
        //         return throwError({});
        //     } else {
        //         // 重新修改 `body` 内容为 `response` 内容，对于绝大多数场景已经无须再关心业务状态码
        //         return of(new HttpResponse(Object.assign(event, { body: body.response })));
        //         // 或者依然保持完整的格式
        //         return of(event);
        //     }
        // }
        break;
      case 401:
        this.notification.error(`未登录或登录已过期，请重新登录。`, ``);
        // 清空 token 信息
        this._tokenService.clearToken();
        this._utilsService.deleteCookie(AppConsts.authorization.encrptedAuthTokenName);

        this.goTo('/account/login');
        break;
      case 403:
      case 404:
      case 500:
        this.goTo(`/`);
        break;
      default:
        if (ev instanceof HttpErrorResponse) {
          console.warn('未可知错误，大部分是由于后端不支持CORS或无效配置引起', ev);
          return throwError(ev);
        }
        break;
    }
    return of(ev);
  }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  private get notification(): NzNotificationService {
    return this.injector.get(NzNotificationService);
  }
}
