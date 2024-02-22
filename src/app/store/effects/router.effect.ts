import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import * as fromRouter from '@ngrx/router-store';

@Injectable()
export class RouterEffect {
  deleteSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromRouter.ROUTER_REQUEST),
        switchMap((_action) => {
          return EMPTY;
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
