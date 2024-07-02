import { OAuthService } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';
import { authConfig } from './auth.config';
import { logInSuccess } from '../store/actions';
import { ToastService } from '../shared/toast/toast.service';
import { LoggingService } from '../error/loggingservice';

export function initializeAuth(
    oauthService: OAuthService,
    store: Store,
    toastMessage: ToastService,
    loggingService: LoggingService
) {
    oauthService.configure(authConfig);

    return async () => {
        await oauthService
            .loadDiscoveryDocumentAndTryLogin()
            .then(() => {
                if (oauthService.hasValidAccessToken()) {
                    store.dispatch(logInSuccess());
                } else {
                    toastMessage.showError('No valid access_token', 'No valid token');
                }
            })
            .catch((e) => loggingService.error(e));

        return true;
    };
}
