import { inject, Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import * as fromRouter from '@ngrx/router-store';

@Injectable()
export class RouterEffect {
    deleteSuccess = createEffect(
        (actions$ = inject(Actions)) =>
            actions$.pipe(
                ofType(fromRouter.ROUTER_REQUEST),
                switchMap(() => {
                    return EMPTY;
                })
            ),
        { dispatch: false }
    );
}
