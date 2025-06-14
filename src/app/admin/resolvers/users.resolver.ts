import { Injectable, inject } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AdminActions from '../store/actions/admin.auth.action';
import { Actions, ofType } from '@ngrx/effects';
import { first, forkJoin, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminUsersResolver implements Resolve<void> {
    private store = inject(Store);
    private actions$ = inject(Actions);

    resolve(): Observable<void> {
        this.store.dispatch(AdminActions.adminFetchUsers());

        return forkJoin([this.actions$.pipe(ofType(AdminActions.adminFetchUsersSuccess), first())]).pipe(
            map(() => undefined)
        );
    }
}
