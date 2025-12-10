import { inject } from '@angular/core';
import { HttpEvent, HttpRequest, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/reducers';
import { updateTimeDiff } from '../store/actions';

export const ServerTimeInterceptor: HttpInterceptorFn = (
    request: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    const store = inject<Store<IAppState>>(Store);

    return next(request).pipe(
        tap((r) => {
            if (r.type === 4) {
                const time = Number(r.headers.get('X-server-timestamp'));
                if (time) store.dispatch(updateTimeDiff({ serverTime: time }));
            }
        })
    );
};
