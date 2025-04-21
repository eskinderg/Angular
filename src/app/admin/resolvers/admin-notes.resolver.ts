import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AdminActions from '../store/actions/admin.auth.action';
import { Actions, ofType } from '@ngrx/effects';
import { first, forkJoin, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminNotesResolver implements Resolve<void> {
    constructor(
        private store: Store,
        private actions$: Actions
    ) {}

    resolve(): Observable<void> {
        this.store.dispatch(AdminActions.adminFetchUsers());

        return forkJoin([
            this.actions$.pipe(ofType(AdminActions.adminFetchUsersSuccess), first()),
            this.actions$.pipe(ofType(AdminActions.adminFetchNotesSuccess), first())
        ]).pipe(map(() => undefined));
    }
}
