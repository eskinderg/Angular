import { OAuthService } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';
import { authConfig } from './auth.config';
import { logInSuccess } from '../store/actions';
import { LoggingService } from '../error/loggingservice';

export function initializeAuth(oauthService: OAuthService, store: Store, loggingService: LoggingService) {
    oauthService.configure(authConfig);

    return async () => {
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
