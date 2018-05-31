import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpInterceptor,HttpResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
//import { AuthService } from './components/shared/services/auth/auth.service';

import { ConfirmService } from './theme/components/modal/confirm.service';

@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {

  //constructor(public auth: AuthService) {}
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //const auth  = this.injector.get(AuthService);

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    });

    // console.log(localStorage.getItem('access_token'));

    return next.handle(request)
    .pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
          }
        }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              alert('401: Unauthorized request')
            }
            if (err.status === 403) {
              alert('403 (Forbidden): User not Authorized to the resource')
              // this.confirmService.openInfoModal({
              //   title: 'From HttpInterceptor',
              //   message: 'From HttpInterceptor'
              // }).then(() => {
              //   // this.store.dispatch(new EventsActions.deleteEvent(event));
              // }, () => {
              //   console.log();
              // });
            }
          }
        }
      ));

  }
}
