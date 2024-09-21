import { inject } from '@angular/core';
import {
    HttpEvent,
    HttpRequest,
    HttpInterceptorFn,
    HttpHandlerFn,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
// import { tap } from 'rxjs/operators';
import { LoggingService } from '../error/loggingservice';
import { APP_CONFLICT } from '../config/config';
// import { AuthService } from './components/shared/services/auth/auth.service';

// import { ConfirmService } from '../fragments/components/dialog/confirm.service';

export const HttpErrorInterceptor: HttpInterceptorFn = (
    request: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const loggingService = inject(LoggingService);

    return next(request).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === APP_CONFLICT) {
                location.reload();
            } else {
                loggingService.error(error);
            }
            return throwError(() => error.message);
        })
    );
};
// @Injectable()
// export class HttpErrorInterceptor implements HttpInterceptor {
//   // constructor(public auth: AuthService) {}
//   /**
//    * @param {ConfirmService} confirmService - Confirm Dialog service
//    */
//   constructor(
//     private confirmService: ConfirmService,
//     private injector: Injector
//   ) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // const auth  = this.injector.get(AuthService);

//     // console.log(localStorage.getItem('access_token'));

//     const loggingService = this.injector.get(LoggingService);

//     return next.handle(request).pipe(
//       catchError((error) => {
//         loggingService.error(error);
//         return throwError(() => error.message);
//       })
//     );

//     // return next.handle(request);
//     // .pipe(
//     //   tap(
//     //     (event: HttpEvent<any>) => {
//     //       if (event instanceof HttpResponse) {
//     //         // do stuff with response if you want
//     //       }
//     //     }, (err: any) => {
//     //       if (err instanceof HttpErrorResponse) {
//     //         if (err.status === 401) {
//     //           this.confirmService.openInfoDialog({
//     //             title: '401: Unauthorized request',
//     //             message: 'From Interceptor'
//     //           })
//     //         }
//     //         if (err.status === 403) {
//     //           this.confirmService.openInfoDialog({
//     //             title: '403: Forbidden request',
//     //             message: 'From Interceptor'
//     //           })
//     //         }
//     //       }
//     //     }
//     //   ));
//   }
// }
