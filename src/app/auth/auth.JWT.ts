import { HttpEvent, HttpRequest, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export const AuthJWT: HttpInterceptorFn = (
    request: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    if (request.url.includes(environment.API)) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        });
    }
    return next(request);
};
