import { OAuthService } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';
import { authConfig } from './auth.config';
import { logInSuccess } from '../store/actions';
import { inject } from '@angular/core';

export function initializeAuth(): () => Promise<void> {
    return async () => {
        const oauthService: OAuthService = inject(OAuthService);
        const store: Store = inject(Store);
        oauthService.configure(authConfig);
        await withTimeout(oauthService.loadDiscoveryDocumentAndTryLogin(), 3000)
            .then(() => {
                if (oauthService.hasValidAccessToken()) {
                    store.dispatch(logInSuccess());
                }
            })
            .catch((error) => {
                alert(error);
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
