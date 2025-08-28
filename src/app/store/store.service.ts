import { Injectable, inject } from '@angular/core';
import { Action, MemoizedSelector, Store } from '@ngrx/store';
import * as Selectors from '../store/reducers';
import * as Actions from '../store/actions';
import * as appStore from '../store/reducers';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    private store = inject<Store<appStore.IAppState>>(Store);
    selectors = Selectors;
    actions = Actions;

    select<T>(selector: MemoizedSelector<appStore.IAppState, T>) {
        return this.store.select(selector);
    }

    dispatch(action: Action) {
        this.store.dispatch(action);
    }
}
