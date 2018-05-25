import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { AuthService } from './components/shared/services/auth/auth.service';

@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {

  //constructor(public auth: AuthService) {}
  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //const auth  = this.injector.get(AuthService);

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    //console.log(localStorage.getItem('token'));

    return next.handle(request);
  }
}
