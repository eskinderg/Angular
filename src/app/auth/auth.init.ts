import { OAuthService } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';
import { authConfig } from './auth.config';
import { logInSuccess } from '../store/actions';
import { ToastService } from '../shared/toast/toast.service';

export function initializeAuth(oauthService: OAuthService, store: Store, toast: ToastService) {
    oauthService.configure(authConfig);

    return async () => {
        await oauthService
            .loadDiscoveryDocumentAndTryLogin()
            .then(() => {
                if (oauthService.hasValidAccessToken()) {
                    store.dispatch(logInSuccess());
                } else {
                    toast.showError('No valid access_token', 'No valid token');
                }
            })
            .catch((e) => console.error('Auth Error======================:', e));

        return true;
    };
}
