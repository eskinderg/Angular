import { Injectable, inject } from '@angular/core';
import * as fromRoot from '../store/reducers';
import * as AppActions from '../store/actions';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class PreferenceApiService {
    private store = inject<Store<fromRoot.IAppState>>(Store);

    saveLang(lang: string) {
        if (lang) {
            this.store.dispatch(AppActions.saveUserLang({ lang: lang }));
        }
    }

    getUserPreferedLanguage() {
        return this.store.select(fromRoot.getUserLang);
    }

    getUserPreferrence() {
        return this.store.select(fromRoot.getUserPreference);
    }
}
