import { OAuthService } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';
import { authConfig } from './auth.config';
import { logInSuccess } from '../store/actions';
import { LoggingService } from '../error/loggingservice';
import { inject } from '@angular/core';

export function initializeAuth() {
    return async () => {
        const oauthService: OAuthService = inject(OAuthService);
        const store: Store = inject(Store);
        const loggingService: LoggingService = inject(LoggingService);
        oauthService.configure(authConfig);
        await oauthService
            .loadDiscoveryDocumentAndTryLogin()
            .then(() => {
                if (oauthService.hasValidAccessToken()) {
                    store.dispatch(logInSuccess());
                }
            })
            .catch((e) => loggingService.error(e));

        return true;
    };
}
