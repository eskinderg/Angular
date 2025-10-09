import { OAuthService } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';
import { authConfig } from './auth.config';
import { logInSuccess } from '../store/actions';
import { inject } from '@angular/core';
import { adminReducer } from '../admin/store/reducers/admin.reducer';
import { AuthPermission } from './auth.permission.service';

export function initializeAuth(): () => Promise<void> {
    return async () => {
        const oauthService: OAuthService = inject(OAuthService);
        const permission: AuthPermission = inject(AuthPermission);
        const store: Store = inject(Store);
        oauthService.configure(authConfig);
        await withTimeout(oauthService.loadDiscoveryDocumentAndTryLogin(), 10000)
            .then(() => {
                if (oauthService.hasValidAccessToken()) {
                    if (permission.IsAdmin) {
                        store.addReducer('admin', adminReducer); // add admin state on demand
                    }
                    store.dispatch(logInSuccess());
                }
            })
            .catch((error) => {
                alert(error?.message);
                return Promise.reject(error);
            });
    };
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    return Promise.race([
        promise,
        new Promise<T>((_, reject) =>
            setTimeout(() => reject(new Error('Timeout while loading discovery document')), ms)
        )
    ]);
}
